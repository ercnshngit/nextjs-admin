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
import IconSelect from "@/libs/lucide-icons";
import Link from "next/link";
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

  const tableColumnsOrdered =
    table?.columns?.sort((a, b) => a.order - b.order) || [];

  const initialValues = {
    name: table?.name,
    icon: table?.icon || "",
    order: table?.order || 0,
    display_column_id: Number(table?.display_column_id || 0),
    is_hidden: table?.is_hidden || false,
    can_create: table?.can_create || false,
    can_update: table?.can_update || false,
    can_delete: table?.can_delete || false,
    can_translate: table?.can_translate || false,
    columns: tableColumnsOrdered.map((column) => ({
      order: Number(column.order || 0),
      id: column.id || 0,
      name: column.name,
      description: column.description || "",
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
      display_column_id:
        data.display_column_id || data.display_column_id !== 0
          ? Number(data.display_column_id)
          : undefined,
      columns: data.columns?.map((column) => ({
        ...column,
        order: Number(column.order || 0),
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
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
          <div className="flex justify-between">
            <Button asChild variant="secondary">
              <Link href="/dashboard/config">Geri</Link>
            </Button>

            <Button type="submit">
              {translate("CONFIG_TABLE_UPDATE_BUTTON")}
            </Button>
          </div>
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
          {/* Order */}
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate("CONFIG_ORDER_TITLE")}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  {translate("CONFIG_ORDER_DESCRIPTION")}
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
                  <IconSelect form={form} field={field} />
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
            name="display_column_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translate("CONFIG_DISPLAY_COLUMN_TITLE")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={translate(
                          "CONFIG_DISPLAY_COLUMN_PLACEHOLDER"
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tableColumnsOrdered?.map((column) => (
                      <SelectItem key={column.id} value={String(column.id)}>
                        {translate(column.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {translate("CONFIG_DISPLAY_COLUMN_DESCRIPTION")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_hidden"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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
              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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
              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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

          <FormField
            control={form.control}
            name="can_delete"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
                <div className="space-y-0.5">
                  <FormLabel>
                    {translate("CONFIG_ITEM_DELETE_ALLOWED_TITLE")}
                  </FormLabel>
                  <FormDescription>
                    {translate("CONFIG_ITEM_DELETE_ALLOWED_DESCRIPTION")}
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
            name="can_translate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
                <div className="space-y-0.5">
                  <FormLabel>
                    {translate("CONFIG_ITEM_TRANSLATE_ALLOWED_TITLE")}
                  </FormLabel>
                  <FormDescription>
                    {translate("CONFIG_ITEM_TRANSLATE_ALLOWED_DESCRIPTION")}
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
              //column relation
              const columnId = tableColumnsOrdered?.find(
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
                      <hr className="mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`columns.${index}.is_hidden`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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
                            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  {translate(
                                    "CONFIG_IS_COLUMN_FILTERABLE_TITLE"
                                  )}
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
                            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  {translate(
                                    "CONFIG_IS_COLUMN_SEARCHABLE_TITLE"
                                  )}
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
                            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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
                            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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
                            <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
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
                            <FormItem className="flex flex-col  gap-4  p-3 border rounded-lg shadow-sm bg-white">
                              <div className="w-full flex gap-4 items-center justify-between">
                                <div className="space-y-0.5">
                                  <FormLabel>
                                    {translate(
                                      "CONFIG_COLUMN_INPUT_TYPE_TITLE"
                                    )}
                                  </FormLabel>
                                  <FormDescription>
                                    {translate(
                                      "CONFIG_COLUMN_INPUT_TYPE_DESCRIPTION"
                                    )}
                                  </FormDescription>
                                </div>

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
                              </div>

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

                        <FormField
                          control={form.control}
                          name={`columns.${index}.order`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row gap-4 items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  {translate("CONFIG_COLUMN_ORDER")}
                                </FormLabel>
                                <FormDescription>
                                  {translate("CONFIG_COLUMN_ORDER_DESCRIPTION")}
                                </FormDescription>
                              </div>

                              <Input {...field} />

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`columns.${index}.description`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row col-span-2 gap-4 items-center justify-between p-3 border rounded-lg shadow-sm bg-white">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  {translate("CONFIG_COLUMN_DESCRIPTION_TITLE")}
                                </FormLabel>
                                <FormDescription>
                                  {translate(
                                    "CONFIG_COLUMN_DESCRIPTION_DESCRIPTION"
                                  )}
                                </FormDescription>
                              </div>

                              <Input {...field} />

                              <FormMessage />
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
        </form>
      </Form>
    </div>
  );
}

function Options({ index, form }: { index: number; form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `columns.${index}.options`,
  });

  const { translate } = useTranslate();

  return (
    <div>
      <div className="border-l-2 border-red-500 ml-3 flex flex-col gap-4">
        <div className="flex h-10 ml-3">
          <p className="flex-1 font-semiBold">{translate("LABEL")}</p>
          <p className="flex-1 font-semiBold">{translate("VALUE")}</p>
          <div className="w-16" />
        </div>
        {fields.map((item, k) => {
          return (
            <div key={item.id} className="flex h-10 ml-3 gap-2">
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
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => remove(k)}
                className="h-10 w-16"
              >
                Delete
              </Button>
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
            label: translate("LABEL"),
            value: translate("VALUE"),
          })
        }
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        {translate("APPEND")}
      </Button>

      <hr />
    </div>
  );
}
