import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageBox from "../ImageBox";
export default function MotionDiv({
  items,
}: {
  items: {
    href: string;
    src: string;
    title: string;
  }[];
}) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 "
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items &&
        items.map((box) => (
          <motion.div variants={item} key={box.title}>
            <ImageBox {...box} />
          </motion.div>
        ))}
    </motion.div>
  );
}
