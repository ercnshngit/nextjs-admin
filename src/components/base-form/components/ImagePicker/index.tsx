import MediaPicker from "@/components/media-picker";
import { Button } from "@/components/ui/button";
import {
  getMedia,
  getMediaFromServer,
  uploadMediaToServer,
} from "@/services/media";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";
import { DataBaseTableColumnDto } from "@/services/dto/database-table-column.dto";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { toast } from "react-toastify";

export default function ImagePicker({
  field,
  table,
  register,
  errors,
  defaultValue,
  setValue,
}: {
  field: DataBaseTableColumnDto;
  table: Partial<DatabaseTableDto>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: any;
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
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />

      <input
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, { required: field.is_required })}
        defaultValue={defaultValue}
      />
      <Button
        className="w-fit"
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
          setMediaPickerOpen={setMediaPickerOpen}
          status={status}
          handleUpload={(file: File) => mutation.mutate(file)}
        />
      )}
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
