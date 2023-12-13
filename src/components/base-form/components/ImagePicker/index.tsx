import { DATABASE_TABLE, DATABASE_TABLE_COLUMN } from "@/config/general";
import { useTranslate } from "@/langs";
import React from "react";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import Label from "../Label";
import MediaPicker from "@/components/media-picker";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMedia } from "@/services/media";

export default function ImagePicker({
  field,
  table,
  register,
  errors,
  defaultValue,
  setValue,
}: {
  field: DATABASE_TABLE_COLUMN;
  table: Partial<DATABASE_TABLE>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  defaultValue?: any;
  setValue: any;
}) {
  const [mediaPickerOpen, setMediaPickerOpen] = React.useState(false);

  const { data, error } = useQuery(["media"], () =>
    getMedia({
      directory: table.name!,
    })
  );
  const handleImageSelect = (image: any) => {
    setValue(field.name, image.img);
    setMediaPickerOpen(false);
  };

  return (
    <div
      key={field.name}
      className="flex flex-col w-full gap-2 pb-4 border-b border-gray-200"
    >
      <Label field={field} table={table} />

      <input
        className="px-2 py-1 border border-gray-200 rounded-md "
        {...register(field.name, { required: true })}
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
          tableName={table.name!}
          handleImageSelect={handleImageSelect}
          images={data.images}
          setMediaPickerOpen={setMediaPickerOpen}
        />
      )}
      {errors[field.name] && <span>Bu alan gereklidir</span>}
    </div>
  );
}
