"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import virtual_try from "../../../assets/Animation/virtual-try.json";
import Lottie from "lottie-react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function HomePageVirtualTry() {
    const navigate = useRouter()
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h- flex items-center justify-center overflow-hidden bg-beige"
    >
      <div className="container mx-auto gap-8 flex flex-col-reverse md:flex-row-reverse  items-center justify-between">
        {/* text div  */}
        <motion.div
          className="w-full md:w-1/2 mb-8 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-forest-green mb-6 space-y-3"
            variants={itemVariants}
          >
            {/* Join Our Camping Community */}
            Experience Virtual <br /> Try-On
          </motion.h1>
          <motion.p className="text-lg text-brown mb-8" variants={itemVariants}>
            Discover how your favorite gear fits and looks before making a
            purchase. Try it virtually and shop with confidence!
          </motion.p>
          <motion.button
          onClick={()=>navigate.push("/virtual-try")}
            type="submit"
            className="px-8 py-3 text-lg font-semibold text-beige bg-primary rounded-lg hover:bg-brown focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <span className="flex justify-center items-center gap-3">
              Virtual Try <FaArrowRight />
            </span>
          </motion.button>
        </motion.div>

        {/* image div  */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1,
          }}
        >
          <Lottie
            animationData={virtual_try}
            loop={true}
            autoplay={true}
          ></Lottie>
        </motion.div>
      </div>
    </section>
  );
}
