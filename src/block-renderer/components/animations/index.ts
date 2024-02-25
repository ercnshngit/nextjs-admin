const sliderContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const sliderItemRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
    x: 0,
    opacity: 1,
  },
};

const sliderItemLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    transition: {
      duration: 0.4,
    },
    x: 0,
    opacity: 1,
  },
};

export { sliderContainer, sliderItemRight, sliderItemLeft };
