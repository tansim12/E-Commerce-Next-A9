import CAdminDashboard from '@/src/AllPages/CAdminDashboard';
import { adminAnalyticsAction } from '@/src/Service/Analytics/analytics.service';
import React from 'react';

const AdminDashboardPage = async () => {
    const result = await adminAnalyticsAction()
    return (
        <div>
            <CAdminDashboard data={result} />
        </div>
    );
};

export default AdminDashboardPage;