import { useState, useEffect } from 'react'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  BellIcon,
  ShareIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  ClipboardIcon,
  MapPinIcon,
  CameraIcon,
  SpeakerWaveIcon,
  FingerPrintIcon,
  BoltIcon
} from '@heroicons/react/24/outline'
import { usePWAStatus, useOnlineStatus, useInstallPrompt } from '../hooks'

type SupportStatus = 'supported' | 'unsupported' | 'partial' | 'unknown'

interface CapabilityDemo {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  browserSupport: string
  status: SupportStatus
  action?: () => void
  actionLabel?: string
  result?: string
}

type Category = 'core' | 'device' | 'engagement'

interface CapabilitiesProps {
  initialTab?: Category
  onTabChange?: (tab: Category) => void
}

export function Capabilities({ initialTab, onTabChange }: CapabilitiesProps) {
  const pwaStatus = usePWAStatus()
  const isOnline = useOnlineStatus()
  const { isInstalled } = useInstallPrompt()

  const [results, setResults] = useState<Record<string, string>>({})
  const [activeCategory, setActiveCategory] = useState<Category>(initialTab || 'core')
  // Track mount state to animate icon backgrounds from grey to their status color
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // Small delay to ensure the initial grey state is visible before transitioning
    const timer = setTimeout(() => setHasMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Sync with URL when initialTab changes (browser back/forward)
  useEffect(() => {
    if (initialTab && initialTab !== activeCategory) {
      setActiveCategory(initialTab)
    }
  }, [initialTab])

  // Handle tab change and update URL
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
    onTabChange?.(category)
  }

  const setResult = (id: string, result: string) => {
    setResults(prev => ({ ...prev, [id]: result }))
  }

  // Helper to check permission state via Permissions API
  const checkPermission = async (name: PermissionName): Promise<PermissionState | 'unsupported'> => {
    if (!navigator.permissions?.query) {
      return 'unsupported'
    }
    try {
      const result = await navigator.permissions.query({ name })
      return result.state
    } catch {
      return 'unsupported'
    }
  }

  // Test functions
  const testNotifications = async () => {
    if (!('Notification' in window)) {
      setResult('notifications', 'Not supported in this browser')
      return
    }

    // Check current permission state
    const currentState = Notification.permission
    if (currentState === 'denied') {
      setResult('notifications', 'Permission blocked. To reset: click lock icon in URL bar → Site settings → Notifications → Allow')
      return
    }

    // Helper to show notification via Service Worker (better compatibility)
    const showNotification = async () => {
      const options: NotificationOptions = {
        body: 'Notifications are working! This notification was triggered from the PWA Demo.',
        icon: `${import.meta.env.BASE_URL}icons/icon-192x192.png`,
        badge: `${import.meta.env.BASE_URL}icons/icon-72x72.png`,
        tag: 'pwa-demo-test',
        requireInteraction: false
      }

      // Try Service Worker notification first (works better in Brave and other browsers)
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        try {
          const registration = await navigator.serviceWorker.ready
          await registration.showNotification('PWA Demo', options)
          return true
        } catch (e) {
          console.log('SW notification failed, falling back to regular notification', e)
        }
      }

      // Fallback to regular Notification API
      try {
        new Notification('PWA Demo', options)
        return true
      } catch (e) {
        console.error('Notification error:', e)
        return false
      }
    }

    if (currentState === 'granted') {
      const sent = await showNotification()
      if (sent) {
        setResult('notifications', 'Notification sent! Check your system notifications (may appear in notification center on desktop).')
      } else {
        setResult('notifications', 'Failed to send notification. Check browser notification settings.')
      }
      return
    }

    // Need to request permission
    setResult('notifications', 'Requesting permission... (check for browser prompt)')

    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        const sent = await showNotification()
        if (sent) {
          setResult('notifications', 'Permission granted - notification sent! Check your system notifications.')
        } else {
          setResult('notifications', 'Permission granted but notification failed. Try again.')
        }
      } else if (permission === 'denied') {
        setResult('notifications', 'Permission denied. To reset: click lock icon in URL bar → Site settings → Notifications → Allow')
      } else {
        setResult('notifications', 'Permission dismissed (closed without choosing). Try again and click Allow.')
      }
    } catch (e) {
      setResult('notifications', `Error: ${e}`)
    }
  }

  const testShare = async () => {
    if (!navigator.share) {
      setResult('share', 'Web Share API not supported')
      return
    }

    try {
      await navigator.share({
        title: 'PWA Demo',
        text: 'Check out this PWA capabilities demo!',
        url: window.location.href
      })
      setResult('share', 'Shared successfully!')
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        setResult('share', 'Share cancelled by user')
      } else {
        setResult('share', `Error: ${(e as Error).message}`)
      }
    }
  }

  const testBadge = async () => {
    if (!('setAppBadge' in navigator)) {
      setResult('badge', 'Badging API not supported')
      return
    }

    // Note: Badges work best when app is installed. On some platforms, may require notification permission.
    try {
      await navigator.setAppBadge(5)
      setResult('badge', 'Badge set to 5! Check your app icon (works best when installed as PWA).')
      setTimeout(async () => {
        try {
          await navigator.clearAppBadge()
          setResult('badge', 'Badge cleared after 3 seconds')
        } catch {
          // Ignore clear errors
        }
      }, 3000)
    } catch (e) {
      const error = e as Error
      if (error.name === 'NotAllowedError') {
        setResult('badge', 'Badge permission denied. Try installing the app first, or grant notification permission.')
      } else if (error.name === 'SecurityError') {
        setResult('badge', 'Security error. Badges work best when app is installed as PWA.')
      } else {
        setResult('badge', `Error: ${error.message || e}`)
      }
    }
  }

  const testClipboard = async () => {
    if (!navigator.clipboard) {
      setResult('clipboard', 'Clipboard API not supported')
      return
    }

    // Check current permission state (clipboard-write is auto-granted in most browsers for active tab)
    const permState = await checkPermission('clipboard-write' as PermissionName)
    if (permState === 'denied') {
      setResult('clipboard', 'Permission blocked. To reset: click lock icon in URL bar → Site settings → Clipboard → Allow')
      return
    }

    try {
      await navigator.clipboard.writeText('Hello from PWA Demo!')
      setResult('clipboard', 'Text "Hello from PWA Demo!" copied to clipboard! Try pasting somewhere.')
    } catch (e) {
      const error = e as Error
      if (error.name === 'NotAllowedError') {
        setResult('clipboard', 'Permission denied. This usually requires a user gesture (click). Try clicking the button again.')
      } else if (error.name === 'SecurityError') {
        setResult('clipboard', 'Security error. Clipboard requires HTTPS and document focus.')
      } else {
        setResult('clipboard', `Error: ${error.message}`)
      }
    }
  }

  const testGeolocation = async () => {
    if (!navigator.geolocation) {
      setResult('geolocation', 'Geolocation not supported')
      return
    }

    // Check current permission state first
    const permState = await checkPermission('geolocation')
    if (permState === 'denied') {
      setResult('geolocation', 'Permission blocked. To reset: click lock icon in URL bar → Site settings → Location → Allow')
      return
    }

    if (permState === 'granted') {
      setResult('geolocation', 'Permission granted. Getting location...')
    } else {
      setResult('geolocation', 'Requesting permission... (check for browser prompt)')
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setResult('geolocation', `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`)
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          // Permission was denied - could be browser-level block (Brave shields, etc.)
          setResult('geolocation', 'Permission denied. Check: (1) Browser shields/privacy settings (2) Click lock icon → Site settings → Location → Allow (3) Browser settings → Privacy → Location')
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setResult('geolocation', 'Location unavailable - check device GPS/location settings')
        } else if (err.code === err.TIMEOUT) {
          setResult('geolocation', 'Location request timed out - try again')
        } else {
          setResult('geolocation', `Error: ${err.message}`)
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  }

  const testVibration = () => {
    if (!navigator.vibrate) {
      setResult('vibration', 'Vibration API not supported')
      return
    }

    navigator.vibrate([200, 100, 200])
    setResult('vibration', 'Device should vibrate (if supported)')
  }

  const testCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setResult('camera', 'Camera access not supported')
      return
    }

    // Check current permission state first
    const permState = await checkPermission('camera' as PermissionName)
    if (permState === 'denied') {
      setResult('camera', 'Permission blocked. To reset: click lock icon in URL bar → Site settings → Camera → Allow')
      return
    }

    if (permState === 'granted') {
      setResult('camera', 'Permission granted. Accessing camera...')
    } else {
      setResult('camera', 'Requesting permission... (check for browser prompt)')
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setResult('camera', 'Camera access granted!')
    } catch (e) {
      const error = e as Error
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setResult('camera', 'Permission denied. To reset: click lock icon in URL bar → Site settings → Camera → Allow')
      } else if (error.name === 'NotFoundError') {
        setResult('camera', 'No camera found on this device')
      } else if (error.name === 'NotReadableError') {
        setResult('camera', 'Camera is in use by another application')
      } else {
        setResult('camera', `Error: ${error.message}`)
      }
    }
  }

  const testBiometrics = async () => {
    if (!window.PublicKeyCredential) {
      setResult('biometrics', 'WebAuthn not supported in this browser')
      return
    }

    // Check if platform authenticator (biometrics) is available
    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      if (!available) {
        setResult('biometrics', 'No biometric authenticator available on this device')
        return
      }

      setResult('biometrics', 'Biometric authenticator available! In production, you would register/authenticate credentials here.')
    } catch (e) {
      setResult('biometrics', `Error checking availability: ${(e as Error).message}`)
    }
  }

  const coreCapabilities: CapabilityDemo[] = [
    {
      id: 'service-worker',
      name: 'Service Worker',
      icon: BoltIcon,
      description: 'Background scripts for offline caching and push notifications',
      browserSupport: 'Chrome 40+, Edge 17+, Firefox 44+, Safari 11.1+',
      status: pwaStatus.serviceWorkerStatus === 'active' ? 'supported' : 'partial'
    },
    {
      id: 'offline',
      name: 'Offline Support',
      icon: WifiIcon,
      description: 'App works without internet connection',
      browserSupport: 'All browsers with Service Worker support (~96%)',
      status: isOnline ? 'supported' : 'supported',
      actionLabel: isOnline ? 'You are online' : 'You are offline - app still works!'
    },
    {
      id: 'install',
      name: 'Installable',
      icon: DevicePhoneMobileIcon,
      description: 'Add to home screen like a native app',
      browserSupport: 'Chrome/Edge (prompt), Safari 17+ (Add to Dock), iOS (Add to Home Screen)',
      status: isInstalled ? 'supported' : 'partial',
      actionLabel: isInstalled ? 'App is installed!' : 'Install via browser or banner'
    }
  ]

  const engagementCapabilities: CapabilityDemo[] = [
    {
      id: 'notifications',
      name: 'Push Notifications',
      icon: BellIcon,
      description: 'Send notifications even when app is closed',
      browserSupport: 'Chrome 50+, Edge 17+, Firefox 44+, Safari 16+ (iOS: PWA only, 16.4+)',
      status: pwaStatus.notificationPermission === 'granted' ? 'supported' :
              pwaStatus.notificationPermission === 'unsupported' ? 'unsupported' : 'partial',
      action: testNotifications,
      actionLabel: 'Test Notification'
    },
    {
      id: 'badge',
      name: 'App Badges',
      icon: Square3Stack3DIcon,
      description: 'Show notification count on app icon',
      browserSupport: 'Chrome 81+, Edge 81+, Safari iOS 16.4+ (installed PWAs only)',
      status: pwaStatus.hasBadgingAPI ? 'supported' : 'unsupported',
      action: testBadge,
      actionLabel: 'Set Badge'
    },
    {
      id: 'share',
      name: 'Web Share',
      icon: ShareIcon,
      description: 'Share content using native share dialog',
      browserSupport: 'Chrome 89+, Edge 93+, Safari 12.1+, Firefox mobile only',
      status: pwaStatus.canShare ? 'supported' : 'unsupported',
      action: testShare,
      actionLabel: 'Share This Page'
    },
    {
      id: 'shortcuts',
      name: 'App Shortcuts',
      icon: Squares2X2Icon,
      description: 'Quick actions from app icon context menu',
      browserSupport: 'Chrome 84+, Edge 84+, Samsung Internet, Opera (not Safari)',
      status: 'supported',
      actionLabel: 'Long-press or right-click installed app icon to see shortcuts'
    }
  ]

  const deviceCapabilities: CapabilityDemo[] = [
    {
      id: 'clipboard',
      name: 'Clipboard',
      icon: ClipboardIcon,
      description: 'Read and write to system clipboard',
      browserSupport: 'All modern browsers (HTTPS + user gesture required)',
      status: navigator.clipboard ? 'supported' : 'unsupported',
      action: testClipboard,
      actionLabel: 'Copy Text'
    },
    {
      id: 'geolocation',
      name: 'Geolocation',
      icon: MapPinIcon,
      description: 'Access device GPS location (foreground only)',
      browserSupport: 'All browsers (no background/geofencing in PWAs)',
      status: navigator.geolocation ? 'supported' : 'unsupported',
      action: testGeolocation,
      actionLabel: 'Get Location'
    },
    {
      id: 'camera',
      name: 'Camera Access',
      icon: CameraIcon,
      description: 'Access device camera for photos/video',
      browserSupport: 'All modern browsers (HTTPS required)',
      status: navigator.mediaDevices ? 'supported' : 'unsupported',
      action: testCamera,
      actionLabel: 'Test Camera'
    },
    {
      id: 'vibration',
      name: 'Vibration',
      icon: SpeakerWaveIcon,
      description: 'Haptic feedback on supported devices',
      browserSupport: 'Chrome, Edge, Firefox, Opera (not Safari/iOS)',
      status: 'vibrate' in navigator ? 'supported' : 'unsupported',
      action: testVibration,
      actionLabel: 'Vibrate'
    },
    {
      id: 'biometrics',
      name: 'Biometric Auth',
      icon: FingerPrintIcon,
      description: 'Face ID, Touch ID, fingerprint via WebAuthn',
      browserSupport: 'Chrome 67+, Edge 18+, Firefox 60+, Safari 14.5+',
      status: window.PublicKeyCredential ? 'supported' : 'unsupported',
      action: testBiometrics,
      actionLabel: 'Check Availability'
    }
  ]

  const categories = [
    { id: 'core', label: 'Core PWA', capabilities: coreCapabilities },
    { id: 'engagement', label: 'Engagement', capabilities: engagementCapabilities },
    { id: 'device', label: 'Device APIs', capabilities: deviceCapabilities }
  ] as const

  const currentCapabilities = categories.find(c => c.id === activeCategory)?.capabilities || []

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#3C3E3E] dark:text-white">
          PWA Capabilities
        </h1>
        <p className="mt-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
          Test what your browser supports. Status reflects this device.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 p-1.5 bg-[#CBCDCD] dark:bg-[#3C3E3E] rounded-xl border border-[#B1B4B4] dark:border-[#505353]">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-offset-1 ${
              activeCategory === cat.id
                ? 'bg-white dark:bg-[#505353] text-[#24554F] dark:text-white shadow-md border border-[#979B9A] dark:border-[#696D6D]'
                : 'text-[#505353] dark:text-[#B1B4B4] hover:text-[#24554F] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#505353]/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Capabilities List */}
      <div className="space-y-3">
        {currentCapabilities.map((cap) => (
          <div
            key={cap.id}
            className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                !hasMounted
                  ? 'bg-[#CBCDCD] dark:bg-[#5A5E5D]'
                  : cap.status === 'supported'
                    ? 'bg-emerald-100 dark:bg-emerald-900/30'
                    : cap.status === 'partial'
                      ? 'bg-amber-100 dark:bg-amber-900/30'
                      : 'bg-[#CBCDCD] dark:bg-[#5A5E5D]'
              }`}>
                <cap.icon className={`w-5 h-5 transition-colors duration-300 ${
                  !hasMounted
                    ? 'text-[#696D6D] dark:text-[#B1B4B4]'
                    : cap.status === 'supported'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : cap.status === 'partial'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-[#979B9A]'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#3C3E3E] dark:text-white">{cap.name}</h3>
                <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4] mt-0.5">
                  {cap.description}
                </p>
                <p className="text-xs text-[#979B9A] dark:text-[#7D8281] mt-1">
                  {cap.browserSupport}
                </p>

                {(cap.action || cap.actionLabel) && (
                  <div className="mt-3 flex items-center gap-3">
                    {cap.action && (
                      <button
                        onClick={cap.action}
                        disabled={cap.status === 'unsupported'}
                        className="px-3 py-1.5 text-xs font-medium bg-[#24554F] dark:bg-[#40968C] text-white rounded-lg hover:bg-[#2E6B64] dark:hover:bg-[#378178] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cap.actionLabel}
                      </button>
                    )}
                    {!cap.action && cap.actionLabel && (
                      <span className="text-xs text-[#7D8281] dark:text-[#B1B4B4] italic">
                        {cap.actionLabel}
                      </span>
                    )}
                  </div>
                )}

                {results[cap.id] && (
                  <div className="mt-2 p-2 bg-[#24554F]/10 dark:bg-[#3C3E3E] rounded-lg border border-[#24554F]/20 dark:border-[#505353]">
                    <p className="text-xs text-[#505353] dark:text-[#B1B4B4] font-mono">
                      {results[cap.id]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-[#505353] dark:text-[#B1B4B4] pt-2">
        <div className="flex items-center gap-1">
          <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
          <span>Supported</span>
        </div>
        <div className="flex items-center gap-1">
          <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
          <span>Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircleIcon className="w-4 h-4 text-[#979B9A] dark:text-[#696D6D]" />
          <span>Unsupported</span>
        </div>
      </div>

      {/* Note */}
      <div className="p-4 bg-white dark:bg-[#505353]/50 rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D] text-center">
        <p className="text-xs text-[#505353] dark:text-[#B1B4B4]">
          Some features require HTTPS, user permission, or may only work when the app is installed.
          <br />
          Results vary by browser and operating system.
        </p>
      </div>
    </div>
  )
}
