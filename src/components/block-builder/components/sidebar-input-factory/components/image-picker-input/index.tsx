import MediaPicker from "@/components/media-picker";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ComponentPropDto } from "@/services/dto/prop.dto";
import { getMediaFromServer, uploadMediaToServer } from "@/services/media";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

export default function ImagePickerInput({
  key,
  value,
  setValue,
}: {
  key: string;
  value: any;
  setValue: any;
}) {
  const [mediaPickerOpen, setMediaPickerOpen] = React.useState(false);
  const [status, setStatus] = React.useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const { data, error } = useQuery(["media"], () =>
    getMediaFromServer({
      directory: "images",
    })
  );
  const handleImageSelect = (image: any) => {
    setValue(image.img);
    setMediaPickerOpen(false);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (file: File) => uploadMediaToServer({ file, route: "images" }),
    onSuccess: (response) => {
      setStatus("success");
      queryClient.invalidateQueries(["media"]);
      toast.success("Dosya Başarıyla Yüklendi");
    },
    onError: (error) => {
      setStatus("error");
    },
    onMutate: (file) => {
      setStatus("loading");
    },
  });

  return (
    <>
      <input
        className="px-2 py-1 border border-gray-200 rounded-md "
        id={key}
        value={value}
      />
      <Button
        className="w-fit ml-2"
        type={"button"}
        onClick={() => setMediaPickerOpen(true)}
        variant={"secondary"}
      >
        Medya Kütüphanesini Aç
      </Button>
      {mediaPickerOpen && (
        <MediaPicker
          handleImageSelect={handleImageSelect}
          images={data.images}
          status={status}
          setMediaPickerOpen={setMediaPickerOpen}
          handleUpload={(file: File) => mutation.mutate(file)}
        />
      )}
    </>
  );
}
