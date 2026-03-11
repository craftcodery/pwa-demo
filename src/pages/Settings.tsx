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
    canShowNativePrompt,
    useCustomBanner,
    setUseCustomBanner
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
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#3C3E3E] dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
          Customize your app experience and manage preferences
        </p>
      </div>

      {/* Theme Selection */}
      <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <h2 id="theme-heading" className="font-medium text-[#3C3E3E] dark:text-white mb-4">Appearance</h2>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="theme-heading">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              role="radio"
              aria-checked={theme === value}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-offset-2 ${
                theme === value
                  ? 'border-[#24554F] dark:border-[#40968C] bg-[#24554F] dark:bg-[#40968C]'
                  : 'border-[#CBCDCD] dark:border-[#5A5E5D] hover:border-[#979B9A] dark:hover:border-[#696D6D]'
              }`}
            >
              <Icon className={`w-6 h-6 ${
                theme === value
                  ? 'text-white'
                  : 'text-[#505353] dark:text-[#B1B4B4]'
              }`} />
              <span className={`text-sm ${
                theme === value
                  ? 'text-white font-medium'
                  : 'text-[#505353] dark:text-[#B1B4B4]'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Install App */}
      <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <div className="flex items-center gap-3 mb-4">
          <DevicePhoneMobileIcon className="w-5 h-5 text-[#505353] dark:text-[#B1B4B4]" />
          <h2 className="font-medium text-[#3C3E3E] dark:text-white">Install App</h2>
        </div>

        {isInstalled ? (
          <p className="text-sm text-[#24554F] dark:text-[#40968C]">
            This app is installed on your device.
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-[#505353] dark:text-[#B1B4B4]">
              {isIOS
                ? 'On iOS, tap the Share button in Safari and select "Add to Home Screen".'
                : isInstallable || canShowNativePrompt
                  ? 'Install this app for quick access and offline support.'
                  : 'Your browser may not support PWA installation, or shields/privacy settings may be blocking it. Try disabling Brave Shields or using Chrome.'
              }
            </p>

            <div className="flex flex-wrap gap-2">
              {(isInstallable || canShowNativePrompt) && (
                <button
                  onClick={installPrompt}
                  className="px-4 py-2 text-sm bg-[#24554F] dark:bg-[#40968C] text-white rounded-lg hover:bg-[#2E6B64] dark:hover:bg-[#378178] transition-colors"
                >
                  Install App
                </button>
              )}

              {wasPromptDismissed && canShowNativePrompt && (
                <button
                  onClick={resetDismissed}
                  className="px-4 py-2 text-sm bg-[#E5E6E6] dark:bg-[#5A5E5D] text-[#505353] dark:text-[#B1B4B4] rounded-lg hover:bg-[#CBCDCD] dark:hover:bg-[#696D6D] transition-colors"
                >
                  Show Install Banner
                </button>
              )}
            </div>

            {/* Install status info */}
            <div className="mt-3 p-2 bg-[#CBCDCD]/50 dark:bg-[#3C3E3E] rounded-lg border border-[#B1B4B4] dark:border-[#505353]">
              <p className="text-xs text-[#505353] dark:text-[#B1B4B4] font-mono">
                Status: {canShowNativePrompt ? 'Install prompt available' : 'Waiting for browser install prompt'}
                {wasPromptDismissed && ' (banner dismissed)'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Install Prompt Style */}
      {!isInstalled && !isIOS && (
        <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
          <h2 className="font-medium text-[#3C3E3E] dark:text-white mb-2">Install Prompt Style</h2>
          <p className="text-sm text-[#505353] dark:text-[#B1B4B4] mb-4">
            Choose how the install prompt appears. This setting takes effect on the next page load.
          </p>

          <div className="space-y-2">
            <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              useCustomBanner
                ? 'border-[#24554F] bg-[#24554F]/10 dark:bg-[#40968C]/20'
                : 'border-[#CBCDCD] dark:border-[#5A5E5D] hover:border-[#979B9A] dark:hover:border-[#696D6D]'
            }`}>
              <input
                type="radio"
                name="promptStyle"
                checked={useCustomBanner}
                onChange={() => setUseCustomBanner(true)}
                className="mt-1 accent-[#24554F]"
              />
              <div>
                <span className="font-medium text-[#3C3E3E] dark:text-white">Custom Banner</span>
                <p className="text-xs text-[#505353] dark:text-[#B1B4B4] mt-0.5">
                  Shows our custom install banner at the top of the screen with dismiss option.
                </p>
              </div>
            </label>

            <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              !useCustomBanner
                ? 'border-[#24554F] bg-[#24554F]/10 dark:bg-[#40968C]/20'
                : 'border-[#CBCDCD] dark:border-[#5A5E5D] hover:border-[#979B9A] dark:hover:border-[#696D6D]'
            }`}>
              <input
                type="radio"
                name="promptStyle"
                checked={!useCustomBanner}
                onChange={() => setUseCustomBanner(false)}
                className="mt-1 accent-[#24554F]"
              />
              <div>
                <span className="font-medium text-[#3C3E3E] dark:text-white">Browser Native UI</span>
                <p className="text-xs text-[#505353] dark:text-[#B1B4B4] mt-0.5">
                  Let the browser show its own install UI (mini-infobar on Android, address bar icon on desktop).
                </p>
              </div>
            </label>
          </div>

          <div className="mt-3 p-3 bg-[#FFAB40]/10 dark:bg-[#FFAB40]/20 rounded-lg border border-[#FFAB40]/30 dark:border-[#FFAB40]/40">
            <p className="text-xs text-[#7D8281] dark:text-[#B1B4B4]">
              <strong className="text-[#505353] dark:text-white">Browser Native UI notes:</strong>
            </p>
            <ul className="text-xs text-[#505353] dark:text-[#B1B4B4] mt-1 ml-4 list-disc space-y-1">
              <li>Requires page refresh after changing this setting</li>
              <li>Chrome/Edge: Look for install icon in address bar</li>
              <li>Brave: May require disabling Shields for this site</li>
              <li>Browser decides when to show UI based on engagement</li>
            </ul>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <div className="flex items-center gap-3 mb-4">
          <BellIcon className="w-5 h-5 text-[#505353] dark:text-[#B1B4B4]" />
          <h2 className="font-medium text-[#3C3E3E] dark:text-white">Notifications</h2>
        </div>
        <p className="text-sm text-[#505353] dark:text-[#B1B4B4] mb-4">
          {'Notification' in window
            ? `Current permission: ${Notification.permission}`
            : 'Notifications are not supported in this browser'
          }
        </p>
        {'Notification' in window && Notification.permission === 'default' && (
          <button
            onClick={() => Notification.requestPermission()}
            className="px-4 py-2 text-sm bg-[#24554F] dark:bg-[#40968C] text-white rounded-lg hover:bg-[#2E6B64] dark:hover:bg-[#378178] transition-colors"
          >
            Enable Notifications
          </button>
        )}
      </div>

      {/* App Info */}
      <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <div className="flex items-center gap-3 mb-4">
          <InformationCircleIcon className="w-5 h-5 text-[#505353] dark:text-[#B1B4B4]" />
          <h2 className="font-medium text-[#3C3E3E] dark:text-white">About This Demo</h2>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#505353] dark:text-[#B1B4B4]">Version</span>
            <span className="text-[#3C3E3E] dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#505353] dark:text-[#B1B4B4]">Install Status</span>
            <span className={isInstalled ? 'text-[#24554F] dark:text-[#40968C]' : 'text-[#3C3E3E] dark:text-white'}>
              {isInstalled ? 'Installed' : 'Not Installed'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#505353] dark:text-[#B1B4B4]">Built By</span>
            <span className="text-[#3C3E3E] dark:text-white">NorthBuilt</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#505353] dark:text-[#B1B4B4]">Built With</span>
            <span className="text-[#3C3E3E] dark:text-white">React + Vite + PWA Plugin</span>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <a
          href="https://northbuilt.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D] hover:border-[#24554F] dark:hover:border-[#40968C] transition-colors"
        >
          <span className="text-[#3C3E3E] dark:text-white">NorthBuilt Website</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-[#979B9A]" />
        </a>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D] hover:border-[#24554F] dark:hover:border-[#40968C] transition-colors"
        >
          <span className="text-[#3C3E3E] dark:text-white">MDN PWA Documentation</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-[#979B9A]" />
        </a>
        <a
          href="https://web.dev/explore/progressive-web-apps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D] hover:border-[#24554F] dark:hover:border-[#40968C] transition-colors"
        >
          <span className="text-[#3C3E3E] dark:text-white">web.dev PWA Guide</span>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 text-[#979B9A]" />
        </a>
      </div>
    </div>
  )
}
