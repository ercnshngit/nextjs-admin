"use client";
import IconSelect from "@/components/icon-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTable } from "@/hooks/use-database";
import { useTranslate } from "@/langs";
import { getTable, getTypes } from "@/services/dashboard";
import { TypeDto } from "@/services/dto/type.dto";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";

export default function AddComponentPage() {
  const { table } = useTable("component");
  const tableName = table?.name || "";
  const { translate } = useTranslate();

  const { data: componentTypes } = useQuery<TypeDto[]>(["componentTypes"], () =>
    getTypes("component")
  );
  const { data: propTypes } = useQuery<TypeDto[]>(["propTypes"], () =>
    getTypes("prop")
  );

  const initialValues = {
    name: "",
    tag: {
      name: "",
    },
    type_id: null,
    icon: "",
    props: [
      {
        key: "",
        type_id: null,
      },
    ],
  };

  const form = useForm<DefaultValues>({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "props",
  });

  type DefaultValues = {
    name: string;
    tag: {
      name: string;
    };
    type_id?: number | null;
    icon: string;
    props: {
      key: string;
      type_id?: number | null;
    }[];
  };

  const onSubmit = (data: DefaultValues) => console.log("data", data);

  return (
    <div className="container py-10 mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">{translate(tableName)} Ekle</h3>
        <div>
          <Button asChild>
            <Link href={"/dashboard/" + tableName}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card className="min-h-[700px]">
        <CardContent>
          <div className="flex justify-center py-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İsim</FormLabel>

                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"tag.name"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Component İsmi</FormLabel>

                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"icon"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>

                      <FormControl>
                        <IconSelect form={form} field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"type_id"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tip</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {componentTypes?.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Props</FormLabel>
                <ul className="flex gap-2 flex-col">
                  {fields.map((item, index) => {
                    return (
                      <li key={item.id} className="flex gap-4 items-center">
                        <FormField
                          control={form.control}
                          name={`props.${index}.key`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`props.${index}.type_id`}
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={String(field.value)}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {propTypes?.map((item) => (
                                    <SelectItem
                                      key={item.id}
                                      value={String(item.id)}
                                    >
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant={"secondary"}
                          onClick={() => remove(index)}
                        >
                          Delete
                        </Button>
                      </li>
                    );
                  })}
                </ul>
                <Button
                  className="mt-2 flex items-center"
                  variant={"default"}
                  type="button"
                  onClick={() => append({ key: "", type_id: 0 })}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Append
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
