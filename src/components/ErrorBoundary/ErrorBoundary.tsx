import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
  HomeIcon,
  BugAntIcon
} from '@heroicons/react/24/outline'

export function ErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred. Please try again.'
  let statusCode: number | null = null

  if (isRouteErrorResponse(error)) {
    statusCode = error.status
    switch (error.status) {
      case 404:
        title = 'Page not found'
        message = "The page you're looking for doesn't exist or has been moved."
        break
      case 401:
        title = 'Unauthorized'
        message = "You don't have permission to access this page."
        break
      case 403:
        title = 'Forbidden'
        message = 'Access to this resource is restricted.'
        break
      case 500:
        title = 'Server error'
        message = 'Something went wrong on our end. Please try again later.'
        break
      default:
        title = `Error ${error.status}`
        message = error.statusText || 'An unexpected error occurred.'
    }
  } else if (error instanceof Error) {
    message = error.message
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#E5E6E6] dark:bg-[#3C3E3E] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Error Card */}
        <div className="bg-white dark:bg-[#505353] rounded-2xl border border-[#CBCDCD] dark:border-[#5A5E5D] shadow-xl overflow-hidden">
          {/* Header with icon */}
          <div className="bg-gradient-to-br from-[#FFAB40]/20 to-[#FFAB40]/5 dark:from-[#FFAB40]/10 dark:to-transparent p-6 border-b border-[#CBCDCD] dark:border-[#5A5E5D]">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FFAB40]/20 dark:bg-[#FFAB40]/10 flex items-center justify-center">
                {statusCode === 404 ? (
                  <BugAntIcon className="w-8 h-8 text-[#996500] dark:text-[#FFAB40]" />
                ) : (
                  <ExclamationTriangleIcon className="w-8 h-8 text-[#996500] dark:text-[#FFAB40]" />
                )}
              </div>
            </div>
            {statusCode && (
              <p className="text-center mt-4 text-5xl font-bold text-[#996500] dark:text-[#FFAB40]">
                {statusCode}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h1 className="text-xl font-bold text-[#3C3E3E] dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4] mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoHome}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#24554F] dark:bg-[#40968C] rounded-xl hover:bg-[#2E6B64] dark:hover:bg-[#378178] transition-colors"
              >
                <HomeIcon className="w-4 h-4" />
                Go Home
              </button>
              <button
                onClick={handleRefresh}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#505353] dark:text-[#B1B4B4] bg-[#E5E6E6] dark:bg-[#5A5E5D] rounded-xl hover:bg-[#CBCDCD] dark:hover:bg-[#696D6D] transition-colors"
              >
                <ArrowPathIcon className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#E5E6E6]/50 dark:bg-[#3C3E3E]/50 border-t border-[#CBCDCD] dark:border-[#5A5E5D]">
            <div className="flex items-center justify-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}icons/icon-72x72.png`}
                alt="NorthBuilt logo"
                className="w-6 h-6 rounded-md"
              />
              <span className="text-xs text-[#979B9A] dark:text-[#7D8281]">
                PWA Demo by NorthBuilt
              </span>
            </div>
          </div>
        </div>

        {/* Debug info (development only) */}
        {import.meta.env.DEV && error instanceof Error && error.stack && (
          <details className="mt-4 p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <summary className="text-xs font-medium text-[#696D6D] dark:text-[#B1B4B4] cursor-pointer hover:text-[#3C3E3E] dark:hover:text-white">
              Technical Details
            </summary>
            <pre className="mt-3 p-3 bg-[#3C3E3E] dark:bg-[#2a2c2c] rounded-lg overflow-x-auto text-xs text-[#B1B4B4] font-mono">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
