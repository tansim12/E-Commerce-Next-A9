"use client"

import NewCustomButton from "./NewCustomButton";

const CompareActionButton = ({product}:{product:any}) => {
    return (
        <div className="w-32">
            <NewCustomButton item={product} name="Buy Now" />
        </div>
    );
};

export default CompareActionButton;