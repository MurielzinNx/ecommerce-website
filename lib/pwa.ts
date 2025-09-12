"use client"

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[PWA] Service Worker registered successfully:", registration.scope)
        })
        .catch((error) => {
          console.log("[PWA] Service Worker registration failed:", error)
        })
    })
  }
}

export function installPrompt() {
  let deferredPrompt: any

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    deferredPrompt = e

    // Show install button or banner
    const installButton = document.getElementById("install-button")
    if (installButton) {
      installButton.style.display = "block"
      installButton.addEventListener("click", () => {
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            console.log("[PWA] User accepted the install prompt")
          }
          deferredPrompt = null
        })
      })
    }
  })
}
