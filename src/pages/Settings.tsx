import { useState, useEffect } from 'react'
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  BellIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'
import { useInstallPrompt } from '../hooks'

type Theme = 'light' | 'dark' | 'system'

export function Settings() {
  const {
    isInstalled,
    isInstallable,
    isIOS,
    installPrompt,
    resetDismissed,
    wasPromptDismissed,
    canShowNativePrompt
  } = useInstallPrompt()
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system'
  })

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemDark)
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  const themeOptions: { value: Theme; label: string; icon: typeof SunIcon }[] = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: ComputerDesktopIcon }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Settings
      </h1>

      {/* Theme Selection */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <h2 className="font-medium text-slate-900 dark:text-white mb-4">Appearance</h2>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                theme === value
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <Icon className={`w-6 h-6 ${
                theme === value
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`} />
              <span className={`text-sm ${
                theme === value
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Install App */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <DevicePhoneMobileIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="font-medium text-slate-900 dark:text-white">Install App</h2>
        </div>

        {isInstalled ? (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            This app is installed on your device.
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isIOS
                ? 'On iOS, tap the Share button in Safari and select "Add to Home Screen".'
                : isInstallable
                  ? 'Install this app for quick access and offline support.'
                  : wasPromptDismissed
                    ? 'You previously dismissed the install prompt. Click below to see it again.'
                    : canShowNativePrompt
                      ? 'Click below to install the app.'
                      : 'Your browser will show an install option when the app is ready.'
              }
            </p>

            <div className="flex flex-wrap gap-2">
              {isInstallable && (
                <button
                  onClick={installPrompt}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Install App
                </button>
              )}

              {wasPromptDismissed && !isInstallable && (
                <button
                  onClick={resetDismissed}
                  className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Show Install Prompt Again
                </button>
              )}
            </div>

            {!isIOS && (
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Note: The install prompt auto-resets after 7 days if dismissed.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <BellIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="font-medium text-slate-900 dark:text-white">Notifications</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          {'Notification' in window
            ? `Current permission: ${Notification.permission}`
            : 'Notifications are not supported in this browser'
          }
        </p>
        {'Notification' in window && Notification.permission === 'default' && (
          <button
            onClick={() => Notification.requestPermission()}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Enable Notifications
          </button>
        )}
      </div>

      {/* App Info */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <InformationCircleIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h2 className="font-medium text-slate-900 dark:text-white">About This Demo</h2>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Version</span>
            <span className="text-slate-900 dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Install Status</span>
            <span className={isInstalled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}>
              {isInstalled ? 'Installed' : 'Not Installed'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Built With</span>
            <span className="text-slate-900 dark:text-white">React + Vite + PWA Plugin</span>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <a
          href="https://github.com/craftcodery/pwa-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
        >
          <span className="text-slate-900 dark:text-white">View Source Code</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-400" />
        </a>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
        >
          <span className="text-slate-900 dark:text-white">MDN PWA Documentation</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-400" />
        </a>
        <a
          href="https://web.dev/explore/progressive-web-apps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
        >
          <span className="text-slate-900 dark:text-white">web.dev PWA Guide</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-slate-400" />
        </a>
      </div>
    </div>
  )
}
