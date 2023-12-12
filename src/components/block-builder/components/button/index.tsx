import React from "react";

export default function Button({
  className,
  value,
}: {
  className: string;
  value: string;
}) {
  return <button className={className}>{value}</button>;
}
