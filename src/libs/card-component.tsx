import React, { useState } from "react";
import { ConvalIcon } from "../block-renderer/components/assets/conval";

export default function CardComponent({
  title,
  address,
  phone,
}: {
  title: string;
  address: string;
  phone: string;
}) {
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className="group mt-5 grid gap-5 p-4  text-xl text-text-black  transition-colors hover:bg-secondary-blue hover:text-white"
    >
      <div className="flex h-min flex-row items-center gap-2">
        <ConvalIcon color={onHover ? "#ffffff" : null} />
        <p className="text-2xl font-bold text-secondary-blue group-hover:text-white">
          {title}
        </p>
      </div>
      <div className="group flex flex-row items-start justify-start gap-2">
        <img
          src="/assets/contact/location.svg"
          alt="mail"
          className="h-8 w-8 group-hover:hidden"
        />
        <img
          src="/assets/contact/location-white.svg"
          alt="phone"
          className=" hidden h-8 w-8 group-hover:inline-block"
        />

        <p>{address}</p>
      </div>
      <div className="group flex flex-row items-center gap-2">
        <img
          src="/assets/contact/phone.svg"
          alt="phone"
          className=" h-8 w-8 group-hover:hidden"
        />
        <img
          src="/assets/contact/phone-white.svg"
          alt="phone"
          className=" hidden h-8 w-8 group-hover:inline-block"
        />
        <p>{phone}</p>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="invisible">
          <img
            src="/assets/contact/phone.svg"
            alt="phone"
            className=" h-8 w-8"
          />
        </div>
        <p className="cursor-pointer underline">Maps</p>
      </div>
    </div>
  );
}
