"use client";
import { FaShare } from "react-icons/fa6";
import { MdOutlineDeleteForever, MdWorkspacePremium } from "react-icons/md";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import ImageGallery from "./ImageGallery";
import { TPost } from "@/src/Types/Posts/post.type";
import { TUser } from "@/src/Types/User/user.types";
import { useUser } from "@/src/Context/user.context";
import moment from "moment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CommentSystem from "./CommentSystem";
import { TComment } from "@/src/Types/Posts/comments.type";
import { AiFillLike } from "react-icons/ai";
import { useFollowAndUnFollow, useGiveReact } from "@/src/hooks/post.hook";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

import PostMenu from "./PostMenu";
import SharePost from "./SharePost";

interface IProps {
  post: TPost;
  isShowDeleteOption?: boolean;
  isCheck?: boolean;
}

export default function Post({
  post,
  isShowDeleteOption = false,
  isCheck = false,
}: IProps) {
  const pathName = usePathname();
  const {
    description,
    _id,
    images,
    userId,
    premium,
    title,
    createdAt,
    comments,
    react,
    shareCount,
    category,
  } = post || {};
  const router = useRouter();
  const { name, email, profilePhoto } = (userId as TUser) || {};
  const { user: loggedInUser } = useUser();
  const dayDifference = Number(moment().diff(moment(createdAt), "days"));

  if (isCheck) {
    if (loggedInUser?.isVerified === false && post?.premium) {
      router.push("/all-package");
    }
  }
  const {
    mutate: handleGiveReact,
    isError: isGiveReactError,
    data: reactData,
    isPending: isGiveReactErrorPending,
  } = useGiveReact();
  const {
    mutate: handleFollowAndUnFollow,
    isError: isFollowAndUnFollowError,
    data: followAndUnFollowData,
    isPending: isFollowAndUnFollowPending,
  } = useFollowAndUnFollow();
  useEffect(() => {
    if (isGiveReactError) {
      toast.error("Give React problem");
    }
    if (isFollowAndUnFollowError) {
      toast.error("Follow UnFollowError  problem");
    }
  }, [isGiveReactError, isFollowAndUnFollowError]);

  const handleGiveReactFn = () => {
    const payload = {
      postId: post?._id,
      isDelete: false,
    };
    handleGiveReact(payload);
  };
  const handleGiveReactRemoveFn = () => {
    const payload = {
      postId: post?._id,
      isDelete: true,
    };
    handleGiveReact(payload);
  };

  const handleFollowFn = () => {
    const payload = {
      userId: (userId as TUser)._id,
      isCreateFollowing: true,
    };
    handleFollowAndUnFollow(payload);
  };
  const handleUnFollowFn = () => {
    const payload = {
      userId: (userId as TUser)._id,
      isCreateFollowing: false,
    };
    handleFollowAndUnFollow(payload);
  };

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src={profilePhoto as string}
              width={50}
              height={50}
              alt="user"
              className="rounded-full border-4 border-base object-cover "
            />
            <div>
              <div className="flex justify-center items-center gap-3">
                <div className="flex justify-center items-center gap-1">
                  <p>{name}</p>
                  <p>
                    {typeof userId !== "string" && userId?.isVerified && (
                      <FaCheckCircle className="inline text-green-500" />
                    )}
                  </p>
                </div>

                {followAndUnFollowData?.data?.followers?.some(
                  (item: any) => item === loggedInUser?._id
                ) ||
                loggedInUser?.userProfile?.followers?.some(
                  (item: any) => item === loggedInUser?._id
                ) ? (
                  <button
                    disabled={isFollowAndUnFollowPending}
                    onClick={() => {
                      loggedInUser?._id
                        ? handleUnFollowFn()
                        : router.push("/login");
                    }}
                    className="text-blue-500 cursor-pointer"
                  >
                    UnFollow
                  </button>
                ) : (
                  <button
                    disabled={isFollowAndUnFollowPending}
                    onClick={() => {
                      loggedInUser?._id
                        ? handleFollowFn()
                        : router.push("/login");
                    }}
                    className="text-blue-500 cursor-pointer"
                  >
                    Follow
                  </button>
                )}
              </div>
              <p className="text-xs">{email}</p>

              <p className="flex items-center gap-1 text-[10px]">
                {dayDifference > 2
                  ? moment(createdAt).format("LL")
                  : moment(createdAt).fromNow()}
              </p>
            </div>
          </div>

          {/* dropdown edit and delete options  */}
          {isShowDeleteOption ? (
            <PostMenu post={post} user={loggedInUser as TUser} />
          ) : (
            ""
          )}
        </div>
        <p>
          <span className="font-bold ">Category :</span>
          <span className="text-sm"> {category}</span>
        </p>
        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            {pathName === "/" ? (
              <div>
                {!loggedInUser?._id ? (
                  <Link href={`/login`} className="text-3xl">
                    <span className="cursor-pointer text-2xl text-primary">
                      {title}
                    </span>
                  </Link>
                ) : loggedInUser?.isVerified === false ? (
                  <Link href={`/all-package`} className="text-3xl">
                    <span className="cursor-pointer text-2xl text-primary">
                      {title}
                    </span>
                  </Link>
                ) : (
                  <Link href={`/post/${_id}`} className="text-3xl">
                    <span className="cursor-pointer text-2xl text-primary">
                      {title}
                    </span>
                  </Link>
                )}
              </div>
            ) : (
              <div>
                <span className="cursor-pointer text-2xl text-primary">
                  {title}
                </span>
              </div>
            )}

            <div>
              {premium && (
                <p className="flex items-center gap-1 flex-col ">
                  <MdWorkspacePremium size={40} color="gold" />{" "}
                  <span className="text-sm">Premium</span>
                </p>
              )}
            </div>
          </div>

          {pathName === "/" ? (
            <div>
              {description?.length > 100 && premium !== false && (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${description?.slice(0, 100)} .....`,
                    }}
                  ></div>

                  {!loggedInUser?._id ? (
                    <Link href={`/login`} className="text-3xl">
                      <span className="cursor-pointer font-bold text-lg dark:text-white light:to-black hover:text-primary">
                        See More
                      </span>
                    </Link>
                  ) : loggedInUser?.isVerified === false ? (
                    <Link href={`/all-package`} className="text-3xl">
                      <span className="cursor-pointer font-bold text-lg dark:text-white light:to-black hover:text-primary flex items-center gap-2">
                        See More <MdWorkspacePremium size={25} color="gold" />{" "}
                      </span>
                    </Link>
                  ) : (
                    <Link href={`/post/${_id}`} className="text-3xl">
                      <span className="cursor-pointer font-bold text-lg dark:text-white light:to-black hover:text-primary">
                        See More
                      </span>
                    </Link>
                  )}
                </div>
              )}

              {description?.length < 100 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                ></div>
              )}
              {description?.length > 100 && premium === false && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                ></div>
              )}
            </div>
          ) : (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></div>
            </div>
          )}
        </div>

        {images?.length && images.length > 0 ? (
          <ImageGallery images={images as string[]} />
        ) : (
          ""
        )}

        <div className="mt-4 flex gap-5">
          {reactData?.data?.react?.some(
            (item: any) => item?.userId === loggedInUser?._id
          ) || react?.some((item) => item?.userId === loggedInUser?._id) ? (
            <Button
              onClick={() => {
                loggedInUser?._id
                  ? handleGiveReactRemoveFn()
                  : router.push("/login");
              }}
              disabled={isGiveReactErrorPending}
              className="flex-1"
              variant="light"
            >
              <span className="text-xl font-semibold">
                {" "}
                {`(${react?.length ? react?.length : 0})`}
              </span>
              <AiFillLike className="text-primary" size={40} />
            </Button>
          ) : (
            <Button
              disabled={isGiveReactErrorPending}
              onClick={() => {
                loggedInUser?._id ? handleGiveReactFn() : router.push("/login");
              }}
              className="flex-1"
              variant="light"
            >
              <span className="text-xl font-semibold">
                {" "}
                {`(${react?.length ? react?.length : 0})`}
              </span>
              <AiFillLike size={40} />
            </Button>
          )}
          {/* <Button className="flex-1" variant="light">
            <span className="text-xl font-semibold">
              {" "}
              {`(${shareCount > 0 ? shareCount : 0})`}
            </span>
            Share
            <FaShare />
          </Button> */}
          <div className="flex-1">
            <SharePost postId={post?._id} shareCount={shareCount} />
          </div>
        </div>
      </div>

      {/* comment  */}
      <div>
        <CommentSystem
          comments={comments as TComment[] | []}
          currentUser={loggedInUser as TUser}
          postId={_id as string}
        />
      </div>
    </div>
  );
}
