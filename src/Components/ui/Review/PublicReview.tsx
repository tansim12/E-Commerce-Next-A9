"use client";

import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "rock.jpg",
    link: "https://res.cloudinary.com/dgm9w4vwh/image/upload/v1735627985/brooke-cagle-_6cz9KUvnxM-unsplash_m9mcuy.jpg",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes—so French photographer Clément.",
    src: "tree.jpg",
    link: "https://res.cloudinary.com/dgm9w4vwh/image/upload/v1735627984/good-faces-DSj40n6beGk-unsplash_oa6qvr.jpg",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal.",
    src: "water.jpg",
    link: "https://res.cloudinary.com/dgm9w4vwh/image/upload/v1735627984/desola-lanre-ologun-7d4LREDSPyQ-unsplash_njpn1i.jpg",
  },
  {
    title: "Mathias Svold",
    description:
      "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    src: "house.jpg",
    link: "https://res.cloudinary.com/dgm9w4vwh/image/upload/v1735627985/brooke-cagle-LCcFI_26diA-unsplash_n8k4t0.jpg",
    gradient: "from-green-400 to-cyan-500",
  },
  {
    title: "Mark Rammers",
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
    src: "cactus.jpg",
    link: "https://res.cloudinary.com/dgm9w4vwh/image/upload/v1735627985/brooke-cagle-YpefHkUc8BQ-unsplash_vraezj.jpg",
  },
];

const PublicReview = () => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-gradient-to-b " ref={container}>
      <section className=" text-white w-full grid place-content-center">
        <h1 className="2xl:text-7xl text-5xl px-8 font-bold text-center tracking-tight leading-[120%] bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          What Our Customers Say <br />
          <span className="text-3xl font-normal">
            Scroll down to read more! 👇
          </span>
        </h1>
      </section>

      <section className="text-white w-full">
        {projects?.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project?.link}
              title={project?.title}
              description={project?.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </main>
  );
};

export default PublicReview;

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;

  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  url,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[450px] w-[90%] md:w-[70%] rounded-xl p-8 origin-top bg-gray-800 shadow-lg"
      >
        <div className="flex flex-col md:flex-row h-full gap-6 md:gap-10 items-center">
          <div className="w-full md:w-[40%] relative">
            <div>
              <h2 className="text-3xl text-center font-bold  mb-10">{title}</h2>
              <p className="text-sm md:text-base leading-relaxed">
                {description}
              </p>
            </div>

            <Link
              href={"/products"}
              className="inline-flex items-center mt-4 px-4 py-2 bg-white text-gray-900 rounded-full font-semibold transition-all hover:bg-gray-200"
            >
              Sell Products
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="relative w-full md:w-[60%] h-64 md:h-full rounded-lg overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image fill src={url} alt={title} className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
