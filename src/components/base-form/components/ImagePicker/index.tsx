import MediaList from "@/components/media-picker";
import { Button } from "@/components/ui/button";
import { getMediaFromServer, uploadMediaToServer } from "@/services/media";
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
  const { data, isError } = useQuery(["media"], () =>
    getMediaFromServer({
      directory: "images",
    })
  );

  const handleImageSelect = (image: any) => {
    setValue(image.path);
    setMediaPickerOpen(false);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (file: File) =>
      uploadMediaToServer({ file, route: "media/" + table.name }),
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
  if (isError) {
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
        <div>
          Dosya yükleme sistemine ulaşırken bir sorun oluştu. Resimleri link
          olarak ekleyebilirsiniz
        </div>
        {errors[field.name] && <span>Bu alan gereklidir</span>}
      </div>
    );
  }
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
        <MediaList
          handleImageSelect={handleImageSelect}
          images={data}
          setMediaPickerOpen={setMediaPickerOpen}
          status={status}
          handleUpload={(file: File) => mutation.mutate(file)}
        />
      )}
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
