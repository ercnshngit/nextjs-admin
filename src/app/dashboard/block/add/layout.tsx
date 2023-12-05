import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-grow mx-auto bg-gray-200">{children}</div>
  );
}

export default layout;
