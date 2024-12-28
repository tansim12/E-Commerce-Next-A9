"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ShopProfile = ({ item }: { item: any }) => {
  const navigate = useRouter();

  return (
    <motion.div
      className="w-72 border rounded-lg p-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05, // Slightly scale up the card on hover
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add a subtle shadow effect
        transition: { duration: 0.3 }, // Transition for hover effect
      }}
    >
      <div className="p-3 cursor-pointer" onClick={() => navigate.push(`/shop/${item?.id}`)}>
        <div className="flex justify-center items-center p-3 rounded-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={item?.logo ? item?.logo : ""}
              alt="shop"
              width={200}
              height={200}
              className="object-cover rounded-full size-52"
            />
          </motion.div>
        </div>
        {/* info div  */}
        <div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Name:</p>
            <p>{item?.name?.slice(0, 15)}</p>
          </div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Type:</p>
            <p>{item?.shopType?.slice(0, 15)}</p>
          </div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Followers:</p>
            <p>{item?._count?.shopFollow}</p>
          </div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Review:</p>
            <p>{item?._count?.shopReview}</p>
          </div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Product:</p>
            <p>{item?._count?.product}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopProfile;
