"use client";
import { useUser } from "@/src/Context/user.context";
import Image from "next/image";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa"; // For media icon
import { MdWork } from "react-icons/md"; // For job icon
import { AiOutlineFileText } from "react-icons/ai"; // For write article icon
import { useDisclosure } from "@nextui-org/react";
import CustomModal from "../Custom Modal/CustomModal";
import PostForm from "./PostForm";
import { TUser } from "@/src/Types/User/user.types";
import { useRouter } from "next/navigation";
const CreatePost = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const { user } = useUser();
  const handleNavigate = () => {
    if (!user?._id) {
       router.push("/login");
    }
  };
  return (
    <>
      <CustomModal
        title="Create New Post"
        isOpen={isOpen}
        backdrop={backdrop as "opaque" | "blur" | "transparent"}
        onCancel={onClose}
        cancelText="Cancel"
        size="4xl"
      >
        {" "}
        <PostForm user={user as TUser}  onClose={onClose as any}/>
      </CustomModal>

      <div
        onClick={user?._id ? onOpen : handleNavigate}
        className="shadow-lg border border-gray-300 p-4 md:p-6 mb-8 rounded-lg cursor-pointer mt-6"
      >
        {/* User Profile and Input */}
        <div className="flex items-center gap-4">
          {/* User Profile Image */}
          <div className="">
            <Image
              src={user?.profilePhoto ? user?.profilePhoto : ""}
              alt="userImage"
              width={50}
              height={50}
              className="rounded-full border-3 border-base"
            />
          </div>

          {/* Input Box */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Start a post, try writing with AI"
              className="w-full h-12 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:border-base"
            />
          </div>
        </div>

        {/* Icon Section */}
        <div className="flex justify-between items-center mt-7">
          {/* Media Icon */}
          <div className="flex items-center gap-2 cursor-pointer text-blue-600">
            <FaPhotoVideo size={20} />
            <span>Media</span>
          </div>

          {/* Job Icon */}
          <div className="flex items-center gap-2 cursor-pointer text-purple-600">
            <MdWork size={20} />
            <span>Job</span>
          </div>

          {/* Write Article Icon */}
          <div className="flex items-center gap-2 cursor-pointer text-red-600">
            <AiOutlineFileText size={20} />
            <span>Write article</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
