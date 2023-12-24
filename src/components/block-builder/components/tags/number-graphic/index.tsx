import React from "react";
import NumbersPlus from "./components/number-plus-icon";

export default function NumberGraphic({
  preTitle,
  title,
  numbers,
}: {
  preTitle: string;
  title: string;
  numbers: string;
}) {
  return (
    <div className="w-full bg-red-500 py-20 lg:py-2">
      <div className="mb-8 flex items-center">
        <h1 className="flex flex-row gap-1 text-base text-white lg:mt-36 lg:flex-col lg:gap-0 lg:text-3xl">
          <span className="font-light">{preTitle}</span>
          <span className="font-medium">{title}</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 items-start gap-2 lg:grid-cols-4 lg:gap-24">
        {numbers && Array.isArray(JSON.parse(numbers)) ? (
          JSON.parse(numbers).map(
            (number: { title: string; value: string }) => {
              return (
                <div
                  key={number.title}
                  className="flex flex-col justify-center text-white lg:items-center lg:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-medium lg:text-5xl">
                      {number.value}
                    </h1>
                    <NumbersPlus color="#A1C1FA" />
                  </div>
                  <h1 className="whitespace-nowrap text-[10px] font-light lg:text-base">
                    {number.title}
                  </h1>
                </div>
              );
            }
          )
        ) : (
          <div>{JSON.stringify(numbers)}</div>
        )}
      </div>
    </div>
  );
}
