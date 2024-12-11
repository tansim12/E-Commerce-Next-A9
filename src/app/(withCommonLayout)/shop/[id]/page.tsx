import CShopDetailsPage from '@/src/AllPages/CShopDetailsPage';
import React from 'react';

const ShopPage = ({params}:{params:any}) => {
    return (
        <div>
            <CShopDetailsPage params={params} />
        </div>
    );
};

export default ShopPage;