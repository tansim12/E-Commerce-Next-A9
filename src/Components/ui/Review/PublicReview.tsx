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
    link: "https://i.ibb.co.com/7gCnPwW/brooke-cagle-6cz9-KUvnx-M-unsplash.jpg",
    color: "#163580",
  },
  {
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément.",
    src: "tree.jpg",
    link: "https://i.ibb.co.com/7NMLbGH/good-faces-DSj40n6be-Gk-unsplash.jpg",
    color: "#5196fd",
  },
  {
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal.",
    src: "water.jpg",
    link: "https://i.ibb.co.com/8M2wWqq/desola-lanre-ologun-7d4-LREDSPy-Q-unsplash.jpg",
    color: "#6d33da",
  },
  {
    title: "Mathias Svold and Ulrik Hasemann",
    description:
      "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    src: "house.jpg",
    link: "https://i.ibb.co.com/0CZQyHL/brooke-cagle-LCc-FI-26di-A-unsplash.jpg",
    color: "#5ed6a2",
  },
  {
    title: "Mark Rammers",
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, ‘all over again’—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
    src: "cactus.jpg",
    link: "https://i.ibb.co.com/yRKmB1v/brooke-cagle-Ypef-Hk-Uc8-BQ-unsplash.jpg",
    color: "#a51196",
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
    <main className="bg-black" ref={container}>
      <section className="text-white h-[70vh] w-full bg-slate-950 grid place-content-center">
        <div className="absolute bottom-0 left-0 right-0 top-0 "></div>

        <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
          What Our Customers Say <br /> Scroll down to read more! 👇
        </h1>
      </section>

      <section className="text-white w-full bg-slate-950">
        {projects?.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project?.link}
              src={project?.src}
              title={project?.title}
              color={project?.color}
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
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
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
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[100%] md:w-[70%] rounded-md p-10 origin-top`}
      >
        <h2 className="text-2xl text-center font-semibold">{title}</h2>
        <div className={`flex h-full mt-5 gap-10`}>
          <div className={`w-[40%] relative top-[10%]`}>
            <p className="text-sm">{description}</p>
            <span className="flex items-center gap-2 pt-2">
              <Link href={"/products"} className="underline cursor-pointer">
                Sell Products
              </Link>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          <div className={`relative w-[60%] h-full rounded-lg overflow-hidden`}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={url} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
