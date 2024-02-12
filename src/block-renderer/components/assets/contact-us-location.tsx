import { breakpoints, useWindowSize } from "@/utils/breakpoints";
import * as React from "react";
import { memo } from "react";

const SvgComponent = (props: any) => (
  <svg
    width={breakpoints(
      {
        xs: 20,
        md: 24,
      },
      useWindowSize()
    )}
    height={breakpoints(
      {
        xs: 20,
        md: 24,
      },
      useWindowSize()
    )}
    viewBox="0 0 31 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.4575 0.666504C23.7974 0.666504 30.5825 7.503 30.5825 15.907C30.5825 26.2378 18.7465 36.4165 15.4575 36.4165C12.1685 36.4165 0.33252 26.2378 0.33252 15.907C0.33252 7.503 7.11769 0.666504 15.4575 0.666504ZM15.4575 3.4165C8.63385 3.4165 3.08252 9.021 3.08252 15.907C3.08252 24.6685 13.3932 33.2045 15.4575 33.6592C17.5219 33.2027 27.8325 24.6667 27.8325 15.907C27.8325 9.021 22.2812 3.4165 15.4575 3.4165ZM15.4594 9.83317C18.7447 9.83317 21.4177 12.5062 21.4177 15.7933C21.4177 19.0787 18.7447 21.7498 15.4594 21.7498C12.174 21.7498 9.50102 19.0787 9.50102 15.7933C9.50102 12.5062 12.174 9.83317 15.4594 9.83317ZM15.4594 12.5832C13.6902 12.5832 12.251 14.0223 12.251 15.7933C12.251 17.5625 13.6902 18.9998 15.4594 18.9998C17.2285 18.9998 18.6677 17.5625 18.6677 15.7933C18.6677 14.0223 17.2285 12.5832 15.4594 12.5832Z"
      fill={props.color ? props.color : "#1A1A1A"}
    />
  </svg>
);

const Memo = memo(SvgComponent);

export { Memo as ContactLocationIcon };
