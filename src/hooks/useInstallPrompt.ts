import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface UseInstallPromptReturn {
  isInstallable: boolean
  isInstalled: boolean
  isIOS: boolean
  installPrompt: () => Promise<void>
  dismissPrompt: () => void
  resetDismissed: () => void
  wasPromptDismissed: boolean
  canShowNativePrompt: boolean
  useCustomBanner: boolean
  setUseCustomBanner: (value: boolean) => void
}

export function useInstallPrompt(): UseInstallPromptReturn {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [useCustomBanner, setUseCustomBannerState] = useState(() => {
    const stored = localStorage.getItem('pwa-use-custom-banner')
    // Default to true (custom banner) if not set
    return stored !== 'false'
  })
  // Use sessionStorage so dismiss only lasts for current session (good for demo)
  const [wasPromptDismissed, setWasPromptDismissed] = useState(() => {
    return sessionStorage.getItem('pwa-install-dismissed') === 'true'
  })

  // Check if running in standalone mode (already installed)
  useEffect(() => {
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isIOSStandalone = (navigator as unknown as { standalone?: boolean }).standalone === true
      setIsInstalled(isStandalone || isIOSStandalone)
    }

    checkInstalled()

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addEventListener('change', checkInstalled)

    return () => mediaQuery.removeEventListener('change', checkInstalled)
  }, [])

  // Capture the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Only suppress browser's native UI if using custom banner
      // Read directly from localStorage to get the latest value
      const useCustom = localStorage.getItem('pwa-use-custom-banner') !== 'false'
      if (useCustom) {
        e.preventDefault()
      }
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      sessionStorage.removeItem('pwa-install-dismissed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installPrompt = useCallback(async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
      }

      // Clear the deferred prompt - can only be used once
      setDeferredPrompt(null)
    } catch (error) {
      console.error('Error showing install prompt:', error)
    }
  }, [deferredPrompt])

  const dismissPrompt = useCallback(() => {
    setWasPromptDismissed(true)
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }, [])

  const resetDismissed = useCallback(() => {
    setWasPromptDismissed(false)
    sessionStorage.removeItem('pwa-install-dismissed')
  }, [])

  const setUseCustomBanner = useCallback((value: boolean) => {
    setUseCustomBannerState(value)
    localStorage.setItem('pwa-use-custom-banner', value.toString())
  }, [])

  // Detect iOS for manual install instructions
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream

  return {
    isInstallable: !!deferredPrompt && !isInstalled,
    isInstalled,
    isIOS,
    installPrompt,
    dismissPrompt,
    resetDismissed,
    wasPromptDismissed,
    // True if we have a deferred prompt ready to show
    canShowNativePrompt: !!deferredPrompt,
    useCustomBanner,
    setUseCustomBanner
  }
}
