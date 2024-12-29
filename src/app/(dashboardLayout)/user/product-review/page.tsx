import CUserProductReviewPage from "@/src/AllPages/CUserProductReviewPage";
import { userFindHisAllProductReviewAction } from "@/src/Service/Product/product.service";
import React from "react";

const page = async () => {
  const res = await userFindHisAllProductReviewAction();

  return (
    <div>
      <CUserProductReviewPage data={res} />
    </div>
  );
};

export default page;
