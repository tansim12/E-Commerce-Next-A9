
import CProductDetailsPage from '@/src/AllPages/CProductDetailsPage';
import React from 'react';

const ProductDetailsPage = ({params}:{params:any}) => {  
    return (
        <div className='pt-10'>
            <CProductDetailsPage id={params?.id} />
        </div>
    );
};

export default ProductDetailsPage;