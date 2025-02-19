// Web Vitals
import { onCLS, onFID, onLCP, onTTFB } from 'web-vitals';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

// Send metrics to Google Analytics
const sendToAnalytics = ({ name, delta, value }: WebVitalsMetric) => {
  const eventParams = {
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    metric_value: value,
    metric_delta: delta,
  };

  window.gtag('event', name, eventParams);
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
};

// Error tracking
interface ErrorEvent {
  message: string;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
}

export const initErrorTracking = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event: ErrorEvent) => {
    const errorDetails = {
      message: event.message,
      source: event.source,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Send error to Google Analytics
    window.gtag('event', 'error', {
      event_category: 'JavaScript Error',
      event_label: errorDetails.message,
      value: 1,
      non_interaction: true,
      error_details: JSON.stringify(errorDetails),
    });

    // You can also send errors to other error tracking services here
  });

  window.addEventListener('unhandledrejection', (event) => {
    const errorDetails = {
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    // Send error to Google Analytics
    window.gtag('event', 'error', {
      event_category: 'Unhandled Promise Rejection',
      event_label: errorDetails.message,
      value: 1,
      non_interaction: true,
      error_details: JSON.stringify(errorDetails),
    });
  });
};

// Performance marks and measures
export const performance = {
  mark: (name: string) => {
    if (typeof window === 'undefined') return;
    performance.mark(name);
  },

  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window === 'undefined') return;
    try {
      const measure = performance.measure(name, startMark, endMark);
      
      // Send measurement to Google Analytics
      window.gtag('event', 'performance_measure', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(measure.duration),
        metric_name: name,
        metric_value: measure.duration,
      });
    } catch (error) {
      console.error('Error measuring performance:', error);
    }
  },

  clearMarks: () => {
    if (typeof window === 'undefined') return;
    performance.clearMarks();
  },

  clearMeasures: () => {
    if (typeof window === 'undefined') return;
    performance.clearMeasures();
  },
};
