import React, { useEffect, useState } from 'react';
import LoadingWithHOC from './LoadingWithHOC'; // Import the HOC
import DataDisplay from './DataDisplay';

const WithLoading = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setData({ message: 'Hello, World!' });
            setIsLoading(false);
        }, 2000); // Simulate a 2-second loading time
    }, []);

    // Wrap the DataDisplay component with the withLoading HOC
    const EnhancedDataDisplay = LoadingWithHOC(DataDisplay);

    return (
        <div>
            <EnhancedDataDisplay isLoading={isLoading} data={data} />
        </div>
    );
};

export default WithLoading;