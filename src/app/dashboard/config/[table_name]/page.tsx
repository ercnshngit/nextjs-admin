"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import { useDatabase } from "@/hooks/use-database";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTableInputTypes, updateTableConfig } from "@/services/dashboard";
import { toast } from "react-toastify";
import { type } from "@prisma/client";
export default function TableConfig({
  params,
}: {
  params: { table_name: string };
}) {
  const table_name = params.table_name;
  const { table, tables } = useDatabase(table_name);

  const { data: input_types } = useQuery<type[]>(["input_types"], () =>
    getTableInputTypes()
  );

  const tableStructure = tables?.find((t) => t.name === table_name);
  const columns = tableStructure?.columns?.map((column) => ({
    ...column,
    ...table?.columns?.find((c) => c.name === column.name),
  }));

  const initialValues = {
    name: table?.name,
    icon: table?.icon || "",
    is_hidden: table?.is_hidden || false,
    can_create: table?.can_create || true,
    can_update: table?.can_update || true,
    columns: columns?.map((column) => ({
      id: column.id || 0,
      name: column.name,
      is_filterable: column.is_filterable || false,
      is_hidden: column.is_hidden || false,
      is_unique: column.is_unique || false,
      is_required: column.is_required || true,
      is_searchable: column.is_searchable || false,
      is_sortable: column.is_sortable || false,
      is_primary: column.is_primary || false,
      input_type_id: column.input_type?.id || 0,
      create_crud_option_id: {
        name: "",
        is_hidden: false,
        is_required: false,
        is_readonly: false,
        input_type_id: 0,
      },
      read_crud_option_id: {
        name: "",
        is_hidden: false,
        is_required: false,
        is_readonly: false,
        input_type_id: 0,
      },
      update_crud_option_id: {
        name: "",
        is_hidden: false,
        is_required: false,
        is_readonly: false,
        input_type_id: 0,
      },
    })),
  };

  const form = useForm({ defaultValues: initialValues });
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

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

  const onSubmit: SubmitHandler<typeof initialValues> = (data) => {
    console.log(data);

    const tempData = {
      ...data,
      id: table?.id,
      columns: data.columns?.map((column) => ({
        ...column,
        id: Number(column.id),
        input_type_id: Number(column.input_type_id),
        create_crud_option_id: null,
        read_crud_option_id: null,
        update_crud_option_id: null,
        type_id: null,
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input readOnly {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="can_create"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Oluşturulabilir</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
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
          name="is_hidden"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Gizli</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Güncellenebilir</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
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
        {fields.map((column, index) => (
          <div key={column.id} className="bg-gray-100 p-4 rounded">
            <h1 className="text-lg font-bold mb-6">{column.name}</h1>
            <hr />
            <div>
              <FormField
                control={form.control}
                name={`columns.${index}.is_hidden`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Gizli</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
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
                name={`columns.${index}.is_filterable`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Filtrelenebilir</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Aranabilir</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Sıralanabilir</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Benzersiz</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
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
                name={`columns.${index}.is_required`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Zorunlu</FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
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
                    <FormLabel>İnput Tipi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a input" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {input_types?.map((input_type) => (
                          <SelectItem
                            key={input_type.id}
                            value={String(input_type.id)}
                          >
                            {input_type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex bg-gray-50 rounded p-5">
                <h1 className="text-lg mb-6">create_crud_option_id</h1>
                <FormField
                  control={form.control}
                  name={`columns.${index}.create_crud_option_id.is_hidden`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Gizli</FormLabel>
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
                  name={`columns.${index}.create_crud_option_id.is_required`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Gerekli</FormLabel>
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
                  name={`columns.${index}.create_crud_option_id.is_readonly`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Sadece Okuma</FormLabel>
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
                  name={`columns.${index}.create_crud_option_id.input_type_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İnput Tipi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a input" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {input_types?.map((input_type) => (
                            <SelectItem
                              key={input_type.id}
                              value={String(input_type.id)}
                            >
                              {input_type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex bg-gray-50 rounded p-5">
                <h1 className="text-lg mb-6">read_crud_option_id</h1>

                <FormField
                  control={form.control}
                  name={`columns.${index}.read_crud_option_id.is_hidden`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Gizli</FormLabel>
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
                  name={`columns.${index}.read_crud_option_id.is_required`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Gerekli</FormLabel>
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
                  name={`columns.${index}.read_crud_option_id.is_readonly`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Sadece Okuma</FormLabel>
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
                  name={`columns.${index}.read_crud_option_id.input_type_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İnput Tipi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a input" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {input_types?.map((input_type) => (
                            <SelectItem
                              key={input_type.id}
                              value={String(input_type.id)}
                            >
                              {input_type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex bg-gray-50 rounded p-5">
                <h1 className="text-lg mb-6">update_crud_option_id</h1>

                <FormField
                  control={form.control}
                  name={`columns.${index}.update_crud_option_id.is_hidden`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Gizli</FormLabel>
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
                  name={`columns.${index}.update_crud_option_id.is_required`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Gerekli</FormLabel>
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
                  name={`columns.${index}.update_crud_option_id.is_readonly`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Sadece Okuma</FormLabel>
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
                  name={`columns.${index}.update_crud_option_id.input_type_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İnput Tipi</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a input" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {input_types?.map((input_type) => (
                            <SelectItem
                              key={input_type.id}
                              value={String(input_type.id)}
                            >
                              {input_type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
