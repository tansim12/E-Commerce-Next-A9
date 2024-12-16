"use client";
import React, { useEffect, useState } from "react";
// import { useAdminFindAllUser } from "../hooks/userProfile.hook";

import { TQueryParams } from "../Types/Filter/filter.type";

import toast from "react-hot-toast";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";

import { FiSearch } from "react-icons/fi";

import { FaEdit, FaSort } from "react-icons/fa";

import useDebounce from "../hooks/useDebounce";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import CustomModal from "../Components/ui/Custom Modal/CustomModal";

import CreateAtSort from "../Components/Shared/CreateAtSort";
import CustomPagination from "../Components/Shared/CustomPagination";

import { useShopBaseFindAllProduct } from "../hooks/product.hook";
import Image from "next/image";
import ProductUpdateFrom from "../Components/ui/Products/ProductUpdateFrom";

const CViewProductPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const [sortValue, setSortValue] = useState("desc");
  const handleSort = () => {
    setSortValue((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const searchTerm = useDebounce(searchValue, 1000); // Debouncing with 500ms delay
  useEffect(() => {
    if (searchTerm) {
      // This will trigger after 500ms delay when the user stops typing
      setParams((pre) => [...pre, { name: "searchTerm", value: searchTerm }]);
      // Call your search API or filtering function here
    } else {
      const filterOtherValue = params?.filter(
        (filter: any) => !(filter.name === "searchTerm")
      );
      setParams(filterOtherValue);
    }
  }, [searchTerm]);

  const {
    data: shopData,
    isPending: isShopDataPending,
    isError: isShopDataError,
    isSuccess,
  } = useShopBaseFindAllProduct(page, pageSize, [
    ...params,
    { name: "sortOrder", value: sortValue },
    { name: "sortBy", value: "createdAt" },
  ]);

  const [defaultValue, setDefaultValue] = useState({});
  useEffect(() => {
    if (isShopDataError) {
      toast.error("Shop Data data get problem");
    }
  }, []);

  const handleEditProduct = (pd: any) => {
    const payload = {
      id: pd?.id,
      isAvailable:pd?.isAvailable,
      productName: pd?.productName,
      isFlashSaleOffer: pd?.isFlashSaleOffer,
      flashSaleDiscount: pd?.flashSaleDiscount,
      promo: pd?.promo,
      discount: pd?.discount,
      isActivePromo: pd?.isActivePromo,
      quantity: pd?.quantity,
      price: pd?.price,
      categoryId: pd?.categoryId,
      subCategoryId: pd?.subCategoryId,
      description: pd?.description,
      isDelete: pd?.isDelete,
      allImages: pd?.images,
      flashSaleStartDate: pd?.flashSaleStartDate
        ? pd?.flashSaleStartDate
        : new Date().toISOString(),
      flashSaleEndDate: pd?.flashSaleEndDate
        ? pd?.flashSaleEndDate
        : new Date().toISOString(),
    };

    setDefaultValue(payload);
  };

  return (
    <div>
      {/* modal section  */}

      {/* edit category modal  */}
      <div>
        <CustomModal
          title="Edit Category"
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          <ProductUpdateFrom defaultValue={defaultValue} onClose={onClose} />
        </CustomModal>{" "}
      </div>

      {/* sort and filter section  */}
      <div className=" flex justify-end items-center gap-5 my-4  ">
        <div></div>
        <div className="flex justify-center items-center gap-5">
          {/* search  */}
          <div className="w-full">
            <Input
              //   contentLeft={<FiSearch size={20} />}
              placeholder="Search..."
              aria-label="Search"
              fullWidth
              endContent={<FiSearch size={20} />}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* sort div  */}
          <div>
            <CreateAtSort
              handleSort={handleSort}
              name="Sort"
              icon={<FaSort />}
            />
          </div>
        </div>
      </div>

      {/* table section  */}
      <div>
        {/* Responsive container for horizontal scrolling */}
        <div className="overflow-x-scroll ">
          <Table
            aria-label="Product Management Table with Actions"
            className=" table-auto"
            fullWidth={false}
            bottomContent={isShopDataPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Images</TableColumn>
              <TableColumn>ID</TableColumn>
              <TableColumn>Product Name</TableColumn>
              <TableColumn>Category</TableColumn>
              <TableColumn>Subcategory</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Discount</TableColumn>
              <TableColumn>Promo</TableColumn>
              <TableColumn>Is Active Promo</TableColumn>
              <TableColumn>Is Flash Sale</TableColumn>
              <TableColumn>Flash Sale Discount</TableColumn>
              <TableColumn>Flash Sale Start</TableColumn>
              <TableColumn>Flash Sale End</TableColumn>
              <TableColumn>Total Submit Rating</TableColumn>
              <TableColumn>Average Rating</TableColumn>

              <TableColumn>Quantity</TableColumn>
              <TableColumn>Is Available</TableColumn>
              <TableColumn>Is Delete</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>Updated At</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            {shopData?.result?.product?.length > 0 ? (
              <TableBody>
                {shopData?.result?.product.map((pd: any) => (
                  <TableRow key={pd?.id}>
                    {/* Images */}
                    <TableCell>
                      {pd?.images?.length > 0 ? (
                        <div className="flex gap-2">
                          <Image
                            height={80}
                            width={80}
                            src={pd?.images?.[0] ? pd?.images?.[0] : ""}
                            alt="Product"
                            className=" object-cover rounded"
                          />
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>

                    {/* ID */}
                    <TableCell>{pd?.id || "N/A"}</TableCell>

                    {/* Product Name */}
                    <TableCell>{pd?.productName || "N/A"}</TableCell>

                    {/* Category */}
                    <TableCell>{pd?.category?.categoryName || "N/A"}</TableCell>

                    {/* Subcategory */}
                    <TableCell>
                      {pd?.subCategory?.categoryName || "N/A"}
                    </TableCell>

                    {/* Price */}
                    <TableCell>{pd?.price || "N/A"}</TableCell>

                    {/* Discount */}
                    <TableCell>{pd?.discount || "N/A"}</TableCell>

                    {/* Promo */}
                    <TableCell>{pd?.promo || "N/A"}</TableCell>

                    {/* Is Active Promo */}
                    <TableCell>{pd?.isActivePromo ? "Yes" : "No"}</TableCell>

                    {/* Is Flash Sale */}
                    <TableCell>{pd?.isFlashSaleOffer ? "Yes" : "No"}</TableCell>

                    {/* Flash Sale Discount */}
                    <TableCell>{pd?.flashSaleDiscount || "N/A"}</TableCell>

                    {/* Flash Sale Start */}
                    <TableCell>
                      {moment(pd?.flashSaleStartDate).isValid()
                        ? moment(pd?.flashSaleStartDate).format("LL")
                        : "N/A"}
                    </TableCell>

                    {/* Flash Sale End */}
                    <TableCell>
                      {moment(pd?.flashSaleEndDate).isValid()
                        ? moment(pd?.flashSaleEndDate).format("LL")
                        : "N/A"}
                    </TableCell>

                    {/* Total Submit Rating */}
                    <TableCell>{pd?.totalSubmitRating || "N/A"}</TableCell>

                    {/* Average Rating */}
                    <TableCell>{pd?.averageRating || "N/A"}</TableCell>

                    {/* Quantity */}
                    <TableCell>{pd?.quantity || "N/A"}</TableCell>

                    {/* Is Available */}
                    <TableCell>{pd?.isAvailable ? "Yes" : "No"}</TableCell>

                    {/* Is Delete */}
                    <TableCell
                      className={
                        pd?.isDelete ? "text-red-500" : "text-gray-500"
                      }
                    >
                      {pd?.isDelete?.toString() || "false"}
                    </TableCell>

                    {/* Created At */}
                    <TableCell>
                      {moment(pd?.createdAt).isValid()
                        ? moment(pd?.createdAt).format("LL")
                        : "N/A"}
                    </TableCell>

                    {/* Updated At */}
                    <TableCell>
                      {moment(pd?.updatedAt).isValid()
                        ? moment(pd?.updatedAt).format("LL")
                        : "N/A"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Button
                        onClick={() => {
                          onOpen();
                          handleEditProduct(pd);
                        }}
                        className="flex justify-center items-center gap-2"
                        color="success"
                        size="sm"
                      >
                        <FaEdit /> Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            )}
          </Table>
        </div>

        {/* Pagination Component */}
        <div className="flex justify-center items-center w-full mt-4">
          <CustomPagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            total={shopData?.meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CViewProductPage;
