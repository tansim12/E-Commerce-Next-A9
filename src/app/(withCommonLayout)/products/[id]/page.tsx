
import CProductDetailsPage from '@/src/AllPages/CProductDetailsPage';
import React from 'react';

const ProductDetailsPage = ({params}:{params:any}) => {  
    return (
        <div>
            <CProductDetailsPage id={params?.id} />
        </div>
    );
};

export default ProductDetailsPage;