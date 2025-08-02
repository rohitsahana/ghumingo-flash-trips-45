// Comprehensive API error handling utility
// This provides consistent error handling across the application

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export class ApiErrorHandler {
  static async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response);
      throw new ApiErrorHandler.ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code,
        errorData.details
      );
    }
    
    try {
      return await response.json();
    } catch (error) {
      // If response is not JSON, return text
      return await response.text();
    }
  }

  static async parseErrorResponse(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch {
      return {
        message: `Request failed with status ${response.status}`,
        status: response.status
      };
    }
  }

  static async fetchWithErrorHandling(
    url: string, 
    options: RequestInit = {}
  ): Promise<any> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      if (error instanceof ApiErrorHandler.ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiErrorHandler.ApiError(
        error instanceof Error ? error.message : 'Network error occurred',
        0,
        'NETWORK_ERROR'
      );
    }
  }

  static getErrorMessage(error: any): string {
    if (error instanceof ApiErrorHandler.ApiError) {
      return error.message;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return 'An unexpected error occurred';
  }

  static isNetworkError(error: any): boolean {
    return error instanceof ApiErrorHandler.ApiError && error.status === 0;
  }

  static isServerError(error: any): boolean {
    return error instanceof ApiErrorHandler.ApiError && error.status >= 500;
  }

  static isClientError(error: any): boolean {
    return error instanceof ApiErrorHandler.ApiError && error.status >= 400 && error.status < 500;
  }

  // Custom error class
  static ApiError = class extends Error implements ApiError {
    status?: number;
    code?: string;
    details?: any;

    constructor(
      message: string,
      status?: number,
      code?: string,
      details?: any
    ) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.code = code;
      this.details = details;
    }
  };
}

// Convenience functions for common API operations
export const api = {
  get: (url: string, options?: RequestInit) => 
    ApiErrorHandler.fetchWithErrorHandling(url, { ...options, method: 'GET' }),
  
  post: (url: string, data?: any, options?: RequestInit) =>
    ApiErrorHandler.fetchWithErrorHandling(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  
  put: (url: string, data?: any, options?: RequestInit) =>
    ApiErrorHandler.fetchWithErrorHandling(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
  
  delete: (url: string, options?: RequestInit) =>
    ApiErrorHandler.fetchWithErrorHandling(url, { ...options, method: 'DELETE' }),
};

export default ApiErrorHandler; 