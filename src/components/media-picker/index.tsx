import Image from "next/image";
import { createPortal } from "react-dom";
import FileUpload from "../FileUpload";

export default function MediaPicker({
  images,
  handleImageSelect,
  setMediaPickerOpen,
  handleUpload,
  status,
}: {
  images: any[];
  handleImageSelect: (image: any) => void;
  setMediaPickerOpen: any;
  handleUpload: any;
  status: string;
}) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/20"
        onClick={() => setMediaPickerOpen(false)}
      >
        <div
          className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Medya Kütüphanesi</h1>
            <button type={"button"} onClick={() => setMediaPickerOpen(false)}>
              Kapat
            </button>
          </div>
          <div className="grid grid-cols-5 gap-8 overflow-y-auto max-h-[50vh]">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageSelect(image)}
                className="relative flex items-center justify-center w-32 h-32 bg-gray-200 rounded-lg"
              >
                <img
                  className="object-contain"
                  src={
                    "https://" + process.env.NEXT_PUBLIC_FILE_URL + image.img
                  }
                  alt=""
                />
              </div>
            ))}
          </div>
          <div>{<FileUpload status={status} uploadFile={handleUpload} />}</div>
        </div>
      </div>
    </>,

    document.body
  );
}
