"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BannerSlide } from "./BannerSlide";
import { bannerData } from "./bannerData";

export const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-[60vh]">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden  "
        >
          <BannerSlide {...bannerData[currentSlide]} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
