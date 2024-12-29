"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CampingBackground } from "./CampingBackground";
import { ThankYouMessage } from "./ThankYouMessage";

export function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsSubscribed(true);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-beige"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <CampingBackground inView={inView} />
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full px-4 pt-16">
        <motion.h1
          className="text-2xl md:text-6xl font-bold text-forest-green mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Join Our Camping Community
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
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
            className="px-8 py-3 text-lg font-semibold text-beige bg-forest-green rounded-lg hover:bg-brown focus:outline-none"
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
      </div>

      <ThankYouMessage isVisible={isSubscribed} />
    </section>
  );
}
