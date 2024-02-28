"use client";
import FileUpload from "@/components/FileUpload";
import { getMediaFromServer } from "@/services/media";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function MediaPage() {
  const { data: images } = useQuery(["media"], () =>
    getMediaFromServer({ directory: "images" })
  );

  const handleUpload = (file: File) => {
    console.log(file);
  };

  return (
    <div className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Medya Kütüphanesi</h1>
      </div>
      <div>{<FileUpload status={status} uploadFile={handleUpload} />}</div>
      <div className="grid grid-cols-5 gap-8 overflow-y-auto max-h-[50vh]">
        {images?.map((image: any) => (
          <div
            key={image.path}
            className="relative flex items-center justify-center w-32 h-32 bg-gray-200 rounded-lg"
          >
            <img
              className="object-contain"
              src={process.env.NEXT_PUBLIC_FILE_URL + image.path}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
