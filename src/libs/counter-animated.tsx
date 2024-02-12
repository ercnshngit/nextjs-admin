import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  inView,
} from "framer-motion";
import { useEffect } from "react";

const CounterAnimated = ({
  from,
  to,
  duration,
  title,
}: {
  from: number;
  to: number;
  duration: number;
  title: string;
  description: string;
}) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    inView("span", ({ target }) => {
      animate(count, to, { duration: duration });
    });
  }, [count, duration, to]);

  return (
    <div className="flex flex-col items-stretch rounded-[37px] border border-solid border-black border-opacity-30 px-2 py-2">
      <img
        loading="lazy"
        src="/assets/Navigation.png"
        className="mt-2 aspect-[0.75] w-[60px] max-w-full self-center overflow-hidden fill-teal-950 object-contain object-center max-md:mt-1"
        alt="Conval Group Logo"
      />

      <div className="text-icon-blue flex flex-row justify-center text-xl font-bold  tabular-nums md:my-6 md:text-5xl">
        <motion.span className="tabular-nums max-md:text-5xl">
          {rounded}
        </motion.span>
        +
      </div>
      <p className=" text-text-black text-center text-base font-bold  max-md:mt-4 md:text-xl">
        {title}
      </p>
    </div>
  );
};

export default CounterAnimated;
