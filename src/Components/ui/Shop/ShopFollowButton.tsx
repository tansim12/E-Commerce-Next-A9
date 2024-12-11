"use client";

import { useUser } from "@/src/Context/user.context";
import {
  useCreateFollowAndUnFollowShop,
  useFindSingleUserFollow,
} from "@/src/hooks/shop.hook";
import { useRouter } from "next/navigation";

const ShopFollowButton = ({ shopId }: { shopId: any }) => {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useFindSingleUserFollow();
  const { mutate: handleCreateFollowAndUnFollow } =
    useCreateFollowAndUnFollowShop();

  const handleFollow = () => {
    if (!user) {
      return router.push("/login");
    }
    const payload = {
      payload: {
        shopId,
        isDelete: false,
      },
    };
    handleCreateFollowAndUnFollow(payload);
  };
  const handleUnFollow = () => {
    if (!user) {
      return router.push("/login");
    }
    const payload = {
      payload: {
        shopId,
        isDelete: true,
      },
    };
    handleCreateFollowAndUnFollow(payload);
  };

  return (
    <>
      {data?.status === 201 || data?.isDelete === true || !user ? (
        <button
          onClick={handleFollow}
          className="p-2 rounded-lg border border-white w-1/2 text-primary"
        >
          {" "}
          Follow
        </button>
      ) : (
        <button
          onClick={handleUnFollow}
          className="p-2 rounded-lg border border-white w-1/2"
        >
          {" "}
          UnFollow
        </button>
      )}
    </>
  );
};

export default ShopFollowButton;
