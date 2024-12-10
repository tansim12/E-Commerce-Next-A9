import CComparePage from '@/src/AllPages/CComparePage';
import React from 'react';

const data  = [
    {
        "id": "1e80f675-26c3-48fb-8c84-43dd35298c55",
        "productName": "Topon Sir",
        "quantity": 10,
        "isAvailable": true,
        "totalBuy": 0,
        "price": 120,
        "discount": null,
        "promo": null,
        "isActivePromo": false,
        "isFlashSaleOffer": false,
        "flashSaleDiscount": 0,
        "flashSaleStartDate": null,
        "flashSaleEndDate": null,
        "shopId": "b4c4e012-5e67-4ed2-af9f-f3ecb170207e",
        "description": "A high-quality camping tent suitable for all seasons.",
        "totalSubmitRating": 0,
        "averageRating": 0,
        "images": [
            "https://example.com/images/camping-tent1.jpg",
            "https://example.com/images/camping-tent2.jpg"
        ],
        "categoryId": "c401aab6-f018-4969-aac2-43db3dc9a2c3",
        "subCategoryId": "993a3d69-46e7-4eb4-a75c-7688fb00e030",
        "isDelete": false,
        "createdAt": "2024-12-05T09:55:24.081Z",
        "updatedAt": "2024-12-09T08:52:18.844Z",
        "category": {
            "id": "c401aab6-f018-4969-aac2-43db3dc9a2c3",
            "categoryName": "Book",
            "adminId": "dd1a39ce-0711-491f-a226-c92289e7956c",
            "isDelete": false,
            "createdAt": "2024-12-04T12:19:17.850Z",
            "updatedAt": "2024-12-04T17:20:36.818Z"
        }
    },
    {
        "id": "65b0f522-2175-478a-a5d0-32a307cc8abd",
        "productName": "Bangla Book",
        "quantity": 6,
        "isAvailable": true,
        "totalBuy": 12,
        "price": 500,
        "discount": 50,
        "promo": "PROMO",
        "isActivePromo": true,
        "isFlashSaleOffer": true,
        "flashSaleDiscount": 100,
        "flashSaleStartDate": "2024-12-05T18:00:00.000Z",
        "flashSaleEndDate": "2024-12-20T18:00:00.000Z",
        "shopId": "b4c4e012-5e67-4ed2-af9f-f3ecb170207e",
        "description": "<p>With supporting text below as a natural lead-in to additional content...</p><ul><li>Some great feature name here</li><li>Easy fast and very good</li><li>Some great feature name here</li><li>Modern style and design</li><li>Optical heart sensor</li></ul><p><strong>Display:</strong>&nbsp;13.3-inch LED-backlit display with IPS</p><p><strong>Processor capacity:</strong>&nbsp;2.3GHz dual-core Intel Core i5</p><p><br></p><p><strong>Camera quality:</strong>&nbsp;720p FaceTime HD camera</p><p><strong>Memory:</strong>&nbsp;8 GB RAM or 16 GB RAM</p><p><br></p><p><strong>Graphics:</strong>&nbsp;Intel Iris Plus Graphics 640</p>",
        "totalSubmitRating": 0,
        "averageRating": 4,
        "images": [
            "https://i.ibb.co/HFShx5W/istockphoto-516982507-612x612.jpg",
            "https://i.ibb.co/qmZyP2P/istockphoto-519319260-612x612.jpg",
            "https://i.ibb.co/7yc7dDx/istockphoto-521706772-612x612.jpg"
        ],
        "categoryId": "c401aab6-f018-4969-aac2-43db3dc9a2c3",
        "subCategoryId": "72598561-c2a8-4957-8855-26964aeb4212",
        "isDelete": false,
        "createdAt": "2024-12-06T18:11:17.710Z",
        "updatedAt": "2024-12-08T18:25:08.758Z",
        "category": {
            "id": "c401aab6-f018-4969-aac2-43db3dc9a2c3",
            "categoryName": "Book",
            "adminId": "dd1a39ce-0711-491f-a226-c92289e7956c",
            "isDelete": false,
            "createdAt": "2024-12-04T12:19:17.850Z",
            "updatedAt": "2024-12-04T17:20:36.818Z"
        }
    },
    {
        "id": "cd4e4eed-b995-45fb-bd89-eb22353e9558",
        "productName": "Book222",
        "quantity": 6,
        "isAvailable": true,
        "totalBuy": 2,
        "price": 200,
        "discount": 50,
        "promo": "PROMO",
        "isActivePromo": true,
        "isFlashSaleOffer": true,
        "flashSaleDiscount": 100,
        "flashSaleStartDate": "2024-12-06T18:00:00.000Z",
        "flashSaleEndDate": "2024-12-20T18:00:00.000Z",
        "shopId": "b4c4e012-5e67-4ed2-af9f-f3ecb170207e",
        "description": "<p>Nothing</p>",
        "totalSubmitRating": 0,
        "averageRating": 0,
        "images": [
            "https://i.ibb.co/njtSNRm/e-logo.png"
        ],
        "categoryId": "c401aab6-f018-4969-aac2-43db3dc9a2c3",
        "subCategoryId": "72598561-c2a8-4957-8855-26964aeb4212",
        "isDelete": false,
        "createdAt": "2024-12-08T13:24:56.145Z",
        "updatedAt": "2024-12-08T18:25:08.758Z",
        "category": {
            "id": "c401aab6-f018-4969-aac2-43db3dc9a2c3",
            "categoryName": "Book",
            "adminId": "dd1a39ce-0711-491f-a226-c92289e7956c",
            "isDelete": false,
            "createdAt": "2024-12-04T12:19:17.850Z",
            "updatedAt": "2024-12-04T17:20:36.818Z"
        }
    }
]

const ComparePage = () => {
    return (
        <div>
            <CComparePage products={data} />
        </div>
    );
};

export default ComparePage;