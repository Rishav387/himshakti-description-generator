import React from "react";

/**
 * ErrorBoundary
 * Catches unexpected React render errors and shows a friendly fallback UI
 * instead of a blank white screen.
 *
 * Usage: wrap your app or individual sections in <ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-earth-50 dark:bg-earth-900 px-4">
          <div className="text-center max-w-md">
            <span className="text-6xl mb-6 block">🌿</span>
            <h1
              className="text-2xl text-earth-900 dark:text-earth-50 mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Something went wrong
            </h1>
            <p className="text-earth-600 dark:text-earth-300 text-sm mb-6">
              An unexpected error occurred. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                <summary className="text-xs font-semibold text-red-600 dark:text-red-400 cursor-pointer">
                  Error details (dev only)
                </summary>
                <pre className="text-xs text-red-500 mt-2 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
