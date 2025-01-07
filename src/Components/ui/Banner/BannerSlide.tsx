import { motion } from "framer-motion";
import Image from "next/image";

interface BannerSlideProps {
  image: string;
  title: string;
  tagline: string;
  offer: string;
  gradient: string;
  icon: string;
}

export const BannerSlide: React.FC<BannerSlideProps> = ({
  image,
  title,
  tagline,
  offer,
  gradient,
  icon,
}) => {
  return (
    <div
      className={`relative w-full h-[50vh] overflow-hidden bg-gradient-to-r ${gradient}`}
    >
      <motion.div
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16">
        <motion.div
          className="w-full md:w-1/2 text-white z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {tagline}
          </motion.p>
          <motion.div
            className="inline-block bg-white text-gray-900 px-6 py-3 rounded-full text-lg md:text-xl lg:text-2xl font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {offer}
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 h-[180px] md:h-[250px] lg:h-[350px] relative mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-full h-full"
          >
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute top-4 right-4 text-6xl md:text-8xl opacity-25"
        initial={{ rotate: -20, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white opacity-10"
        >
          <path
            fill="currentColor"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.1,-0.5C88.1,15.3,83.5,30.5,75.2,43.5C66.9,56.4,54.8,67,41.2,74.4C27.6,81.7,13.8,85.9,-0.4,86.5C-14.6,87.1,-29.2,84.1,-41.6,76.8C-54.1,69.5,-64.4,57.9,-73.4,44.7C-82.4,31.4,-90,15.7,-91.7,-1.1C-93.4,-17.9,-89.1,-35.8,-79.6,-49.6C-70.1,-63.4,-55.3,-73.2,-40.4,-79.9C-25.5,-86.7,-12.7,-90.4,1.3,-92.6C15.3,-94.8,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>
    </div>
  );
};
