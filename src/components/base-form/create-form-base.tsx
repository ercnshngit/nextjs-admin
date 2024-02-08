"use client";
import BaseForm from "@/components/base-form";
import useSearchParams from "@/hooks/use-search-params";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { createTableItem } from "@/services/common-table-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateFormBase({ table }: { table: DatabaseTableDto }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({});

  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (data: {}) =>
      createTableItem({
        tableName: table.name,
        data: Object.entries(data)
          .map(([key, value]) =>
            value === ""
              ? null
              : {
                  key,
                  value,
                }
          )
          .filter((item) => item !== null),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table.name]);
        toast.success("Kayıt başarıyla oluşturuldu");
        reset();
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error.message);
      },
    }
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const createAndGoBackMutation = useMutation(
    (data: {}) =>
      createTableItem({
        tableName: table.name,
        data: Object.entries(data)
          .map(([key, value]) =>
            value === ""
              ? null
              : {
                  key,
                  value,
                }
          )
          .filter((item) => item !== null),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table.name]);
        toast.success("Kayıt başarıyla oluşturuldu");
        router.push(
          "/dashboard/" + table.name + searchParams.createSearchParamsForUrl()
        );
      },
      onError: (error) => {
        //@ts-ignore
        toast.error(error.message);
      },
    }
  );
  const onSubmit: SubmitHandler<any> = (data) => {
    // change empty string to null
    const parsedData: any = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value === "") {
      } else {
        parsedData[key] = value;
      }
    });
    createMutation.mutate(data);
  };
  const onSubmitAndGoBack: SubmitHandler<any> = (data) => {
    createAndGoBackMutation.mutate(data);
  };

  return (
    <>
      <BaseForm
        control={control}
        setValue={setValue}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onSubmitAndGoBack={onSubmitAndGoBack}
        table={table}
        errors={errors}
        register={register}
        formType="create_crud_option"
      />
    </>
  );
}
