import { XMarkIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { useInstallPrompt } from '../../hooks'

export function InstallBanner() {
  const { isInstallable, isInstalled, isIOS, installPrompt, dismissPrompt, wasPromptDismissed, useCustomBanner } = useInstallPrompt()

  // Don't show if using browser's native UI instead of custom banner
  if (!useCustomBanner) return null

  // isInstalled is known synchronously - no flicker
  if (isInstalled || wasPromptDismissed) return null

  // For iOS, show instructions banner; for others, wait until we know it's installable
  if (!isInstallable && !isIOS) return null

  return (
    <div className="fixed top-16 md:top-4 left-0 right-0 md:left-64 z-50 px-4 safe-area-top animate-slide-down">
      <div className="mx-auto max-w-lg rounded-2xl bg-white dark:bg-[#505353] shadow-2xl border border-[#CBCDCD] dark:border-[#5A5E5D] overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#24554F]/10 dark:bg-[#40968C]/20 flex items-center justify-center">
              <DevicePhoneMobileIcon className="w-6 h-6 text-[#24554F] dark:text-[#40968C]" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-[#3C3E3E] dark:text-white">
                Install PWA Demo
              </h3>
              <p className="mt-1 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
                {isIOS
                  ? 'Install this demo app to experience PWA features. Tap Share then "Add to Home Screen".'
                  : 'Install this demo to test PWA features offline and see how installation works.'
                }
              </p>
            </div>

            <button
              onClick={dismissPrompt}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-[#E5E6E6] dark:hover:bg-[#5A5E5D] transition-colors"
              aria-label="Dismiss install prompt"
            >
              <XMarkIcon className="w-5 h-5 text-[#979B9A]" />
            </button>
          </div>

          {!isIOS && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={dismissPrompt}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-[#505353] dark:text-[#B1B4B4] bg-[#E5E6E6] dark:bg-[#5A5E5D] rounded-xl hover:bg-[#CBCDCD] dark:hover:bg-[#696D6D] transition-colors"
              >
                Not now
              </button>
              <button
                onClick={installPrompt}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#24554F] dark:bg-[#40968C] rounded-xl hover:bg-[#2E6B64] dark:hover:bg-[#378178] transition-colors shadow-lg shadow-[#24554F]/25 dark:shadow-[#40968C]/25"
              >
                Install App
              </button>
            </div>
          )}

          {isIOS && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-[#E5E6E6] dark:bg-[#3C3E3E] rounded-xl">
              <div className="text-2xl">
                <svg className="w-6 h-6 text-[#24554F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 8H9L12 2ZM12 22V10M7 14L12 10L17 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm text-[#696D6D] dark:text-[#B1B4B4]">
                Tap <strong>Share</strong> then <strong>"Add to Home Screen"</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
