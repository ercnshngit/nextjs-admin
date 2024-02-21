"use client";
import BaseForm from "@/components/base-form";
import useSearchParams from "@/hooks/use-search-params";
import { DatabaseTableDto } from "@/services/dto/database-table.dto";
import { createTableItem } from "@/services/common-table-api";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDataLanguageMutation } from "@/utils/use-data-language";

export default function CreateFormBase({
  table,
  customCreateMutation,
  config,
}: {
  table: DatabaseTableDto;
  customCreateMutation?: UseMutationResult<any, unknown, {}, unknown>;
  config?: {
    show?: string[];
    hidden?: string[];
    readonly?: string[];
    defaultValues?: { [key: string]: any };
  };
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<any>({});

  const { dataLanguageMutation } = useDataLanguageMutation({
    table_name: table.name,
  });

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
      onSuccess: (data) => {
        console.log("data", data);
        if (table.can_translate) {
          dataLanguageMutation.mutate(data);
        }
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
    if (customCreateMutation) {
      customCreateMutation.mutate(data);
      reset();
    } else {
      createMutation.mutate(data);
    }
  };
  const onSubmitAndGoBack: SubmitHandler<any> = (data) => {
    createAndGoBackMutation.mutate(data);
  };

  return (
    <>
      <BaseForm
        config={config}
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
