import BlockRenderer from "@/block-renderer";
import { BlockComponentDto } from "@/block-renderer/types";
import EditableData from "@/block-renderer/utils/editable-data";
import { getBlockComponentsByType } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";

import { cn } from "@/libs/utils";
import clsx from "clsx";
import { motion } from "framer-motion";
import { sliderContainer } from "../../animations";

export default function SliderBase() {
  const { data, error } = useQuery(["sliders"], () =>
    getBlockComponentsByType("slider")
  );
  const [currentSlide, setCurrentSlide] = React.useState(0);

  if (!data) return <div>Error</div>;

  return (
    <div>
      <EditableData<{ id: number; components: BlockComponentDto[] }>
        description="Slider"
        tableName="block"
        data={data.map((d) => ({ id: d[0].block.id, components: d }))}
        queryKey={["sliders"]}
      >
        <SliderWrapper
          sliderCount={data.length}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        >
          <BlockRenderer
            key={data[currentSlide][0].block.id}
            components={data[currentSlide]}
          />
        </SliderWrapper>
      </EditableData>
    </div>
  );
}

export function SliderWrapper({
  sliderCount,
  children,
  currentSlide,
  setCurrentSlide,
}: {
  sliderCount: number;
  children: React.ReactNode;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const changeSlide = useCallback(() => {
    if (currentSlide === sliderCount - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, sliderCount]);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      changeSlide();
    }, 6000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, [changeSlide]);

  const renderDots = useCallback(
    () => (
      <div
        className={clsx(
          "mb-4 flex h-10  w-auto flex-row items-end justify-center",
          currentSlide === 0 && "-mt-10 "
        )}
      >
        {Array.from({ length: sliderCount }).map((_, index) => (
          <button
            key={index}
            className={clsx(
              "z-20  mx-1 h-3 w-3 rounded-full transition-all delay-150 duration-700 ease-in-out",
              index === currentSlide ? "bg-white" : "bg-gray-700"
            )}
            onClick={() => {
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    ),
    [currentSlide]
  );
  return (
    <motion.section
      key={currentSlide}
      variants={sliderContainer}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      className={cn(
        "relative min-h-[150px] bg-primary-blue bg-[url('/assets/slider-background.png')] bg-contain bg-right-bottom bg-no-repeat text-white lg:min-h-[50vh]",
        currentSlide !== 0 && "overflow-hidden"
      )}
    >
      <div
        className={clsx(
          "container z-20 flex h-full w-full flex-1 flex-col items-start lg:w-auto "
        )}
      >
        {children}
        <div className="w-full mt-6">{renderDots()}</div>
      </div>
    </motion.section>
  );
}
