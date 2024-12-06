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

import {
  useAdminFindAllProducts,
  useShopBaseFindAllProduct,
} from "../hooks/product.hook";
import Image from "next/image";
import ProductUpdateFrom from "../Components/ui/Products/ProductUpdateFrom";
import { useAdminFindAllShops } from "../hooks/shop.hook";
import UpdateShopForm from "../Components/ui/Shop/UpdateShopForm";

const CManageShopsPage = () => {
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
  } = useAdminFindAllShops(page, pageSize, [
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
    setDefaultValue(pd);
  };

  return (
    <div>
      {/* modal section  */}

      {/* edit category modal  */}
      <div>
        <CustomModal
          title="Edit Shop"
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          <UpdateShopForm defaultValue={defaultValue} isAdminUpdate={true} onClose={onClose} />
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
              <TableColumn>Logo</TableColumn>
              <TableColumn>ID</TableColumn>
              <TableColumn>Shop Name</TableColumn>
              <TableColumn>AverageRating</TableColumn>
              <TableColumn>Shop Type</TableColumn>
              <TableColumn>Contact Number</TableColumn>
              <TableColumn>Is Delete</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>Updated At</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            {shopData?.result?.length > 0 ? (
              <TableBody>
                {shopData?.result?.map((pd: any) => (
                  <TableRow key={pd?.id}>
                    {/* Images */}
                    <TableCell>
                      {pd?.logo ? (
                        <div className="flex gap-2">
                          <Image
                            height={80}
                            width={80}
                            src={pd?.logo ? pd?.logo : ""}
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
                    <TableCell>{pd?.name || "N/A"}</TableCell>

                    {/* Category */}
                    <TableCell>{pd?.averageRating || "N/A"}</TableCell>

                    {/* Subcategory */}
                    <TableCell>{pd?.shopType || "N/A"}</TableCell>

                    {/* Price */}
                    <TableCell>{pd?.contactNumber || "N/A"}</TableCell>

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

export default CManageShopsPage;
