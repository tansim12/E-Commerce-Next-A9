"use client";
import { useUpdatePost } from "@/src/hooks/post.hook";
import { TPost } from "@/src/Types/Posts/post.type";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import CustomModal from "../Custom Modal/CustomModal";
import { TUser } from "@/src/Types/User/user.types";
import { FaUndo } from "react-icons/fa";
import UpdatePostForm from "../Posts/UpdatePostForm";
import { USER_ROLE } from "@/src/Types/User/user.const";

const PostMenu = ({ post, user }: { post: TPost; user: TUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const {
    mutate: handleUpdatePostMute,
    isError: isUpdatePostError,
    data: updatePostData,
    isPending: isUpdatePostPending,
    isSuccess: isUpdatePostSuccess,
  } = useUpdatePost();

  useEffect(() => {
    if (updatePostData || isUpdatePostSuccess) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  }, [updatePostData]);

  const handleDeletePost = () => {
    const newPayload = {
      postId: post?._id,
      payload: {
        isDelete: true,
      },
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdatePostMute(newPayload);
      }
    });
  };
  const handleUndoDelete = () => {
    const newPayload = {
      postId: post?._id,
      payload: {
        isDelete: false,
      },
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Undo  it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdatePostMute(newPayload);
      }
    });
  };

  const defaultData = {
    title: post?.title,
    description: post?.description,
    premium: post?.premium,
    category: post?.category,
  };

  return (
    <div>
      <CustomModal
        title="Create New Post"
        isOpen={isOpen}
        backdrop={backdrop as "opaque" | "blur" | "transparent"}
        onCancel={onClose}
        cancelText="Cancel"
        size="4xl"
      >
        {" "}
        <UpdatePostForm
          user={user as TUser}
          onClose={onClose as any}
          defaultData={defaultData}
          oldImages={post?.images}
          postId={post?._id}
        />
      </CustomModal>{" "}
      <div>
        <Dropdown>
          <DropdownTrigger>
            <button>
              <HiDotsVertical size={35} />
            </button>
          </DropdownTrigger>
          {/* Set placement to 'bottomLeft' to open the dropdown to the left */}
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">
              <button
                className="flex justify-center items-center gap-4 w-full"
                onClick={onOpen}
              >
                <MdEdit /> Edit
              </button>
            </DropdownItem>

            <DropdownItem key="delete" className="text-danger" color="danger">
              <button
                className="flex justify-center items-center gap-4 w-full"
                onClick={handleDeletePost}
              >
                <MdOutlineDeleteForever /> Delete
              </button>
            </DropdownItem>

            <DropdownItem key="undoDelete">
              {user?.role === USER_ROLE.admin && post?.isDelete === true && (
                <button
                  className="flex justify-center items-center gap-4 w-full"
                  onClick={handleUndoDelete}
                >
                  <FaUndo />
                  Undo Delete
                </button>
              )}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default PostMenu;
