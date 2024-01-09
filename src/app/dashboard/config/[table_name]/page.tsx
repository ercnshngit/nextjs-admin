"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { useTable } from "@/hooks/use-database";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCrudOption,
  getTableInputTypes,
  updateTableConfig,
} from "@/services/dashboard";
import { toast } from "react-toastify";
import { type } from "@prisma/client";
import { useTranslate } from "@/langs";
import { CrudOptionCreateDto } from "@/services/dto/crud-option.dto";
import { PlusCircle } from "lucide-react";
export default function TableConfig({
  params,
}: {
  params: { table_name: string };
}) {
  const table_name = params.table_name;
  const { table } = useTable(table_name);

  const { data: input_types } = useQuery<type[]>(["input_types"], () =>
    getTableInputTypes()
  );

  const { translate } = useTranslate();

  const queryClient = useQueryClient();
  const updateConfig = useMutation(
    (data: any) => {
      return updateTableConfig({
        data: data,
        table_name: data.name,
      });
    },
    {
      onSuccess: () => {
        toast.success("Tablo oluşturuldu");
        queryClient.invalidateQueries(["configs"]);
      },
    }
  );

  const createCrud = useMutation(
    (
      data: CrudOptionCreateDto & {
        column_id: number;
      }
    ) => {
      return createCrudOption(data.column_id, {
        name: data.name,
        is_hidden: data.is_hidden,
        is_required: data.is_required,
        is_readonly: data.is_readonly,
        input_type_id: data.input_type_id,
        crud_type: data.crud_type,
      });
    },
    {
      onSuccess: () => {
        toast.success("Gösterim opsiyonları güncellendi.");
        queryClient.invalidateQueries(["configs"]);
      },
    }
  );

  const initialValues = {
    name: table?.name,
    icon: table?.icon || "",
    is_hidden: table?.is_hidden || false,
    can_create: table?.can_create || false,
    can_update: table?.can_update || false,
    columns: table?.columns?.map((column) => ({
      id: column.id || 0,
      name: column.name,
      is_filterable: column.is_filterable || false,
      is_hidden: column.is_hidden || false,
      is_unique: column.is_unique || false,
      is_required: column.is_required || false,
      is_searchable: column.is_searchable || false,
      is_sortable: column.is_sortable || false,
      is_primary: column.is_primary || false,
      input_type_id: column.input_type?.id || 0,
      options: column.options?.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
      })),
      create_crud_option: {
        name: column.create_crud_option?.name || "",
        is_hidden: column.create_crud_option?.is_hidden || false,
        is_required: column.create_crud_option?.is_required || false,
        is_readonly: column.create_crud_option?.is_readonly || false,
        input_type_id: column.create_crud_option?.input_type?.id || 0,
      },
      read_crud_option: {
        name: column.read_crud_option?.name || "",
        is_hidden: column.read_crud_option?.is_hidden || false,
        is_required: column.read_crud_option?.is_required || false,
        is_readonly: column.read_crud_option?.is_readonly || false,
        input_type_id: column.read_crud_option?.input_type?.id || 0,
      },
      update_crud_option: {
        name: column.update_crud_option?.name || "",
        is_hidden: column.update_crud_option?.is_hidden || false,
        is_required: column.update_crud_option?.is_required || false,
        is_readonly: column.update_crud_option?.is_readonly || false,
        input_type_id: column.update_crud_option?.input_type?.id || 0,
      },
    })),
  };
  const form = useForm<typeof initialValues>({ defaultValues: initialValues });
  const { control } = form;
  const { fields, update } = useFieldArray({
    control,
    name: "columns",
  });
  if (!table) return <div>loading</div>;

  const onSubmit: SubmitHandler<typeof initialValues> = (data) => {
    const tempData = {
      ...data,
      id: table?.id,
      columns: data.columns?.map((column) => ({
        ...column,
        id: Number(column.id),
        input_type_id: Number(column.input_type_id),
        create_crud_option: undefined,
        read_crud_option: undefined,
        update_crud_option: undefined,
      })),
    };
    updateConfig.mutate(tempData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translate("CONFIG_TABLENAME_TITLE")}</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormDescription>
                {translate("CONFIG_TABLENAME_DESCRIPTION")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translate("CONFIG_ICON_TITLE")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                {translate("CONFIG_ICON_DESCRIPTION")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_hidden"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  {translate("CONFIG_IS_TABLE_NOT_VISIBLE_IN_SIDEBAR_TITLE")}
                </FormLabel>
                <FormDescription>
                  {translate(
                    "CONFIG_IS_TABLE_NOT_VISIBLE_IN_SIDEBAR_DESCRIPTION"
                  )}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="can_create"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  {translate("CONFIG_NEW_ITEM_CREATE_ALLOWED_TITLE")}
                </FormLabel>
                <FormDescription>
                  {translate("CONFIG_NEW_ITEM_CREATE_ALLOWED_DESCRIPTION")}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="can_update"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  {translate("CONFIG_ITEM_UPDATE_ALLOWED_TITLE")}
                </FormLabel>
                <FormDescription>
                  {translate("CONFIG_ITEM_UPDATE_ALLOWED_DESCRIPTION")}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible className="w-full">
          {fields.map((column, index) => {
            const columnId = table.columns?.find(
              (c) => c.name === column.name
            )?.id;
            return (
              <AccordionItem className="" value={column.id} key={column.id}>
                <div className="bg-gray-100 rounded px-4 ">
                  <AccordionTrigger className="flex items-center ">
                    <h1 className=" text-lg font-bold">
                      {translate("COLUMN_NAME")}: {translate(column.name)}
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <hr />
                    <div>
                      <FormField
                        control={form.control}
                        name={`columns.${index}.is_hidden`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>
                                {translate(
                                  "CONFIG_IS_COLUMN_NOT_VISIBLE_IN_ALL_TITLE"
                                )}
                              </FormLabel>
                              <FormDescription>
                                {translate(
                                  "CONFIG_IS_COLUMN_NOT_VISIBLE_IN_ALL_DESCRIPTION"
                                )}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(event) => {
                                  field.onChange(event);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`columns.${index}.is_filterable`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>
                                {translate("CONFIG_IS_COLUMN_FILTERABLE_TITLE")}
                              </FormLabel>
                              <FormDescription>
                                {translate(
                                  "CONFIG_IS_COLUMN_FILTERABLE_DESCRIPTION"
                                )}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`columns.${index}.is_searchable`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>
                                {translate("CONFIG_IS_COLUMN_SEARCHABLE_TITLE")}
                              </FormLabel>
                              <FormDescription>
                                {translate(
                                  "CONFIG_IS_COLUMN_SEARCHABLE_DESCRIPTION"
                                )}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`columns.${index}.is_sortable`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>
                                {translate("CONFIG_IS_COLUMN_SORTABLE_TITLE")}
                              </FormLabel>
                              <FormDescription>
                                {translate(
                                  "CONFIG_IS_COLUMN_SORTABLE_DESCRIPTION"
                                )}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`columns.${index}.is_unique`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>
                                {translate("CONFIG_IS_COLUMN_UNIQUE_TITLE")}
                              </FormLabel>
                              <FormDescription>
                                {translate(
                                  "CONFIG_IS_COLUMN_UNIQUE_DESCRIPTION"
                                )}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                // onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`columns.${index}.is_required`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>
                                {translate("CONFIG_IS_COLUMN_REQUIRED_TITLE")}
                              </FormLabel>
                              <FormDescription>
                                {translate(
                                  "CONFIG_IS_COLUMN_REQUIRED_DESCRIPTION"
                                )}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`columns.${index}.input_type_id`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {translate("CONFIG_COLUMN_INPUT_TYPE_TITLE")}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={String(field.value)}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={translate(
                                      "CONFIG_COLUMN_INPUT_TYPE_PLACEHOLDER"
                                    )}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {input_types?.map((input_type) => (
                                  <SelectItem
                                    key={input_type.id}
                                    value={String(input_type.id)}
                                  >
                                    {translate(input_type.name)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {translate(
                                "CONFIG_COLUMN_INPUT_TYPE_DESCRIPTION"
                              )}
                            </FormDescription>
                            <FormMessage />

                            {input_types?.find((input_type) => {
                              return (
                                String(input_type.id) === String(field.value)
                              );
                            })?.name === "select" && (
                              <div className="flex flex-col gap-2">
                                <h2>{translate("SELECT_OPTIONS")}</h2>
                                <Options index={index} form={form} />
                              </div>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        <Button type="submit">{translate("CONFIG_TABLE_UPDATE_BUTTON")}</Button>
      </form>
    </Form>
  );
}

function Options({ index, form }: { index: number; form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `columns.${index}.options`,
  });

  return (
    <div>
      <div style={{ marginLeft: 10, borderLeft: "2px solid red" }}>
        {fields.map((item, k) => {
          return (
            <div
              key={item.id}
              style={{
                height: "50px",
                display: "flex",
                marginLeft: 10,
              }}
            >
              <input
                className="rounded-md border w-full border-gray-300 p-2"
                {...form.register(
                  `columns.${index}.options.${k}.label` as const
                )}
              />
              <input
                className="rounded-md border w-full border-gray-300 p-2"
                {...form.register(
                  `columns.${index}.options.${k}.value` as const
                )}
              />
              <button
                type="button"
                onClick={() => remove(k)}
                style={{ height: "40px", marginTop: 0 }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <Button
        className="mt-2 flex items-center bg-green-500 hover:bg-green-600"
        variant={"default"}
        type="button"
        onClick={() =>
          append({
            label: "item",
            value: "sdfdsfs",
          })
        }
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Append
      </Button>

      <hr />
    </div>
  );
}
