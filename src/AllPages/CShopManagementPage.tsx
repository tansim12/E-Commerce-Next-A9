import React from "react";
import CreateShopFrom from "../Components/ui/Shop/CreateShopFrom";

const CShopManagementPage = () => {
  return (
    <div>
      <p className="text-center text-xl font-semibold">Create And Edit Shop</p>

      <div>
        <CreateShopFrom  />
      </div>
    </div>
  );
};

export default CShopManagementPage;
