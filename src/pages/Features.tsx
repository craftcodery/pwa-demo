import { PWAFeatureDemo } from '../components'

export function Features() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          PWA Features
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Explore the Progressive Web App capabilities of this demo
        </p>
      </div>

      <PWAFeatureDemo />

      {/* Feature Explanations */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          About These Features
        </h2>

        <div className="space-y-3">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Service Worker</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enables offline functionality by caching assets and intercepting network requests.
              This app uses a cache-first strategy for static assets.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Web App Manifest</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Provides metadata that enables installation on devices. Includes app name, icons,
              theme colors, display mode, and app shortcuts.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Notifications API</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Allows the app to send system notifications even when not in focus.
              Requires user permission before notifications can be shown.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Badging API</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Displays a badge on the installed app icon to indicate unread items or pending actions.
              Only visible when the app is installed.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-1">Web Share API</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enables sharing content to other apps using the native share dialog.
              Also supports receiving shared content when installed (share_target).
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Implementation Example
        </h2>
        <div className="p-4 bg-slate-900 rounded-xl overflow-x-auto">
          <pre className="text-sm text-slate-300">
            <code>{`// Handle install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

// Trigger installation
installButton.addEventListener('click', async () => {
  const result = await deferredPrompt.prompt();
  console.log('Install outcome:', result.outcome);
});`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
