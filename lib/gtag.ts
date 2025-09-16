// Google Analytics gtag utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const gtag = (...args: any[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args)
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  gtag("event", eventName, parameters)
}

export const trackPageView = (path: string) => {
  gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: path,
  })
}
