import { XMarkIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { useInstallPrompt } from '../../hooks'

export function InstallBanner() {
  const { isInstallable, isInstalled, isIOS, installPrompt, dismissPrompt, wasPromptDismissed, useCustomBanner } = useInstallPrompt()

  // Don't show if using browser's native UI instead of custom banner
  if (!useCustomBanner) return null

  // Don't show if already installed, dismissed, or not installable (and not iOS)
  if (isInstalled || wasPromptDismissed) return null
  if (!isInstallable && !isIOS) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-bottom animate-slide-up">
      <div className="mx-auto max-w-lg rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <DevicePhoneMobileIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Install PWA Demo
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {isIOS
                  ? 'Install this demo app to experience PWA features. Tap Share then "Add to Home Screen".'
                  : 'Install this demo to test PWA features offline and see how installation works.'
                }
              </p>
            </div>

            <button
              onClick={dismissPrompt}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Dismiss install prompt"
            >
              <XMarkIcon className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {!isIOS && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={dismissPrompt}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Not now
              </button>
              <button
                onClick={installPrompt}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
              >
                Install App
              </button>
            </div>
          )}

          {isIOS && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <div className="text-2xl">
                <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 8H9L12 2ZM12 22V10M7 14L12 10L17 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
