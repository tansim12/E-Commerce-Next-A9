import CShopDetailsPage from '@/src/AllPages/CShopDetailsPage';
import React from 'react';

const ShopPage = ({params}:{params:any}) => {
    return (
        <div className='container mx-auto px-2 sm:px-2'>
            <CShopDetailsPage params={params} />
        </div>
    );
};

export default ShopPage;