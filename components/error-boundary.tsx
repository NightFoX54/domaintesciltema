'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorBoundaryFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryFallbackProps {
  error: Error | null
  resetError: () => void
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for monitoring (not exposed to UI)
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent error={this.state.error} resetError={this.resetError} />
      )
    }

    return this.props.children
  }
}

// Separate client component for the fallback UI that uses hooks
function DefaultErrorFallback({ error, resetError }: ErrorBoundaryFallbackProps) {
  const { t } = useTranslation('dashboard')
  const router = useRouter()
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)

  const handleGoHome = () => {
    router.push(getPath('/dashboard'))
  }

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-lg border bg-card p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-foreground">
            {t.errorBoundary?.title || 'Something went wrong'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.errorBoundary?.description || 'We encountered an unexpected error. Please try again or return to the dashboard.'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetError} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.errorBoundary?.tryAgain || 'Try again'}
          </Button>
          <Button onClick={handleGoHome}>
            <Home className="h-4 w-4 mr-2" aria-hidden="true" />
            {t.errorBoundary?.goToDashboard || 'Go to dashboard'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ErrorBoundaryClass {...props} />
}
