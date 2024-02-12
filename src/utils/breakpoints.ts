import { useEffect, useState } from "react";

export const screens = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "4xl": "2000px",
};

type Screens = { [key in keyof typeof screens]?: number };

export const whichBreakpoint = (windowSize: number) => {
  const width = windowSize;
  if (width < parseInt(screens.sm)) return "xs";
  if (width < parseInt(screens.md) && width > parseInt(screens.sm)) return "sm";
  if (width < parseInt(screens.lg) && width > parseInt(screens.md)) return "md";
  if (width < parseInt(screens.xl) && width > parseInt(screens.lg)) return "lg";
  if (width < parseInt(screens["2xl"]) && width > parseInt(screens.xl))
    return "xl";
  if (width < parseInt(screens["4xl"]) && width > parseInt(screens["2xl"]))
    return "2xl";
  if (width > parseInt(screens["4xl"])) return "4xl";
  return "xs";
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const breakpoints = (values: Screens, windowSize: number) => {
  const breakpoint = whichBreakpoint(windowSize);
  if (values.hasOwnProperty(breakpoint)) {
    return values[breakpoint as keyof typeof screens];
  } else {
    if (breakpoint === "4xl") {
      return (
        values["2xl"] ||
        values["xl"] ||
        values["lg"] ||
        values["md"] ||
        values["sm"]
      );
    } else if (breakpoint === "2xl") {
      return values["xl"] || values["lg"] || values["md"] || values["sm"];
    } else if (breakpoint === "xl") {
      return values["lg"] || values["md"] || values["sm"];
    } else if (breakpoint === "lg") {
      return values["md"] || values["sm"];
    } else if (breakpoint === "md") {
      return values["sm"];
    } else {
      return values["xs"];
    }
  }
};