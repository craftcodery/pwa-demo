import { useState, useEffect } from 'react'

interface PWAStatus {
  isStandalone: boolean
  hasServiceWorker: boolean
  serviceWorkerStatus: 'unsupported' | 'installing' | 'waiting' | 'active' | 'none'
  notificationPermission: NotificationPermission | 'unsupported'
  canShare: boolean
  canReceiveShare: boolean
  hasBadgingAPI: boolean
  hasBackgroundSync: boolean
  hasPushAPI: boolean
}

export function usePWAStatus(): PWAStatus {
  const [status, setStatus] = useState<PWAStatus>({
    isStandalone: false,
    hasServiceWorker: false,
    serviceWorkerStatus: 'none',
    notificationPermission: 'unsupported',
    canShare: false,
    canReceiveShare: false,
    hasBadgingAPI: false,
    hasBackgroundSync: false,
    hasPushAPI: false
  })

  useEffect(() => {
    const checkStatus = async () => {
      // Check standalone mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as unknown as { standalone?: boolean }).standalone === true

      // Check service worker
      const hasServiceWorker = 'serviceWorker' in navigator
      let serviceWorkerStatus: PWAStatus['serviceWorkerStatus'] = 'none'

      if (hasServiceWorker) {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          if (registration) {
            if (registration.installing) {
              serviceWorkerStatus = 'installing'
            } else if (registration.waiting) {
              serviceWorkerStatus = 'waiting'
            } else if (registration.active) {
              serviceWorkerStatus = 'active'
            }
          }
        } catch {
          serviceWorkerStatus = 'none'
        }
      } else {
        serviceWorkerStatus = 'unsupported'
      }

      // Check notification permission
      const notificationPermission: NotificationPermission | 'unsupported' =
        'Notification' in window ? Notification.permission : 'unsupported'

      // Check Web Share API
      const canShare = 'share' in navigator && 'canShare' in navigator

      // Check if can receive shares (has share_target in manifest)
      const canReceiveShare = hasServiceWorker && isStandalone

      // Check Badging API
      const hasBadgingAPI = 'setAppBadge' in navigator

      // Check Background Sync
      const hasBackgroundSync = 'serviceWorker' in navigator && 'sync' in (window as unknown as { SyncManager?: unknown })
        ? true : false

      // Check Push API
      const hasPushAPI = 'PushManager' in window

      setStatus({
        isStandalone,
        hasServiceWorker,
        serviceWorkerStatus,
        notificationPermission,
        canShare,
        canReceiveShare,
        hasBadgingAPI,
        hasBackgroundSync,
        hasPushAPI
      })
    }

    checkStatus()

    // Re-check when visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkStatus()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return status
}
