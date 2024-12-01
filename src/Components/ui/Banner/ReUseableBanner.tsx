/* eslint-disable @typescript-eslint/no-explicit-any */
type TReUseableBannerProps = {
    title: string;
    subTitle: string;
    image: any;
  };
  
  const ReUseableBanner = ({ title, subTitle, image }: TReUseableBannerProps) => {
    return (
      <div className="relative h-[70vh]">
        {/* Background Image */}
        <img
          src={
             "https://i.ibb.co.com/sW4DHcn/banner.jpg"
          }
          alt="Background"
          className="h-[70vh] w-full object-cover absolute top-0 left-0 opacity-50"
        />
  
        {/* Text and Button */}
        <div className="absolute z-90 w-full h-[70vh] flex flex-col justify-center items-center text-center">
          <p className="text-black text-lg italic">{subTitle}</p>
          <p className="text-3xl md:text-5xl text-black font-serif font-extrabold my-3">
            {title}
          </p>
          {/* <p className="text-sm md:text-lg">
            <span className="text-white">Bugatti Mistral W16</span>{" "}
            <span className="text-secondary font-bold">$800</span>
            <span className="text-white">/ day</span>
          </p> */}
          {/* Button */}
          {/* <div className="flex justify-center items-center gap-3 mt-5">
              <div>
                <CustomButton
                  name="Book Now"
                  isTransParent={false}
                  icon={FaArrowTrendUp}
                  size={20}
                />
              </div>
              <div>
                <CustomButton
                  name="Book Now"
                  isTransParent={true}
                  icon={BiCurrentLocation}
                  size={20}
                />
              </div>
            </div> */}
        </div>
      </div>
    );
  };
  
  export default ReUseableBanner;