import React, { useState } from "react";
import { motion } from "framer-motion";
import { sliderContainer, sliderItemLeft } from "@/libs/animation";
import clsx from "clsx";
import MotionDiv from "@/libs/motion";
import EditableContent from "@/block-renderer/utils/editable-content";

export default function PageSlider({ title, description }: any) {
  return (
    <motion.section
      variants={sliderContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={clsx(
        "mb-8 lg:h-[250px] h-[150px]  bg-right-bottom bg-no-repeat  text-white ",
        "bg-[radial-gradient(circle,rgba(33,72,167,1)_0%,rgba(0,0,0,1)_100%)]"
      )}
    >
      <div className="container flex h-full  w-full flex-row justify-center">
        <MotionDiv
          variants={sliderItemLeft}
          className="flex h-full w-full flex-col  items-center justify-center pt-4 text-center md:pt-10 "
        >
          <EditableContent typeName="text" propName={"title"} propValue={title}>
            <h1 className="mb-2 flex items-center justify-center max-w-[200px] text-lg font-semibold whitespace-nowrap leading-5 md:text-3xl lg:max-w-[700px] lg:text-5xl xl:text-6xl 4xl:max-w-[800px] 4xl:text-7xl">
              {title}
            </h1>
          </EditableContent>
          <EditableContent
            typeName="richtext"
            propName={"description"}
            propValue={description}
          >
            <p className="mb-4 max-w-[600px] text-[11px] lg:text-base 4xl:text-2xl">
              {description}
            </p>
          </EditableContent>
        </MotionDiv>
      </div>
    </motion.section>
  );
}
