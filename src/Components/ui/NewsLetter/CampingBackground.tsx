import { motion } from "framer-motion";

export function CampingBackground({ inView }: { inView: boolean }) {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky */}
      <rect width="1200" height="800" fill="#E6D7C3" />

      {/* Mountains */}
      <motion.path
        d="M0 400L300 100L600 350L900 50L1200 300V800H0V400Z"
        fill="#8B4513"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Trees */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <path d="M100 500L150 400L200 500H100Z" fill="#228B22" />
        <path d="M300 550L350 450L400 550H300Z" fill="#228B22" />
        <path d="M800 520L850 420L900 520H800Z" fill="#228B22" />
        <path d="M1000 480L1050 380L1100 480H1000Z" fill="#228B22" />
      </motion.g>

      {/* Tents */}
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <path d="M500 600L550 500L600 600H500Z" fill="#D2691E" />
        <path d="M700 580L750 480L800 580H700Z" fill="#8B4513" />
      </motion.g>
    </svg>
  );
}
