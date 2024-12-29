"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import moment from "moment";
import { userUserAllReview } from "../hooks/product.hook";
import Loading from "../Components/ui/Loading/Loading";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
const CUserProductReviewPage = () => {
  const { data, isLoading } = userUserAllReview();
  return (
    <>
      {isLoading && <Loading />}
      <div className="overflow-x-auto">
        <Table
          aria-label="Product Management Table with Actions"
          className=" table-auto"
          fullWidth={false}
          bottomContent={isLoading && <ComponentsLoading />}
        >
          <TableHeader>
            <TableColumn>User Message</TableColumn>
            <TableColumn>Shop Message</TableColumn>
            <TableColumn>Rating</TableColumn>
            <TableColumn>Products</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Updated At</TableColumn>
          </TableHeader>
          {data?.length > 0 ? (
            <TableBody>
              {data?.map((item: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{item?.userMessage}</TableCell>
                  <TableCell>{item?.shopMessage || "N/A"}</TableCell>
                  <TableCell>{item?.rating}</TableCell>

                  <TableCell width={1000}>
                    {item?.payment?.paymentAndProduct.map(
                      (product: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-around overscroll-x-auto w-96  "
                        >
                          <p>{product?.product?.productName}</p>
                          <img
                            src={product?.product?.images[0]}
                            alt={product?.product?.productName}
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

                  <TableCell>
                    {moment(item?.createdAt).isValid()
                      ? moment(item?.createdAt).format("LLL")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {moment(item?.updatedAt).isValid()
                      ? moment(item?.updatedAt).format("LLL")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          )}
        </Table>
      </div>
    </>
  );
};

export default CUserProductReviewPage;
