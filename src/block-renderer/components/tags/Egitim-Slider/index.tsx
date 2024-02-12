import React, { useState, useCallback, useEffect } from "react";
import MotionDiv from "@/libs/motion";
import { motion } from "framer-motion";
import {
  sliderContainer,
  sliderItemLeft,
  sliderItemRight,
} from "@/libs/animation";

import Link from "next/link";

import clsx from "clsx";
import EditableContent from "@/block-renderer/utils/editable-content";

export default function Slider({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  const sliders = ["/assets/sliders/slider-1.png"];
  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = useCallback(() => {
    if (currentSlide === sliders?.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, sliders]);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      changeSlide();
    }, 6000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, [sliders, changeSlide]);

  const renderDots = useCallback(
    () => (
      <div
        className={clsx(
          "mb-4 flex h-10 w-auto flex-row items-end justify-center"
        )}
      >
        {sliders?.map((item: any, index: number) => (
          <button
            key={index}
            className={clsx(
              "z-20 mx-1 h-3 w-3 rounded-full transition-all delay-150 duration-700 ease-in-out",
              index === currentSlide ? "bg-white" : "bg-gray-500"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    ),
    [currentSlide, sliders]
  );

  return (
    <motion.section
      key={currentSlide}
      variants={sliderContainer}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      className="relative h-[296px] bg-[#1C4489] bg-[url('/assets/slider-background.png')] bg-contain bg-right-bottom bg-no-repeat p-4 lg:p-24 pb-4 text-white md:h-[496px] lg:h-[696px] md:pb-6"
    >
      <Link
        href="/egitim-takvimi"
        className="container flex h-[200px] w-full flex-row md:h-[600px]"
      >
        <div
          className={`flex h-full flex-col items-start ${
            currentSlide === 0 ? "w-full lg:w-2/3" : "w-full"
          } z-20`}
        >
          <MotionDiv
            variants={sliderItemLeft}
            className={`flex w-full  flex-col md:pt-20 max-md:mt-10 ${
              currentSlide === 0
                ? "lg:items-start items-center"
                : "items-center"
            }`}
          >
            <EditableContent
              typeName="text"
              propName={"title"}
              propValue={title}
            >
              <h1 className="mb-4 text-2xl font-bold leading-5 md:text-5xl lg:max-w-[700px] xl:text-6xl 4xl:max-w-[800px] 4xl:text-7xl">
                {title}
              </h1>
            </EditableContent>

            <EditableContent
              typeName="richtext"
              propName={"description"}
              propValue={description}
            >
              <p className="mb-4 lg:text-lg md:text-base text-xs max-lg:text-center">
                {description}
              </p>
            </EditableContent>
          </MotionDiv>
          <div className="absolute bottom-0 left-0 right-0 w-full">
            {renderDots()}
          </div>
        </div>
        <div className="absolute inset-0 z-10 flex md:items-end items-center overflow-hidden">
          <MotionDiv
            variants={sliderItemRight}
            className="relative flex w-full  h-full"
          >
            <EditableContent
              typeName="image"
              propName={"image"}
              propValue={image}
            >
              <img
                src={image}
                alt="hero"
                className="md:object-right-top  object-center lg:opacity-100 opacity-30 lg:object-right-center object-contain"
              />
            </EditableContent>
          </MotionDiv>
        </div>
      </Link>
    </motion.section>
  );
}
