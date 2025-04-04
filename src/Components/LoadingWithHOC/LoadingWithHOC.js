import React from 'react';

// Higher-Order Component
const LoadingWithHOC = (WrappedComponent) => {
    return ({ isLoading, ...props }) => {
        if (isLoading) {
            return <div>Loading...</div>; // Display loading indicator
        }
        return <WrappedComponent {...props} />; // Render the wrapped component
    };
};

export default LoadingWithHOC;