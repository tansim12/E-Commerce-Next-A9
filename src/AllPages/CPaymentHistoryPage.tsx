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

import CreateAtSort from "../Components/Shared/CreateAtSort";
import CustomPagination from "../Components/Shared/CustomPagination";

import { useMyAllPaymentHistory } from "../hooks/payment.hook";
import CustomModal from "../Components/ui/Custom Modal/CustomModal";
import UserPaymentReviewForm from "../Components/ui/Payment/UserPaymentReviewForm";

const CPaymentHistoryPage = () => {
  const [sortValue, setSortValue] = useState("desc");
  const handleSort = () => {
    setSortValue((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
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
    data: historyData,
    isPending: isHistoryPending,
    isError: isHistoryError,
    isSuccess,
  } = useMyAllPaymentHistory(page, pageSize, [
    ...params,
    { name: "sortOrder", value: sortValue },
    { name: "sortBy", value: "createdAt" },
  ]);

  useEffect(() => {
    if (isHistoryError) {
      toast.error("Shop Data data get problem");
    }
  }, []);

  const [defaultValue, setDefaultValue] = useState({});
  const handleEditProduct = (pd: any) => {
    setDefaultValue(pd);
  };
  return (
    <div>
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
          <UserPaymentReviewForm onClose={onClose} defaultValue={defaultValue} />
          {/* <ProductUpdateFrom defaultValue={defaultValue} onClose={onClose} /> */}
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
            bottomContent={isHistoryPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Payment ID</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Payment Type</TableColumn>
              <TableColumn>Approval Code</TableColumn>
              <TableColumn>Products</TableColumn>

              <TableColumn>Created At</TableColumn>
              <TableColumn>Updated At</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            {historyData?.result?.length > 0 ? (
              <TableBody>
                {historyData?.result?.map((pd: any) => (
                  <TableRow key={pd?.id}>
                    <TableCell>{pd.id}</TableCell>
                    <TableCell>{pd.amount}</TableCell>
                    <TableCell>
                      <span
                        className={
                          pd.paymentStatus === "confirm"
                            ? "text-green-700"
                            : "text-red-600"
                        }
                      >
                        {pd.paymentStatus}
                      </span>
                    </TableCell>

                    <TableCell>{pd.payment_type}</TableCell>
                    <TableCell>{pd.approval_code}</TableCell>
                    <TableCell width={1000}>
                      {pd.paymentAndProduct?.map(
                        (product: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-around overscroll-x-auto w-96  "
                          >
                            <p>
                              {product.product.productName} (Qty:{" "}
                              {product.selectQuantity}) -
                              {product.payTotalAmount}
                            </p>
                            <img
                              src={product.product.images[0]}
                              alt={product.product.productName}
                              width={50}
                              style={{
                                borderRadius: "8px",
                                marginBottom: "5px",
                              }}
                            />
                          </div>
                        )
                      )}
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
                    <TableCell>
                      <Button
                        onClick={() => {
                          onOpen();
                          handleEditProduct({
                            paymentId: pd?.id,
                            review: pd?.productReview?.[0],
                          });
                        }}
                        className="flex justify-center items-center gap-2"
                        color="success"
                        size="sm"
                      >
                        Review
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
            total={historyData?.meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CPaymentHistoryPage;
