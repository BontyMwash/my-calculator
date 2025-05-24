import React, { ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} data-id="l9odo14wz" data-path="src/pages/ErrorBoundary.tsx" />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" data-id="xqcd6tm3k" data-path="src/pages/ErrorBoundary.tsx">
      <div className="text-red-500 text-5xl mb-4" data-id="wh5136cca" data-path="src/pages/ErrorBoundary.tsx">⚠️</div>
      <h1 className="text-2xl font-bold mb-4" data-id="ka3xxw2vi" data-path="src/pages/ErrorBoundary.tsx">Something went wrong</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md" data-id="0ex6whwj4" data-path="src/pages/ErrorBoundary.tsx">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <div className="flex gap-4" data-id="6kd21mpoq" data-path="src/pages/ErrorBoundary.tsx">
        <Button variant="outline" onClick={() => window.location.reload()} data-id="da6po1oxd" data-path="src/pages/ErrorBoundary.tsx">
          Try again
        </Button>
        <Button onClick={() => navigate('/')} data-id="t1eafoa25" data-path="src/pages/ErrorBoundary.tsx">Return to home</Button>
      </div>
    </div>);

};

export default ErrorBoundary;