// import React, { Component, ErrorInfo } from 'react';

// class ErrorBoundary extends Component {
//   state = { hasError: false };

//   static getDerivedStateFromError(error: Error) {
//     // Update state to show fallback UI when error occurs
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     // You can log the error to an error reporting service
//     console.error('Error caught by ErrorBoundary:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Fallback UI when an error occurs
//       return <div>Something went wrong. Please try again later.</div>;
//     }

//     // Render children if no error
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
