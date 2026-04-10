import React, { Component, ReactNode } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { Text } from '@/components/Text';
import styles from './ErrorBoundary.module.css';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className={styles.errorBoundary}>
          <EmptyState type="no-content" />
          <div className={styles.errorDetails}>
            <Text style="text-body-small" as="p" color="secondary">
              Something went wrong. Please refresh the page.
            </Text>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
