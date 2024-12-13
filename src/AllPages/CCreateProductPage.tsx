import React from 'react';
import ProductFrom from '../Components/ui/Products/ProductFrom';
import { isExistShopAction } from '../Service/Shop/shop.service';

const CCreateProductPage = async () => {
    const result  = await isExistShopAction()

    return (
        <div>
         <ProductFrom shopExistStatus={result?.status} />
        </div>
    );
};

export default CCreateProductPage;