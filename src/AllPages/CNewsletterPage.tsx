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
import {
  useFindAllNewsLetterEmail,
  useNewsletterGroupMessageSend,
} from "../hooks/analytics.hook";
import FXForm from "../Components/Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../Components/Form/CustomInput";
import CustomReactQuill from "../Components/Form/CustomReactQuill";
import CustomButton from "../Components/ui/Button/CustomButton";

const CNewsletterPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const {
    data: newLetterData,
    isPending: isNewLetterDataPending,
    isError: isNewsLetterDataError,
  } = useFindAllNewsLetterEmail();

  useEffect(() => {
    if (isNewsLetterDataError) {
      toast.error("Shop Data data get problem");
    }
  }, [isNewsLetterDataError]);

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

  const { mutate, isPending, isSuccess } = useNewsletterGroupMessageSend();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (selectedRows?.length > 0) {
      mutate({
        payload: {
          emailArray: selectedRows,
          subject: data?.subject,
          message: data?.message,
        },
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast.success("Email Send successfully done");
    }
  }, [isSuccess]);

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
          <FXForm onSubmit={onSubmit}>
            <CustomInput label="Subject *" name="subject" type="string" />
            <CustomReactQuill name="message" label="Message *" />
            <div className="mt-20">
              <CustomButton name="Send Message" />
            </div>
          </FXForm>
        </CustomModal>
      </div>

      <div className="flex justify-end my-3">
        <Button
          onClick={() => onOpen()}
          disabled={selectedRows?.length > 0 ? false : true}
          color="primary"
        >
          Send Message
        </Button>
      </div>

      {/* Table section */}

      {isPending ? (
        <ComponentsLoading />
      ) : (
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
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody emptyContent="No rows to display.">{[]}</TableBody>
            )}
          </Table>
        </div>
      )}

      {/* Display selected rows */}
      <div className="mt-4">
        <strong>Selected Emails:</strong> {selectedRows.join(", ")}
      </div>
    </div>
  );
};

export default CNewsletterPage;
