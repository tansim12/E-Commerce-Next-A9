"use client"; // Enable client-side rendering
import { RxAvatar } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, useDisclosure, Spinner } from "@nextui-org/react"; // NextUI Tabs and Tab components
import Image from "next/image";
import { useUser } from "../Context/user.context";
import { MdEditSquare } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
// Import icons from react-icons
import { FiImage } from "react-icons/fi"; // Feather Icons
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { uploadImagesToImgBB } from "../utils/uploadImagesToImgBB";
import CustomModal from "../Components/ui/Custom Modal/CustomModal";
import FXForm from "../Components/Form/FXForm";
import CustomFileUpload from "../Components/Form/CustomFileUpload";
import CustomButton from "../Components/ui/Button/CustomButton";
import { useFindMyProfile, useUpdateMyProfile } from "../hooks/user.hook";
import CustomReactQuill from "../Components/Form/CustomReactQuill";
import CustomInput from "../Components/Form/CustomInput";
import CustomSelect from "../Components/Form/CustomSelect";
import UserInfo from "../Components/ui/User/UserInfo";
import Loading from "../Components/ui/Loading/Loading";

const CUserDashboard = () => {
  const [isLoadingC, setIsLoadingC] = useState(false);
  const { user: loggedInUser } = useUser();
  const [modalType, setModalType] = useState<
    "coverPhoto" | "profilePhoto" | "editProfile" | null
  >(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, _setBackdrop] = useState("blur");
  const [selectImage, setSelectImages] = useState([]);
  const {
    data: userProfileData,
    isPending: isUserProfileDataLoading,
    isError: isUserProfileDataError,
  } = useFindMyProfile();

  const {
    mutate: handleUpdateUserInfoMute,
    isPending: updateUserInfoIsPending,
    isError: updateUserInfoIsError,
  } = useUpdateMyProfile();

  // error use effect
  useEffect(() => {
    if (isUserProfileDataError) {
      toast.error("My all post data some thing went wrong");
    }
    if (selectImage?.length > 1) {
      toast.error("Please Select One Image");
    }
    if (updateUserInfoIsError) {
      toast.error("User update failed");
    }
  }, [isUserProfileDataError, selectImage?.length, updateUserInfoIsError]);

  const handleSubmitPhoto: SubmitHandler<FieldValues> = async () => {
    let uploadedImage;

    if (selectImage?.length > 0) {
      setIsLoadingC(true);
      uploadedImage = await uploadImagesToImgBB(selectImage);
    } else {
      return toast.error("Please Select Photo");
    }

    if (modalType === "coverPhoto") {
      const payload = { coverPhoto: uploadedImage?.[0] };
      handleUpdateUserInfoMute({ payload } as any);
      setIsLoadingC(false);
    } else if (modalType === "profilePhoto") {
      const payload = { profilePhoto: uploadedImage?.[0] };
      handleUpdateUserInfoMute({ payload } as any);
      setIsLoadingC(false);
    }

    onClose();
    setSelectImages([]);
  };

  const handleBioUpdate: SubmitHandler<FieldValues> = (data) => {
    const payload = {
      payload: {
        ...data,
      },
    };
    handleUpdateUserInfoMute(payload as any);

    onClose();
  };

  return (
    <>
      {isUserProfileDataLoading && <Loading />}
      {/* cover photo update  */}
      {(modalType === "profilePhoto" || modalType === "coverPhoto") && (
        <CustomModal
          title={modalType === "profilePhoto" ? "Profile Photo" : "Cover Photo"}
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          <>
            {isLoadingC && <Spinner size="lg" />}
            {/* {updateUserInfoIsPending && <Loading />} */}
            <FXForm onSubmit={handleSubmitPhoto}>
              <CustomFileUpload
                name={
                  modalType === "profilePhoto" ? "profilePhoto" : "coverPhoto"
                }
                changeOnValue={setSelectImages}
                label={
                  modalType === "profilePhoto" ? "Profile Image" : "Cover Image"
                }
              />
              <CustomButton name="Submit" />
            </FXForm>
          </>
        </CustomModal>
      )}

      {modalType === "editProfile" && (
        <CustomModal
          title={modalType as string}
          isOpen={isOpen}
          backdrop={backdrop as "opaque" | "blur" | "transparent"}
          onCancel={onClose}
          cancelText="Cancel"
          size="4xl"
        >
          {" "}
          <>
            {isLoadingC && <Spinner size="lg" />}
            {/* {updateUserInfoIsPending && <Loading />} */}
            <FXForm
              onSubmit={handleBioUpdate}
              defaultValues={{
                bio: userProfileData?.userProfile?.bio,
                gender: userProfileData?.userProfile?.[0]?.gender,
                contactNumber: userProfileData?.userProfile?.[0]?.contactNumber,
                name: userProfileData?.name,
              }}
            >
              <div className="mb-16">
                <div className="flex items-center justify-between  gap-2">
                  <CustomInput name="name" label="Name" type="string" />
                  <CustomInput
                    name="contactNumber"
                    label="Contact Number"
                    type="string"
                  />
                  <div className="flex-1">
                    <CustomSelect
                      name="gender"
                      label="Gender"
                      placeholder="Select gender"
                      options={[
                        { label: "male", value: "male" },
                        { label: "female", value: "female" },
                      ]}
                      defaultValue={[userProfileData?.userProfile?.[0]?.gender]}
                    />
                  </div>
                </div>
                {/* @ts-ignore */}
                <CustomReactQuill name="bio" label="Bio" />
              </div>
              <CustomButton name="Submit" />
            </FXForm>
          </>
        </CustomModal>
      )}

      <div className="min-h-screen container mx-auto">
        {/* Cover Section */}
        <div className="relative w-full h-[25vh] bg-gray-300">
          {/* Cover Photo Section */}
          <div className="relative w-full h-full">
            <Image
              src={
                userProfileData?.userProfile?.[0]?.coverPhoto
                  ? userProfileData?.userProfile?.[0]?.coverPhoto
                  : ""
              } // Replace with your cover photo path
              layout="fill"
              className="object-cover"
              alt="Cover Photo"
            />
            {/* Edit button for Cover Photo */}
            <button
              onClick={() => {
                setModalType("coverPhoto");
                onOpen();
              }}
              className="absolute top-4 right-4 bg-base  p-2 rounded-full shadow-lg"
            >
              <MdEditSquare color="black" size={30} />
            </button>
          </div>

          {/* Profile Picture Section */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div
              className="relative h-36 w-36 rounded-full border-4 border-white overflow-hidden"
              style={{ zIndex: 100 }}
            >
              <Image
                src={
                  userProfileData?.userProfile?.[0]?.profilePhoto
                    ? userProfileData?.userProfile?.[0]?.profilePhoto
                    : ""
                } // Replace with your profile picture path
                layout="fill"
                objectFit="cover"
                alt="Profile Picture"
              />

              {/* Edit button for Profile Picture */}
              <button
                onClick={() => {
                  setModalType("profilePhoto");
                  onOpen();
                }}
                className="absolute bottom-3 right-3  bg-base  p-2 rounded-full shadow-lg  "
              >
                <MdEditSquare size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold flex gap-3 justify-center items-center">
            {userProfileData?.name}{" "}
          </h1>
          {userProfileData?.userProfile?.[0].bio?.length ? (
            <div
              className="my-3"
              dangerouslySetInnerHTML={{
                __html: userProfileData?.userProfile?.[0].bio,
              }}
            ></div>
          ) : (
            "Added Bio"
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex justify-center gap-2">
            <Button
              onClick={() => {
                setModalType("editProfile");
                onOpen();
              }}
              color="primary"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Navigation Tabs with Icons */}

        {/* Navigation Tabs with Icons */}
        <div className="border-b mt-8">
          <div className="container mx-auto px-4">
            <Tabs aria-label="Profile Tabs" color="primary" variant="bordered">
              <Tab
                key="Following"
                title={
                  <div className="flex items-center space-x-2">
                    <RxAvatar />
                    {/* Music icon */}
                    <span>Following</span>
                  </div>
                }
              >
                {userProfileData?.shopFollow?.length > 0 ? (
                  <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 min-h-[20vh] ">
                    {userProfileData?.shopFollow?.map((item: any) => (
                      <div className="flex  items-center gap-2">
                        <Image
                          src={item?.shop?.logo}
                          alt="logo"
                          width={50}
                          height={50}
                          className="object-cover rounded-full border border-primary"
                        />
                        <p>{item?.shop?.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span> You have no following</span>
                )}
              </Tab>
              <Tab
                key="Settings"
                title={
                  <div className="flex items-center space-x-2">
                    <IoSettingsOutline />
                    {/* Video icon */}
                    <span>Settings</span>
                  </div>
                }
              >
                {/* Videos Content (You can replace this with actual content) */}
                <div className="text-center py-10">
                  <UserInfo loggedInUser={userProfileData} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CUserDashboard;
