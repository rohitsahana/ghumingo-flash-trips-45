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
    options: RequestInit = {},
    retries: number = 2
  ): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      clearTimeout(timeoutId);
      return await this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiErrorHandler.ApiError) {
        throw error;
      }
      
      // Handle timeout and network errors
      if (error.name === 'AbortError') {
        throw new ApiErrorHandler.ApiError('Request timeout', 0, 'TIMEOUT');
      }
      
      // Retry logic for network errors
      if (retries > 0 && this.isNetworkError(error)) {
        console.log(`Retrying request... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return this.fetchWithErrorHandling(url, options, retries - 1);
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

  static isTimeoutError(error: any): boolean {
    return error instanceof ApiErrorHandler.ApiError && error.code === 'TIMEOUT';
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

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6080';

// Convenience functions for common API operations
export const api = {
  get: (url: string, options?: RequestInit) => {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    return ApiErrorHandler.fetchWithErrorHandling(fullUrl, { ...options, method: 'GET' });
  },
  
  post: (url: string, data?: any, options?: RequestInit) => {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    return ApiErrorHandler.fetchWithErrorHandling(fullUrl, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  put: (url: string, data?: any, options?: RequestInit) => {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    return ApiErrorHandler.fetchWithErrorHandling(fullUrl, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  delete: (url: string, options?: RequestInit) => {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
    return ApiErrorHandler.fetchWithErrorHandling(fullUrl, { ...options, method: 'DELETE' });
  },
};

export default ApiErrorHandler; 