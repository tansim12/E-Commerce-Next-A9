"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomSelect from "../../Form/CustomSelect";
import { categoryDataByLabel } from "@/src/Constant/filter.const";
import CustomToggle from "../../Form/CustomToggle";
import { Button } from "@nextui-org/react";
import { TUser } from "@/src/Types/User/user.types";
import CustomFileUpload from "../../Form/CustomFileUpload";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "@/src/Schemas/createPost.schema";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import CustomButton from "../Button/CustomButton";
import { MdWorkspacePremium } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useUpdatePost } from "@/src/hooks/post.hook";
import Swal from "sweetalert2";
import ComponentsLoading from "../Loading/ComponentsLoading";

const UpdatePostForm = ({
  user,
  onClose,
  defaultData,
  oldImages = [],
  postId,
}: {
  user: TUser;
  onClose: any;
  defaultData?: any;
  oldImages?: string[];
  postId?: string;
}) => {
  const {
    mutate: handleUpdatePostMute,
    isError: isUpdatePostError,
    data: updatePostData,
    isPending: isUpdatePostPending,
    isSuccess: isUpdatePostSuccess,
  } = useUpdatePost();
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  // State to manage the old images
  const [currentOldImages, setCurrentOldImages] = useState(oldImages || []);

  const [selectImages, setSelectImages] = useState([]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setImageLoading(true);
    const images = await uploadImagesToImgBB(selectImages);

    const payload = {
      title: data?.title,
      description: data?.description,
      premium: data?.premium,
      images: [...currentOldImages, ...images], // Combine old and new images
      category: data?.category,
    };
    const newPayload = {
      postId,
      payload: { ...payload },
    };
    handleUpdatePostMute(newPayload as any);
    setImageLoading(false);
  };

  useEffect(() => {
    if (updatePostData || isUpdatePostSuccess) {
      Swal.fire({
        title: "Update!",
        text: "Your file has been Update.",
        icon: "success",
      });
    }
    if (isUpdatePostError) {
      toast.error("Post update Error");
    }
  }, [updatePostData, isUpdatePostError]);

  // Function to handle removing old images
  const handleRemove = (index: number) => {
    setCurrentOldImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  return (
    <>

    {isUpdatePostPending || imageLoading && <ComponentsLoading /> }
      <div>
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(createPostSchema)}
          defaultValues={defaultData}
        >
          <CustomInput name="title" label="Title" type="text" />

          <div className="flex gap-10 w-full items-center my-3">
            <div className="basis-3/5">
              <CustomSelect
                label="Category"
                name="category"
                options={categoryDataByLabel}
                placeholder="Select Category"
                defaultValue={[defaultData?.category]}
              />
            </div>
            <div className="basis-2/5">
              {user?.isVerified ? (
                <CustomToggle label="Premium" name="premium" />
              ) : (
                <div
                  onClick={() => {
                    router.push("/all-package");
                  }}
                >
                  <CustomButton
                    name="Get Premium"
                    icon={<MdWorkspacePremium size={40} color="gold" />}
                    customCss="text-white font-bold"
                  />
                </div>
              )}
            </div>
          </div>

          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="images"
            label="Images"
          />

          <div className="mb-16">
            {/* @ts-ignore */}
            <CustomReactQuill name="description" label="Description" />
          </div>

          <div className="my-4">
            {currentOldImages.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                {currentOldImages.map((item, index) => (
                  <div
                    key={index}
                    style={{ textAlign: "center", position: "relative" }}
                  >
                    <img
                      src={item}
                      alt={"old Image"}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      onClick={() => handleRemove(index)}
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        borderRadius: "50%",
                      }}
                    >
                      ✖
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </FXForm>
      </div>
    </>
  );
};

export default UpdatePostForm;
