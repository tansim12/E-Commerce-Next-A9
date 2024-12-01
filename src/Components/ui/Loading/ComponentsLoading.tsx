import React from 'react';
import { Spinner } from '@nextui-org/react'; // Import Spinner from NextUI

const ComponentsLoading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner size="lg" color="primary" />
        </div>
    );
};

export default ComponentsLoading;
