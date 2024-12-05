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

import { TUser } from "../Types/User/user.types";
import useDebounce from "../hooks/useDebounce";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import CustomModal from "../Components/ui/Custom Modal/CustomModal";
import UserUpdateInfoForm from "../Components/ui/User/UserUpdateInfoForm";
import CreateAtSort from "../Components/Shared/CreateAtSort";
import CustomPagination from "../Components/Shared/CustomPagination";
import NoFoundData from "../Components/ui/No Found/NoFoundData";
import { useAdminFindAllUser } from "../hooks/user.hook";

const CManageUserPage = () => {
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
    data: allUserData,
    isPending: isAllUserPending,
    isError: isAllUserError,
    isSuccess,
  } = useAdminFindAllUser(page, pageSize, [
    ...params,
    { name: "sortOrder", value: sortValue },
    { name: "sortBy", value: "createdAt" },
  ]);

  const [meta, setMeta] = useState(allUserData?.meta);
  const [defaultValue, setDefaultValue] = useState({});
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (isAllUserError) {
      toast.error("All user data get problem");
    }
  }, []);

  const handleEditProfile = (userProfile: Partial<TUser>) => {
    const payload = {
      isDelete: userProfile?.isDelete,
      name: userProfile?.name,
      role: userProfile?.role,
      status: userProfile?.status,
    };
    setDefaultValue(payload);
    setUserId(userProfile?.id as string);
  };
  
  return (
    <div>
      {/* modal section  */}

      <div>
        <CustomModal
          title="Edit User"
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          <UserUpdateInfoForm defaultValue={defaultValue} userId={userId} />
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
            aria-label="User Management Table with Actions"
            className="min-w-full table-auto"
            bottomContent={isAllUserPending && <ComponentsLoading />}
          >
            <TableHeader>
              <TableColumn>Profile Photo</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Deleted</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            {allUserData?.result?.length > 0 ? (
              <TableBody>
                {allUserData?.result?.length > 0
                  ? allUserData?.result?.map((user: any) => (
                      <TableRow key={user?.id}>
                        <TableCell>
                          <img
                            src={
                              user.userProfile?.[0].profilePhoto
                                ? user.userProfile?.[0].profilePhoto
                                : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                            }
                            alt={`${user.name}'s profile`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </TableCell>
                        <TableCell>{user?.name}</TableCell>

                        <TableCell
                          className={
                            user?.role === "admin"
                              ? "text-red-500"
                              : user?.role === "user"
                                ? "text-gray-500"
                                : "text-blue-500"
                          }
                        >
                          {user?.role}
                        </TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.status}</TableCell>
                        <TableCell
                          className={
                            user?.isDelete
                              ? "text-red-500"
                              : "text-gray-500"
                          }
                        >
                          {user?.isDelete.toString()}
                        </TableCell>
                        <TableCell>
                          {moment(user?.createdAt).format("ll")}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              onOpen();
                              handleEditProfile(user);
                            }}
                            className=" flex justify-center items-center gap-3"
                            color="primary"
                            size="sm"
                          >
                            <FaEdit /> Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : !isAllUserPending && <NoFoundData />}
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
            total={allUserData?.meta?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CManageUserPage;
