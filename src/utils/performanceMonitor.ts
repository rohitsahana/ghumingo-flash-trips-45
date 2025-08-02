// Performance monitoring utility to prevent crashes
// This monitors memory usage, CPU usage, and other performance metrics

interface PerformanceMetrics {
  memoryUsage: number;
  cpuUsage: number;
  renderTime: number;
  errorCount: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    memoryUsage: 0,
    cpuUsage: 0,
    renderTime: 0,
    errorCount: 0
  };
  private errorThreshold = 5;
  private memoryThreshold = 100 * 1024 * 1024; // 100MB
  private isMonitoring = false;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorMemory();
    this.monitorErrors();
    this.monitorRenderPerformance();
    
    console.log('🚀 Performance monitoring started');
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('🛑 Performance monitoring stopped');
  }

  private monitorMemory() {
    if (!this.isMonitoring) return;

    setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        this.metrics.memoryUsage = memory.usedJSHeapSize;
        
        // Warn if memory usage is high
        if (this.metrics.memoryUsage > this.memoryThreshold) {
          console.warn('⚠️ High memory usage detected:', 
            Math.round(this.metrics.memoryUsage / 1024 / 1024) + 'MB');
          this.triggerMemoryCleanup();
        }
      }
    }, 10000); // Check every 10 seconds
  }

  private monitorErrors() {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      this.metrics.errorCount++;
      originalError.apply(console, args);
      
      if (this.metrics.errorCount > this.errorThreshold) {
        console.warn('⚠️ High error count detected:', this.metrics.errorCount);
        this.triggerErrorRecovery();
      }
    };
    
    console.warn = (...args) => {
      originalWarn.apply(console, args);
    };
  }

  private monitorRenderPerformance() {
    let renderStartTime = 0;
    
    // Monitor React render performance
    const originalRender = React.Component.prototype.render;
    React.Component.prototype.render = function() {
      renderStartTime = performance.now();
      const result = originalRender.call(this);
      const renderTime = performance.now() - renderStartTime;
      
      PerformanceMonitor.getInstance().metrics.renderTime = renderTime;
      
      if (renderTime > 100) { // Warn if render takes more than 100ms
        console.warn('⚠️ Slow render detected:', Math.round(renderTime) + 'ms');
      }
      
      return result;
    };
  }

  private triggerMemoryCleanup() {
    // Force garbage collection if available
    if ('gc' in window) {
      (window as any).gc();
    }
    
    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    console.log('🧹 Memory cleanup triggered');
  }

  private triggerErrorRecovery() {
    // Reset error count
    this.metrics.errorCount = 0;
    
    // Reload the page if too many errors
    if (this.metrics.errorCount > this.errorThreshold * 2) {
      console.warn('🔄 Too many errors, reloading page...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  logMetrics() {
    console.group('📊 Performance Metrics');
    console.log('Memory Usage:', Math.round(this.metrics.memoryUsage / 1024 / 1024) + 'MB');
    console.log('Render Time:', Math.round(this.metrics.renderTime) + 'ms');
    console.log('Error Count:', this.metrics.errorCount);
    console.groupEnd();
  }
}

// Auto-start monitoring in development
if (import.meta.env.DEV) {
  PerformanceMonitor.getInstance().startMonitoring();
}

export default PerformanceMonitor; 