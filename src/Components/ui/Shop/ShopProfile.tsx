import Image from "next/image";

const ShopProfile = ({ item }: { item: any }) => {
  return (
    <div className="w-72 border  rounded-lg p-2">
      <div className="p-3">
        <div className="flex justify-center items-center p-3 rounded-full">
          <Image
            src={item?.logo ? item?.logo : ""}
            alt="shop"
            width={200}
            height={200}
            className=" object-cover rounded-full"
          />
        </div>
        {/* info div  */}
        <div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Name:</p>
            <p>{item?.name.slice(0,15)}</p>
          </div>
          <div className="flex justify-between gap-1 items-center">
            <p className="font-semibold">Type:</p>
            <p>{item?.shopType.slice(0,15)}</p>
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
    </div>
  );
};

export default ShopProfile;
