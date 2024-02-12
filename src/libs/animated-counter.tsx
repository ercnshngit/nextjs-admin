import SliderTitle from "@/block-renderer/components/tags/SliderTitle";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  inView,
} from "framer-motion";
import { useEffect } from "react";

const AnimatedCounter = ({
  from,
  to,
  duration,
  description,
}: {
  from: number;
  to: number;
  duration: number;
  description: string;
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    inView("span", ({ target }) => {
      animate(count, to, { duration: duration });
    });
  }, []);

  return (
    <div className="h-min ">
      <SliderTitle className="mb-0 text-icon-blue">
        <motion.span className="tabular-nums ">{rounded}</motion.span>
        <span>+</span>
      </SliderTitle>
      <p className="text-xs font-bold text-text-black lg:text-xl 2xl:text-xl ">
        {description}
      </p>
    </div>
  );
};

export default AnimatedCounter;
