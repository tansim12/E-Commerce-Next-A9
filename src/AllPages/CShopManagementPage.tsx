"use client";
import React from "react";
import CreateShopFrom from "../Components/ui/Shop/CreateShopFrom";
import { useVendorFindHisShop } from "../hooks/shop.hook";
import UpdateShopForm from "../Components/ui/Shop/UpdateShopForm";
import Loading from "../Components/ui/Loading/Loading";

const CShopManagementPage = () => {
  const { data: vendorsShopData, isPending } = useVendorFindHisShop();
  return (
    <div>
      {isPending && <Loading />}
      <div>
        {vendorsShopData?.name ? (
          <UpdateShopForm defaultValue={vendorsShopData} />
        ) : (
          <CreateShopFrom />
        )}
      </div>
    </div>
  );
};

export default CShopManagementPage;
