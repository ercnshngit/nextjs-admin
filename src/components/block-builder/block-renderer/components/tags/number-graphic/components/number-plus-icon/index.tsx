import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill={props.color || "#C28E1E"}
      d="M9 18c-1.654 0-3-1.346-3-3l.053-3.053L3.018 12A3.008 3.008 0 0 1 0 9c0-1.654 1.346-3 3-3l3.053-.054L6 3.018A3.008 3.008 0 0 1 9 0c1.654 0 3 1.346 3 3l.055 2.946L15.018 6C16.654 6 18 7.346 18 9s-1.346 3-3 3l-2.945-.053L12 15.018C12 16.654 10.654 18 9 18Zm-1-8v5.018c0 .533.449.982 1 .982.551 0 1-.449 1-1v-5h5.018A.998.998 0 0 0 16 9c0-.551-.449-1-1-1h-5V3a.99.99 0 0 0-1-1c-.551 0-1 .449-1 1v5H3a.99.99 0 0 0-1 1c0 .551.449 1 1 1h5Z"
    />
  </svg>
);
const NumbersPlus = memo(SvgComponent);
export default NumbersPlus;
