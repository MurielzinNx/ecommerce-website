import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth"
import { AccessibilityProvider } from "@/components/accessibility-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { SkipNavigation } from "@/components/skip-navigation"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Loja Moderna - E-commerce Brasileiro",
  description: "Sua loja online moderna com os melhores produtos e experiência de compra",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Loja Moderna",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://lojamoderna.com.br",
    siteName: "Loja Moderna",
    title: "Loja Moderna - E-commerce Brasileiro",
    description: "Sua loja online moderna com os melhores produtos e experiência de compra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loja Moderna - E-commerce Brasileiro",
    description: "Sua loja online moderna com os melhores produtos e experiência de compra",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <SkipNavigation />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <AccessibilityProvider>
                <AuthProvider>
                  <div id="main-content">{children}</div>
                </AuthProvider>
              </AccessibilityProvider>
            </ThemeProvider>
          </Suspense>
        </ErrorBoundary>
        <PerformanceMonitor />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
