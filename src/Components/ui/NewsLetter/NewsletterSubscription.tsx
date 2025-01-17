"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNewsLetterCreate } from "@/src/hooks/analytics.hook";
import toast from "react-hot-toast";
import Image from "next/image";
import newsLetterImg from "../../../assets/newsletter.png";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  const { isSuccess, mutate } = useNewsLetterCreate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    mutate({ payload: { email } });
    toast.success("Thank you for joining our camping community!");
    setIsSubscribed(true);
  };

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
      className=" flex items-center justify-center overflow-hidden bg-beige"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="w-full md:w-1/2 mb-8 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-forest-green mb-6"
            variants={itemVariants}
          >
            Join Our Camping Community
          </motion.h1>
          <motion.p className="text-lg text-brown mb-8" variants={itemVariants}>
            Get exclusive tips, gear reviews, and adventure inspiration straight
            to your inbox!
          </motion.p>
          {!isSubscribed ? (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col items-start"
              variants={itemVariants}
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full max-w-md px-4 py-2 text-lg rounded-lg border-2 border-brown focus:outline-none focus:border-forest-green mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.button
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
                Subscribe
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              className="text-xl text-forest-green font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              Thanks for subscribing!
            </motion.div>
          )}
        </motion.div>
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
          <Image
            src={newsLetterImg}
            alt="Camping scene"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
