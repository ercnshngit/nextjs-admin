"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLoading,
} from "react-icons/ai";
import { FaFileUpload } from "react-icons/fa";
const MAX_FILE_SIZE = 500000;

type Image = {
  url: string;
  name?: string;
  id?: number;
};

export default function FileUpload({
  uploadFile,
  status,
}: {
  uploadFile: any;
  status: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setMessage(null);
      setFile(null);
      if (acceptedFiles.length > 1) {
        setMessage("Tek dosya yükleyebilirsiniz.");
        return;
      }

      if (acceptedFiles[0].size > MAX_FILE_SIZE) {
        setMessage(
          "Dosya boyutu 500 KBtan büyük olamaz. Dosyanızın boyutu " +
            Math.round(acceptedFiles[0].size / 1000) +
            " KB."
        );
        return;
      }
      setFile(acceptedFiles[0]);
      uploadFile(acceptedFiles[0]);
    },
    [setFile, setMessage, uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        className="flex flex-col items-center gap-2 p-2 transition-colors duration-300 bg-gray-100 border border-gray-400 border-dashed rounded-md group hover:border-blue-500"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <FaFileUpload className="mx-auto text-4xl transition-colors duration-300 fill-gray-400 group-hover:fill-blue-500" />
        <div className="max-w-sm text-center transition-colors duration-300 group-hover:text-blue-500">
          {isDragActive ? (
            <p>Buraya bırakabilirsiniz</p>
          ) : (
            <p>
              Dosya yüklemek için sürükleyip bırakabilir
              <br /> ya da tıklayarak seçebilirsiniz
            </p>
          )}
          <p className="text-xs text-gray-400">
            Maksimum dosya boyutu 500 KB. <br />
            Lütfen pdf formatında dosya yükleyiniz.
          </p>
        </div>
      </div>
      <div className="mt-4 border border-gray-200 rounded-md">
        {message && <p>{message}</p>}
        {file && (
          <div className="flex flex-row items-center p-1 pt-4">
            {status === "success" && (
              <AiFillCheckCircle className="mr-2 text-green-500" />
            )}
            {status === "error" && (
              <AiFillCloseCircle className="mr-2 text-red-500" />
            )}
            {status === "loading" && (
              <AiOutlineLoading className="mr-2 animate-spin" />
            )}

            <p>
              {file.name.substring(0, 40)}(...).{file.name.split(".").slice(-1)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
