import * as React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    chunkError: false,
  };

  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    console.log(error.name);
    if (error.name === 'ChunkLoadError') {
      return {
        chunkError: true,
      };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.(production Sentry)
    // logErrorToMyService(error, errorInfo);
  }

  handleResolveError = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    return (
      <ErrorBoundaryWrapper hasError={this.state.hasError}>
        {this.props.children}
      </ErrorBoundaryWrapper>
    );
  }
}

type ErrorBoundaryWrapperProps = {
  children: React.ReactNode;
  hasError: boolean;
};

function ErrorBoundaryWrapper({
  children,
  hasError,
}: ErrorBoundaryWrapperProps) {
  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return <>{children}</>;
}

export default ErrorBoundary;
