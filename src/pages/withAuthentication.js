import React from 'react';

// Write a Higher-Order Component (HOC) called withAuthentication that wraps a component and provides an isAuthenticated prop
// indicating whether the user is authenticated or not. Assume there’s an authenticate function that returns a boolean value.
const withAuthentication = WrappedComponent => {
  return (props) => {
    const authenticate = () => {
      return Math.random() >= 0.5 ? true : false;
    }

    return (
      <WrappedComponent {...props} isAuthenticated={authenticate()} />
    );
  }
}

export default withAuthentication;

