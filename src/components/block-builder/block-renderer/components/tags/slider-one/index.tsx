import { ArrowRightIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { z } from "zod";

const MotionDiv = dynamic(() => import("@/libs/motion"), {
  ssr: false,
});

type SliderOneProps = z.infer<typeof propsSchema>;

export default function SliderOne({
  title,
  description,
  buttonTitle,
  buttonUrl,
}: SliderOneProps) {
  return (
    <div className="relative min-h-full w-full bg-[#293779]/90">
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.2, ease: "easeInOut" }}
        className="absolute inset-0 "
      >
        <video
          autoPlay
          muted
          className="min-h-full w-full object-cover max-md:h-1/2 max-md:object-cover"
        >
          <source src="/backgrounds/slider/teknopark-landing-2.webm" />
        </video>
      </MotionDiv>
      <div className="flex min-h-full w-full flex-col items-end justify-end bg-primary-blue/90 px-12 pb-4 mix-blend-hard-light lg:min-h-screen lg:px-24">
        <MotionDiv
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -1000, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className=" my-20 flex  max-w-lg flex-col  text-white lg:mb-24 lg:mr-14"
        >
          <h2 className="mb-4 text-xl font-semibold lg:text-5xl">
            Teknolojiye köprü.
          </h2>
          <p className="text-base font-light leading-6">
            Yenilikçi teknoloji firmalarına dünya standartlarında, uygun
            maliyetli teknopark hizmetleri sunarak kaynakları daha verimli
            kullanmalarına yardımcı oluyoruz.
          </p>
          <button
            className=" z-20 flex items-center gap-5 self-end rounded-full bg-white/10 px-5 py-3 text-xs font-light"
            onClick={() => {}}
          >
            Bize Katılın
            <ArrowRightIcon />
          </button>
        </MotionDiv>
      </div>
    </div>
  );
}

export const propsSchema = z.object({
  title: z.string(),
  description: z.string(),
  buttonTitle: z.string(),
  buttonUrl: z.string(),
});
