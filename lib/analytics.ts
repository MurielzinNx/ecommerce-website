"use client"

// Analytics and monitoring utilities
export class Analytics {
  private static instance: Analytics
  private initialized = false

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  init() {
    if (this.initialized || typeof window === "undefined") return

    // Initialize analytics services
    this.initGoogleAnalytics()
    this.initWebVitals()
    this.initialized = true
  }

  private initGoogleAnalytics() {
    // Add Google Analytics if GA_MEASUREMENT_ID is available
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (measurementId) {
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      script.async = true
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag("js", new Date())
      gtag("config", measurementId)

      // Make gtag available globally
      ;(window as any).gtag = gtag
    }
  }

  private initWebVitals() {
    // Monitor Core Web Vitals
    if ("performance" in window) {
      // CLS (Cumulative Layout Shift)
      let clsValue = 0
      const clsEntries: PerformanceEntry[] = []

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            clsEntries.push(entry)
          }
        }
      })

      try {
        observer.observe({ type: "layout-shift", buffered: true })
      } catch (e) {
        // Layout shift not supported
      }

      // Report CLS on page unload
      window.addEventListener("beforeunload", () => {
        if (clsValue > 0) {
          this.trackEvent("web_vitals", {
            metric_name: "CLS",
            value: clsValue,
            rating: clsValue < 0.1 ? "good" : clsValue < 0.25 ? "needs-improvement" : "poor",
          })
        }
      })
    }
  }

  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventName, parameters)
    }

    // Also log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${eventName}`, parameters)
    }
  }

  trackPageView(path: string) {
    this.trackEvent("page_view", {
      page_path: path,
      page_title: document.title,
    })
  }

  trackPurchase(transactionId: string, value: number, currency = "BRL") {
    this.trackEvent("purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    })
  }

  trackSearch(searchTerm: string, results?: number) {
    this.trackEvent("search", {
      search_term: searchTerm,
      results_count: results,
    })
  }

  trackError(error: Error, context?: string) {
    this.trackEvent("exception", {
      description: error.message,
      fatal: false,
      context: context,
    })
  }
}

// Initialize analytics
if (typeof window !== "undefined") {
  Analytics.getInstance().init()
}

export const analytics = Analytics.getInstance()
