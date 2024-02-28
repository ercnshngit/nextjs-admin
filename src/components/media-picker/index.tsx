import { createPortal } from "react-dom";
import FileUpload from "../FileUpload";
import { CheckIcon, DeleteIcon, Trash2Icon } from "lucide-react";
import DeleteDialog from "../delete-dialog-base";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMediaFromServer } from "@/services/media";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

export default function MediaList({
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
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const openDeleteDialog = (id: number) => {
    setOpen(true);
    setId(id);
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteMediaFromServer({
        id: Number(id),
      }),
    onSuccess: (response) => {
      toast.success("Silme işlemi başarılı");
      queryClient.invalidateQueries(["media"]);
    },
    onError: (error) => {
      toast.error("Silme işlemi başarısız");
    },
  });

  return (
    <>
      <div
        className="fixed inset-0 flex z-50 items-center justify-center bg-black/20"
        onClick={() => setMediaPickerOpen(false)}
      >
        <div
          className="flex flex-col gap-4 p-8  absolute bg-white rounded-lg shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Medya Kütüphanesi</h1>
            <button type={"button"} onClick={() => setMediaPickerOpen(false)}>
              Kapat
            </button>
          </div>
          <div className="grid grid-cols-5 gap-8 overflow-y-auto max-h-[50vh]">
            {Array.isArray(images) &&
              images?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageSelect(image)}
                  className="relative flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg"
                >
                  <div className="flex gap-2 absolute top-2 right-2 left-2 cursor-pointer">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSelect(image);
                      }}
                      size={"sm"}
                    >
                      <CheckIcon size={18} className="text-white" />
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(image.id);
                      }}
                    >
                      <Trash2Icon size={18} className="text-white" />
                    </Button>
                  </div>
                  <img
                    className="object-contain"
                    src={process.env.NEXT_PUBLIC_FILE_URL + image.path}
                    alt=""
                  />
                </div>
              ))}
          </div>
          <div>{<FileUpload status={status} uploadFile={handleUpload} />}</div>
        </div>
      </div>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        handleDelete={deleteMutation.mutate}
      />
    </>
  );
}
