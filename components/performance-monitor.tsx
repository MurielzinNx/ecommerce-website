"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics
          console.log(`[Performance] ${entry.name}: ${entry.value}ms`)

          // Send to analytics if available
          if (typeof window.gtag !== "undefined") {
            window.gtag("event", "web_vitals", {
              event_category: "Performance",
              event_label: entry.name,
              value: Math.round(entry.value),
              non_interaction: true,
            })
          }
        }
      })

      // Observe Core Web Vitals
      try {
        observer.observe({ entryTypes: ["measure", "navigation", "paint"] })
      } catch (e) {
        console.warn("Performance Observer not supported")
      }

      // Monitor page load performance
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            ttfb: navigation.responseStart - navigation.requestStart,
            download: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            load: navigation.loadEventEnd - navigation.navigationStart,
          }

          console.log("[Performance Metrics]", metrics)
        }
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return null
}
