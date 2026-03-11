import { useState, useEffect } from 'react'
import {
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
  TrashIcon,
  BeakerIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import { useInstallPrompt } from '../hooks'

type Section = 'install' | 'uninstall' | 'permissions' | 'testing'

interface AccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-[#CBCDCD] dark:border-[#5A5E5D] rounded-xl overflow-hidden bg-white dark:bg-[#505353]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#505353] text-left hover:bg-[#CBCDCD]/50 dark:hover:bg-[#5A5E5D]/50 transition-colors focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-inset"
      >
        <span className="font-medium text-[#3C3E3E] dark:text-white">{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-[#696D6D] dark:text-[#B1B4B4]" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-[#696D6D] dark:text-[#B1B4B4]" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-[#CBCDCD]/30 dark:bg-[#3C3E3E] border-t border-[#CBCDCD] dark:border-[#5A5E5D]">
          {children}
        </div>
      )}
    </div>
  )
}

interface HowToProps {
  initialSection?: Section
  onSectionChange?: (section: Section) => void
}

export function HowTo({ initialSection, onSectionChange }: HowToProps) {
  const [activeSection, setActiveSection] = useState<Section>(initialSection || 'install')
  const { isInstalled } = useInstallPrompt()

  // Sync with URL when initialSection changes (browser back/forward)
  useEffect(() => {
    if (initialSection && initialSection !== activeSection) {
      setActiveSection(initialSection)
    }
  }, [initialSection])

  // Handle section change and update URL
  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    onSectionChange?.(section)
  }

  const sections = [
    { id: 'install', label: 'Install', icon: DevicePhoneMobileIcon },
    { id: 'uninstall', label: 'Uninstall', icon: TrashIcon },
    { id: 'permissions', label: 'Permissions', icon: ShieldCheckIcon },
    { id: 'testing', label: 'Testing', icon: BeakerIcon }
  ] as const

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#3C3E3E] dark:text-white">
          How-To Guide
        </h1>
        <p className="mt-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
          Instructions for installing, managing, and testing PWA features
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1.5 p-1.5 bg-[#CBCDCD] dark:bg-[#3C3E3E] rounded-xl border border-[#B1B4B4] dark:border-[#505353] overflow-x-auto">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => handleSectionChange(section.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-offset-1 ${
              activeSection === section.id
                ? 'bg-white dark:bg-[#505353] text-[#24554F] dark:text-white shadow-md border border-[#979B9A] dark:border-[#696D6D]'
                : 'text-[#505353] dark:text-[#B1B4B4] hover:text-[#24554F] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#505353]/50'
            }`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Install Section */}
      {activeSection === 'install' && (
        <div className="space-y-4">
          {isInstalled && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                <strong>This app is installed!</strong> You're viewing it as a standalone PWA.
              </p>
            </div>
          )}

          <Accordion title="Chrome (Android)" defaultOpen>
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Open this site in Chrome
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Tap the <strong>three-dot menu</strong> (⋮) in the top right
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">4.</span>
                Confirm by tapping <strong>"Install"</strong>
              </li>
            </ol>
            <p className="mt-3 text-xs text-[#7D8281] dark:text-[#7D8281]">
              Chrome may also show a mini-infobar at the bottom of the screen prompting installation.
            </p>
          </Accordion>

          <Accordion title="Safari (iOS)">
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Open this site in Safari (required - other browsers won't work)
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Tap the <strong>Share button</strong> (square with arrow) at the bottom
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Scroll down and tap <strong>"Add to Home Screen"</strong>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">4.</span>
                Tap <strong>"Add"</strong> in the top right
              </li>
            </ol>
            <div className="mt-3 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <strong>Note:</strong> iOS only supports PWA installation through Safari. Chrome, Firefox, and other iOS browsers cannot install PWAs.
              </p>
            </div>
          </Accordion>

          <Accordion title="Chrome / Edge (Desktop)">
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Look for the <strong>install icon</strong> (⊕) in the address bar
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Click it and confirm <strong>"Install"</strong>
              </li>
            </ol>
            <p className="mt-3 text-xs text-[#7D8281] dark:text-[#7D8281]">
              Alternatively: Menu (⋮) → "Install PWA Demo" or "Save and Share" → "Install"
            </p>
          </Accordion>

          <Accordion title="Safari (macOS Sonoma+)">
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Open this site in Safari 17+
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Click <strong>File</strong> in the menu bar
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Click <strong>"Add to Dock"</strong>
              </li>
            </ol>
          </Accordion>
        </div>
      )}

      {/* Uninstall Section */}
      {activeSection === 'uninstall' && (
        <div className="space-y-4">
          <Accordion title="Android" defaultOpen>
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Long-press the app icon on your home screen
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Drag to <strong>"Uninstall"</strong> or tap the (i) icon
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Confirm removal
              </li>
            </ol>
            <p className="mt-3 text-xs text-[#7D8281] dark:text-[#7D8281]">
              Or: Settings → Apps → PWA Demo → Uninstall
            </p>
          </Accordion>

          <Accordion title="iOS">
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Long-press the app icon on your home screen
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Tap <strong>"Remove App"</strong> or the minus (−) icon
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Tap <strong>"Delete App"</strong> to confirm
              </li>
            </ol>
          </Accordion>

          <Accordion title="Desktop (Chrome/Edge)">
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Open the installed PWA
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Click the <strong>three-dot menu</strong> in the title bar
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Click <strong>"Uninstall PWA Demo"</strong>
              </li>
            </ol>
            <p className="mt-3 text-xs text-[#7D8281] dark:text-[#7D8281]">
              Or in Chrome: chrome://apps → Right-click app → Remove from Chrome
            </p>
          </Accordion>

          <Accordion title="macOS (Safari)">
            <ol className="space-y-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">1.</span>
                Right-click the app in the Dock
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">2.</span>
                Click <strong>Options</strong> → <strong>"Remove from Dock"</strong>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-[#3C3E3E] dark:text-white">3.</span>
                Delete from Applications folder if present
              </li>
            </ol>
          </Accordion>
        </div>
      )}

      {/* Permissions Section */}
      {activeSection === 'permissions' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-2">
              About Permissions
            </h3>
            <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              PWAs request permissions just like native apps. You control what access to grant.
              Permissions can be changed at any time in your browser or device settings.
            </p>
          </div>

          <Accordion title="Notifications" defaultOpen>
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p><strong>Enable:</strong> Click "Allow" when prompted, or use the Capabilities tab to request permission.</p>
              <p><strong>Disable (Chrome):</strong> Click the lock icon in address bar → Site settings → Notifications → Block</p>
              <p><strong>Disable (Safari iOS):</strong> Settings → Apps → PWA Demo → Notifications → Off</p>
              <p><strong>Disable (Android):</strong> Long-press app → App info → Notifications → Off</p>
            </div>
          </Accordion>

          <Accordion title="Location">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p><strong>Enable:</strong> Click "Allow" when the site requests location access.</p>
              <p><strong>Disable (Chrome):</strong> Lock icon → Site settings → Location → Block</p>
              <p><strong>Disable (iOS):</strong> Settings → Privacy → Location Services → Safari/PWA → Never</p>
              <p><strong>Disable (Android):</strong> Settings → Location → App permissions → PWA Demo → Deny</p>
            </div>
          </Accordion>

          <Accordion title="Camera & Microphone">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p><strong>Enable:</strong> Click "Allow" when prompted for camera/microphone access.</p>
              <p><strong>Disable:</strong> Same as location - use lock icon in address bar or device settings.</p>
              <p className="text-xs text-[#7D8281] dark:text-[#7D8281]">
                Note: Camera/microphone access requires HTTPS (which this demo uses).
              </p>
            </div>
          </Accordion>

          <Accordion title="Clear All Site Data">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p>To completely reset the PWA (clear cache, storage, and permissions):</p>
              <p><strong>Chrome:</strong> Lock icon → Site settings → Clear data</p>
              <p><strong>Safari:</strong> Settings → Safari → Advanced → Website Data → Edit → Remove site</p>
              <p><strong>Firefox:</strong> Lock icon → Clear cookies and site data</p>
            </div>
          </Accordion>
        </div>
      )}

      {/* Testing Section */}
      {activeSection === 'testing' && (
        <div className="space-y-4">
          <Accordion title="Test Offline Mode" defaultOpen>
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p><strong>Easy way:</strong> Turn on Airplane mode, then use the app.</p>
              <p><strong>DevTools way:</strong></p>
              <ol className="ml-4 space-y-1">
                <li>1. Open DevTools (F12 or Cmd+Opt+I)</li>
                <li>2. Go to Network tab</li>
                <li>3. Check "Offline" checkbox</li>
                <li>4. Refresh and use the app</li>
              </ol>
              <p className="text-xs text-[#7D8281] dark:text-[#7D8281]">
                The app should still load from the Service Worker cache.
              </p>
            </div>
          </Accordion>

          <Accordion title="Inspect Service Worker">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p><strong>Chrome/Edge:</strong></p>
              <ol className="ml-4 space-y-1">
                <li>1. Open DevTools → Application tab</li>
                <li>2. Click "Service Workers" in sidebar</li>
                <li>3. See status, update, and unregister options</li>
              </ol>
              <p><strong>View cached files:</strong></p>
              <ol className="ml-4 space-y-1">
                <li>1. DevTools → Application tab</li>
                <li>2. Expand "Cache Storage" in sidebar</li>
                <li>3. Click cache names to see stored files</li>
              </ol>
            </div>
          </Accordion>

          <Accordion title="Test Install Prompt">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p>To see the install prompt again after dismissing:</p>
              <ol className="ml-4 space-y-1">
                <li>1. Refresh the page</li>
                <li>2. Or clear site data and revisit</li>
              </ol>
              <p className="mt-2"><strong>DevTools way:</strong></p>
              <ol className="ml-4 space-y-1">
                <li>1. Open DevTools → Application tab</li>
                <li>2. Click "Manifest" in sidebar</li>
                <li>3. See installability status and issues</li>
              </ol>
            </div>
          </Accordion>

          <Accordion title="Lighthouse PWA Audit">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p>Run a PWA audit to check compliance:</p>
              <ol className="ml-4 space-y-1">
                <li>1. Open DevTools → Lighthouse tab</li>
                <li>2. Check "Progressive Web App"</li>
                <li>3. Click "Analyze page load"</li>
                <li>4. Review the PWA checklist results</li>
              </ol>
            </div>
          </Accordion>

          <Accordion title="Test Push Notifications">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p>To test notifications:</p>
              <ol className="ml-4 space-y-1">
                <li>1. Go to the Capabilities tab</li>
                <li>2. Click "Test Notification"</li>
                <li>3. Grant permission if prompted</li>
              </ol>
              <p className="mt-2"><strong>Debug notifications:</strong></p>
              <p>DevTools → Application → Service Workers → Push (send test message)</p>
            </div>
          </Accordion>

          <Accordion title="Simulate Slow Network">
            <div className="space-y-3 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <p>Test how the app performs on slow connections:</p>
              <ol className="ml-4 space-y-1">
                <li>1. DevTools → Network tab</li>
                <li>2. Click "No throttling" dropdown</li>
                <li>3. Select "Slow 3G" or "Fast 3G"</li>
                <li>4. Refresh and observe loading behavior</li>
              </ol>
            </div>
          </Accordion>
        </div>
      )}
    </div>
  )
}
