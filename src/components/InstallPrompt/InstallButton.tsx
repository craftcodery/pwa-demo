import { ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useInstallPrompt } from '../../hooks'

interface InstallButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal'
  className?: string
}

export function InstallButton({ variant = 'primary', className = '' }: InstallButtonProps) {
  const { isInstallable, isInstalled, installPrompt } = useInstallPrompt()

  if (isInstalled) {
    return (
      <div className={`inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 ${className}`}>
        <CheckCircleIcon className="w-5 h-5" />
        <span>Installed</span>
      </div>
    )
  }

  if (!isInstallable) return null

  const baseStyles = 'inline-flex items-center gap-2 font-medium transition-all duration-200'

  const variantStyles = {
    primary: 'px-4 py-2 text-sm text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30',
    secondary: 'px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50',
    minimal: 'px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
  }

  return (
    <button
      onClick={installPrompt}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <ArrowDownTrayIcon className="w-4 h-4" />
      <span>Install</span>
    </button>
  )
}
