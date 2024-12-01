"use client";
import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Button } from "@nextui-org/react"; // Import Button from Next UI
import { FaShare } from "react-icons/fa"; // Ensure you have react-icons installed
import { useUpdateShareCount } from "@/src/hooks/post.hook";

const SharePost = ({
  postId,
  shareCount,
}: {
  postId: string;
  shareCount: number;
}) => {
  const { mutate: handleUpdateShareCount } = useUpdateShareCount();

  const [shareUrl, setSharePost] = useState(
    `https://a-6-tech-tips-client-ggc5.vercel.app/post/${postId}`
  );
  const [showOptions, setShowOptions] = useState(false); // State to manage visibility of share options

  const handleShare = () => {
    console.log(`Shared post ID: ${postId}`);
    const newPayload = {
      postId,
      payload: { isShare: true },
    };
    handleUpdateShareCount(newPayload);
    // You can also perform any additional actions when the share button is clicked
  };

  const toggleShareOptions = () => {
    setShowOptions((prev) => !prev); // Toggle the visibility of share options
  };

  return (
    <div className="w-full flex-1 relative">
      {/* Custom Share Button */}
      <Button onClick={toggleShareOptions} className="w-full" variant="light">
        <span className="text-xl font-semibold">
          {`(${shareCount > 0 ? shareCount : 0})`}
        </span>
        Share
        <FaShare />
      </Button>

      {/* Conditional Rendering of Share Options */}
      {showOptions && (
        <div className="flex mt-3 space-x-2 absolute  bottom-10 right-0 bg-black px-5 py-3 rounded-lg">
          {/* Social Share Buttons */}
          <FacebookShareButton url={shareUrl} onClick={handleShare}>
            <FacebookIcon className="h-8 w-8 text-blue-600" round={true} />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} onClick={handleShare}>
            <TwitterIcon className="h-8 w-8 text-blue-400" round={true} />
          </TwitterShareButton>

          <LinkedinShareButton url={shareUrl} onClick={handleShare}>
            <LinkedinIcon className="h-8 w-8 text-blue-700" round={true} />
          </LinkedinShareButton>

          <WhatsappShareButton url={shareUrl} onClick={handleShare}>
            <WhatsappIcon className="h-8 w-8 text-green-600" round={true} />
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
};

export default SharePost;
