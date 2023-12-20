"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslate } from "@/langs";
import { useTable } from "@/hooks/use-database";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { getTable } from "@/services/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { TypeDto } from "@/services/dto/type.dto";

export default function AddComponentPage() {
  const { table } = useTable("component");
  const tableName = table?.name || "";
  const { translate } = useTranslate();

  const { data: componentTypes } = useQuery<TypeDto[]>(["componentTypes"], () =>
    getTable({ tableName: "type" })
  );

  const initialValues = {
    name: "",
    tag: {
      name: "",
    },
    type_id: 0,
    icon: "",
    props: [
      {
        key: "",
        type_id: 0,
      },
    ],
  };

  const form = useForm({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "props",
  });

  const onSubmit = (data: typeof initialValues) => console.log("data", data);

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <FormField
                        control={form.control}
                        name={`props.${index}.key`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {componentTypes?.map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={String(item.id)}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              You can manage email addresses in your{" "}
                              <Link href="/examples/forms">email settings</Link>
                              .
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <button type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => append({ key: "", type_id: 0 })}
              >
                append
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
