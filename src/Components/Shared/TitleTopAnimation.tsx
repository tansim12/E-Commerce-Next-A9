import Lottie from "lottie-react";
import top10 from "../../assets/Animation/topSell.json";

const TitleTopAnimation = () => {
  return (
    <div>
      <Lottie
        animationData={top10}
        loop={true}
        autoplay={true}
        className="w-16 sm:w-24"
      ></Lottie>
    </div>
  );
};

export default TitleTopAnimation;