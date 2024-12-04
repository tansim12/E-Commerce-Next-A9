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
import NoFoundData from "../Components/ui/No Found/NoFoundData";

import { useAdminFindAllSubCategory } from "../hooks/categoryAndSubCategory.hook";

import CategoryForm from "../Components/ui/CategoryAndSubCategory/CategoryForm";
import CreateSubCategory from "../Components/ui/CategoryAndSubCategory/CreateSubCategory";
import SubCategoryForm from "../Components/ui/CategoryAndSubCategory/SubCategoryForm";

const CSubCategoryPage = () => {
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
    data: allCategoryData,
    isPending: isCategoryPending,
    isError: isCategoryError,
    isSuccess,
  } = useAdminFindAllSubCategory(page, pageSize, [
    ...params,
    { name: "sortOrder", value: sortValue },
    { name: "sortBy", value: "createdAt" },
  ]);

  const [defaultValue, setDefaultValue] = useState({});
  useEffect(() => {
    if (isCategoryError) {
      toast.error("All Category data get problem");
    }
  }, []);

  const handleEditSubCategory = (ct: any) => {
    const payload = {
      categoryName: ct?.categoryName,
      isDelete: ct?.isDelete,
      categoryId: ct?.id,
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
          <SubCategoryForm defaultValue={defaultValue} isCreate={false} />
          {/* <CategoryForm defaultValue={defaultValue} isCreate={false} /> */}
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
      <div className="container mx-auto p-2">
        <div className="flex justify-end text-center py-3">
          <CreateSubCategory />
        </div>
        {/* Responsive container for horizontal scrolling */}
        <div className="overflow-x-auto">
          <Table
            aria-label="User Management Table with Actions"
            className="min-w-full table-auto"
            bottomContent={isCategoryPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Sub Category Name</TableColumn>
              <TableColumn>Main Category</TableColumn>
              <TableColumn>M. C. IsDelete</TableColumn>
              <TableColumn>M. C. UpdatedAt</TableColumn>
              <TableColumn>A. Email</TableColumn>
              <TableColumn>Admin Status</TableColumn>
              <TableColumn>C. IsDelete</TableColumn>
              <TableColumn>CreatedAt</TableColumn>
              <TableColumn>UpdateAt</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            {allCategoryData?.result?.length > 0 ? (
              <TableBody>
                {allCategoryData?.result?.length > 0
                  ? allCategoryData?.result?.map((ct: any) => (
                      <TableRow key={ct?.id}>
                        <TableCell>{ct?.categoryName}</TableCell>
                        <TableCell>{ct?.category?.categoryName}</TableCell>
                        <TableCell
                          className={
                            ct?.category?.isDelete
                              ? "text-red-500"
                              : "text-gray-500"
                          }
                        >
                          {ct?.category?.isDelete.toString()}
                        </TableCell>
                        <TableCell>
                          {moment(ct?.category?.createdAt).format("ll")}
                        </TableCell>
                        <TableCell>{ct?.admin?.email}</TableCell>
                        <TableCell>{ct?.admin?.status}</TableCell>

                        <TableCell
                          className={
                            ct?.isDelete ? "text-red-500" : "text-gray-500"
                          }
                        >
                          {ct?.isDelete.toString()}
                        </TableCell>

                        <TableCell>
                          {moment(ct?.createdAt).format("ll")}
                        </TableCell>
                        <TableCell>
                          {moment(ct?.updatedAt).format("ll")}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              onOpen();
                              handleEditSubCategory(ct);
                            }}
                            className=" flex justify-center items-center gap-2"
                            color="success"
                            size="sm"
                          >
                            <FaEdit /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : !isCategoryPending && <NoFoundData />}
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
            total={allCategoryData?.meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CSubCategoryPage;
