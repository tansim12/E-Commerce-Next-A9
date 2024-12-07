import Lottie from "lottie-react";

const TitleTopAnimation = ({
  jsonFile,
  isFlashSale = false,
}: {
  jsonFile: any;
  isFlashSale?: any;
}) => {
  return (
    <div>
      <Lottie
        animationData={jsonFile}
        loop={true}
        autoplay={true}
        style={{width:isFlashSale && 400}}
        className={`w-16 sm:w-24`}
      ></Lottie>
    </div>
  );
};

export default TitleTopAnimation;
