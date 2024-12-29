"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import CustomModal from "../Components/ui/Custom Modal/CustomModal";
import { useFindAllNewsLetterEmail } from "../hooks/analytics.hook";

const CNewsletterPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const {
    data: newLetterData,
    isPending: isNewLetterDataPending,
    isError: isNewsLetterDataError,
  } = useFindAllNewsLetterEmail();

  const [defaultValue, setDefaultValue] = useState({});

  useEffect(() => {
    if (isNewsLetterDataError) {
      toast.error("Shop Data data get problem");
    }
  }, [isNewsLetterDataError]);

  const handleEditProduct = (pd: any) => {
    setDefaultValue(pd);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === newLetterData?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(newLetterData?.map((item: any) => item.email) || []);
    }
  };

  const handleRowSelect = (email: string) => {
    setSelectedRows((prev) =>
      prev.includes(email)
        ? prev.filter((rowEmail) => rowEmail !== email)
        : [...prev, email]
    );
  };

  console.log({ selectedRows });

  return (
    <div>
      {/* Modal section */}
      <div>
        <CustomModal
          title="Edit Category"
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          hello
        </CustomModal>
      </div>

      {/* Table section */}
      <div className="overflow-x-scroll">
        <Table
          aria-label="Newsletter Management Table"
          className="table-auto"
          fullWidth={false}
          bottomContent={isNewLetterDataPending && <ComponentsLoading />}
        >
          <TableHeader>
            <TableColumn>
              <input
                type="checkbox"
                checked={selectedRows.length === newLetterData?.length}
                onChange={handleSelectAll}
              />
            </TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Created</TableColumn>
            <TableColumn>Updated</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          {newLetterData?.length > 0 ? (
            <TableBody>
              {newLetterData?.map((pd: any) => (
                <TableRow key={pd?.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(pd?.email)}
                      onChange={() => handleRowSelect(pd?.email)}
                    />
                  </TableCell>
                  <TableCell>{pd?.email || "N/A"}</TableCell>
                  <TableCell>
                    {moment(pd?.createdAt).isValid()
                      ? moment(pd?.createdAt).format("LL")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {moment(pd?.updatedAt).isValid()
                      ? moment(pd?.updatedAt).format("LL")
                      : "N/A"}
                  </TableCell>
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
            <TableBody emptyContent="No rows to display.">{[]}</TableBody>
          )}
        </Table>
      </div>

      {/* Display selected rows */}
      <div className="mt-4">
        <strong>Selected Rows:</strong> {selectedRows.join(", ")}
      </div>
    </div>
  );
};

export default CNewsletterPage;
