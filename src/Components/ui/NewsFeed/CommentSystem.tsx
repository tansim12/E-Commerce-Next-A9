"use client";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { FaReply, FaTrash } from "react-icons/fa";
import moment from "moment";
import { TComment } from "@/src/Types/Posts/comments.type";
import { TUser } from "@/src/Types/User/user.types";
import {
  useCommentDelete,
  useCommentReplies,
  useCreateComment,
} from "@/src/hooks/post.hook";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CommentSystem = ({
  comments: commentList,
  currentUser,
  postId,
}: {
  comments: TComment[] | null;
  currentUser: TUser;
  postId: string;
}) => {
  const router = useRouter();
  const [comments, setComments] = useState(commentList || []);
  const [newComment, setNewComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  const { mutate: handleCreateComment, isError: isCreateCommentError } =
    useCreateComment();

  const { mutate: handleCommentReplies, isError: isReplayCommentError } =
    useCommentReplies();
  const { mutate: handleDeleteCommentMutate, isError: isCommentDeleteError } =
    useCommentDelete();

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentData = {
      _id: Date.now().toString(), // Temporary ID, replace with actual user ID
      userId: {
        _id: currentUser?._id, // Replace with actual user ID
        name: currentUser?.name, // Replace with actual user name
        profilePhoto: currentUser?.profilePhoto,
        isVerified: currentUser?.isVerified, // Adjust as necessary
      },
      postId: postId, // Replace with actual post ID
      isDelete: false,
      message: newComment,
      replies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const payload = {
      message: newComment,
    };
    handleCreateComment({ postId, payload });

    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  useEffect(() => {
    if (isCreateCommentError) {
      toast.error("Create Comment problem");
    }
    if (isReplayCommentError) {
      toast.error("Comment Replies problem");
    }
    if (isCommentDeleteError) {
      toast.error("Comment Delete problem");
    }
  }, [isCreateCommentError, isReplayCommentError, isCommentDeleteError]);

  const handleReply = (commentId: string) => {
    const replyText = replyTexts[commentId]?.trim();
    if (!replyText) return;

    const updatedComments = comments?.map((comment) =>
      comment._id === commentId
        ? {
            ...comment,
            replies: [
              ...(comment?.replies ?? []),
              {
                _id: Date.now().toString(), // Temporary ID for reply
                userId: {
                  _id: currentUser?._id, // Replace with actual user ID
                  name: currentUser?.name, // Replace with actual user name
                  profilePhoto: currentUser?.profilePhoto,
                  isVerified: currentUser?.isVerified, // Adjust as necessary
                },
                previousCommentId: commentId,
                postId: postId,
                isDelete: false,
                message: replyText,
                replies: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          }
        : comment
    );

    const payload = {
      message: replyText,
    };
    handleCommentReplies({ commentId, payload });
    setComments(updatedComments);
    setActiveReplyId(null); // Clear active reply field
    setReplyTexts({ ...replyTexts, [commentId]: "" }); // Clear reply text for the current comment
  };

  const handleDeleteComment = (commentId: string) => {
    const payload = {
      commentId,
    };
    handleDeleteCommentMutate(payload as any);
    const filteredComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    setComments(filteredComments);
  };

  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">
          Comments{" "}
          <span className="text-xl font-semibold">
            {" "}
            {`(${comments?.length ? comments?.length : ""})`}
          </span>
        </h3>

        {/* Add Comment Form */}
        <div className="flex items-start gap-3 mb-4">
          <img
            src={currentUser?.profilePhoto}
            alt="User"
            className="rounded-full border-2"
            width={40}
            height={40}
          />
          <div className="flex-1">
            <Input
              fullWidth
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <Button
            onClick={() => {
              currentUser?._id ? handleAddComment() : router.push("/login");
            }}
          >
            Comment
          </Button>
        </div>

        {/* Comment List */}
        <div className="space-y-4">
          {comments &&
            [...comments]?.reverse()?.map((comment) => (
              <div key={comment._id} className="flex flex-col space-y-2">
                <div className="flex items-start gap-3">
                  <img
                    src={
                      typeof comment?.userId === "object" &&
                      comment?.userId?.profilePhoto
                        ? comment?.userId?.profilePhoto
                        : ""
                    }
                    alt="photo"
                    className="rounded-full border-2"
                    width={40}
                    height={40}
                  />

                  <div className="flex-1 bg-default-200 p-3 rounded-md">
                    <p className="font-semibold text-blue-400">
                      {typeof comment?.userId === "object"
                        ? comment?.userId?.name
                        : "Unknown User"}
                    </p>
                    <p>{comment?.message}</p>
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                      <span>{moment(comment?.createdAt).fromNow()}</span>
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:underline flex items-center gap-1"
                          onClick={() => setActiveReplyId(comment._id)}
                        >
                          <FaReply size={12} /> Reply
                        </button>
                        {typeof comment?.userId === "object" &&
                          comment?.userId?._id?.toString() ===
                            currentUser?._id && (
                            <button
                              className="text-red-600 hover:underline flex items-center gap-1"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              <FaTrash size={12} /> Delete
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Section */}
                {activeReplyId === comment._id && (
                  <div className="flex items-start gap-3 mt-2 ml-10">
                    <img
                      src={currentUser?.profilePhoto}
                      alt="User"
                      className="rounded-full border-2"
                      width={30}
                      height={30}
                    />
                    <div className="flex-1">
                      <Input
                        fullWidth
                        placeholder="Write a reply..."
                        value={replyTexts[comment._id] || ""}
                        onChange={(e) =>
                          setReplyTexts({
                            ...replyTexts,
                            [comment._id]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Button
                      onClick={() => {
                        currentUser?._id
                          ? handleReply(comment._id)
                          : router.push("/login");
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                )}

                {/* Display Replies */}
                {comment?.replies!?.map((reply) => (
                  <div
                    key={reply._id}
                    className="flex items-start gap-3 mt-2 ml-10"
                  >
                    <img
                      src={
                        typeof reply?.userId === "object" &&
                        reply?.userId?.profilePhoto
                          ? reply?.userId.profilePhoto
                          : ""
                      }
                      alt="photo"
                      className="rounded-full border-2"
                      width={30}
                      height={30}
                    />
                    <div className="flex-1 bg-default-100 p-2 rounded-md">
                      <p className="font-semibold">
                        {typeof reply?.userId === "object"
                          ? reply?.userId?.name
                          : "Unknown User"}
                      </p>

                      <p>{reply.message}</p>
                      <span className="text-xs text-gray-500">
                        {moment(reply.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSystem;
