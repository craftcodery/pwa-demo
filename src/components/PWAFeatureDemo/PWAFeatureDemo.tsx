import {
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  ShareIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline'
import { usePWAStatus, useOnlineStatus, useInstallPrompt } from '../../hooks'
import { useState } from 'react'

export function PWAFeatureDemo() {
  const pwaStatus = usePWAStatus()
  const isOnline = useOnlineStatus()
  const { isInstalled } = useInstallPrompt()
  const [badgeCount, setBadgeCount] = useState(0)
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null)

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      setNotificationStatus('Notifications not supported')
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setNotificationStatus(`Permission: ${permission}`)

      if (permission === 'granted') {
        new Notification('Daily Focus', {
          body: 'Notifications are now enabled!',
          icon: '/pwa-demo/icons/icon-192x192.png'
        })
      }
    } catch (error) {
      setNotificationStatus('Error requesting permission')
    }
  }

  const showTestNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: 'Time to check your focus items!',
        icon: '/pwa-demo/icons/icon-192x192.png',
        badge: '/pwa-demo/icons/icon-96x96.png',
        tag: 'reminder'
      })
    }
  }

  const updateBadge = async (count: number) => {
    setBadgeCount(count)
    if ('setAppBadge' in navigator) {
      try {
        if (count > 0) {
          await navigator.setAppBadge(count)
        } else {
          await navigator.clearAppBadge()
        }
      } catch (error) {
        console.error('Badge API error:', error)
      }
    }
  }

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Focus - PWA Demo',
          text: 'Check out this PWA demo showcasing modern web app features!',
          url: window.location.href
        })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error)
        }
      }
    }
  }

  const FeatureItem = ({
    icon: Icon,
    label,
    supported,
    status
  }: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    supported: boolean
    status?: string
  }) => (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          supported
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
        }`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
          {status && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{status}</p>
          )}
        </div>
      </div>
      {supported ? (
        <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
      ) : (
        <XCircleIcon className="w-5 h-5 text-slate-300 dark:text-slate-600" />
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          PWA Features Status
        </h2>

        <div className="space-y-2">
          <FeatureItem
            icon={DevicePhoneMobileIcon}
            label="Installed as App"
            supported={isInstalled}
            status={isInstalled ? 'Running standalone' : 'Running in browser'}
          />
          <FeatureItem
            icon={CloudIcon}
            label="Service Worker"
            supported={pwaStatus.serviceWorkerStatus === 'active'}
            status={pwaStatus.serviceWorkerStatus}
          />
          <FeatureItem
            icon={ArrowPathIcon}
            label="Online Status"
            supported={isOnline}
            status={isOnline ? 'Connected' : 'Offline'}
          />
          <FeatureItem
            icon={BellIcon}
            label="Notifications"
            supported={pwaStatus.notificationPermission === 'granted'}
            status={pwaStatus.notificationPermission}
          />
          <FeatureItem
            icon={ShareIcon}
            label="Web Share API"
            supported={pwaStatus.canShare}
          />
          <FeatureItem
            icon={Square3Stack3DIcon}
            label="Badging API"
            supported={pwaStatus.hasBadgingAPI}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Try PWA Features
        </h2>

        <div className="space-y-4">
          {/* Notifications */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
              Notifications
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={requestNotificationPermission}
                className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Request Permission
              </button>
              <button
                onClick={showTestNotification}
                disabled={pwaStatus.notificationPermission !== 'granted'}
                className="px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Show Test Notification
              </button>
            </div>
            {notificationStatus && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{notificationStatus}</p>
            )}
          </div>

          {/* Badging */}
          {pwaStatus.hasBadgingAPI && (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                App Badge (visible on installed app icon)
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateBadge(Math.max(0, badgeCount - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold text-slate-900 dark:text-white">
                  {badgeCount}
                </span>
                <button
                  onClick={() => updateBadge(badgeCount + 1)}
                  className="w-10 h-10 flex items-center justify-center text-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  +
                </button>
                <button
                  onClick={() => updateBadge(0)}
                  className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Share */}
          {pwaStatus.canShare && (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                Web Share API
              </h3>
              <button
                onClick={shareContent}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <ShareIcon className="w-4 h-4" />
                Share This Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
