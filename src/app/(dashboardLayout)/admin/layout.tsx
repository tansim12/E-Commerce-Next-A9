import { childrenProps } from '@/src/Types';
import React from 'react';

const AdminDashboardLayout = ({children}:childrenProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminDashboardLayout