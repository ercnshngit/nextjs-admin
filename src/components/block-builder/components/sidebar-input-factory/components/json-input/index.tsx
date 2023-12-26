"use client";
import IconSelect from "@/components/icon-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
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
import {
  createComponent,
  createComponentsInBlock,
  getTable,
  getTypes,
} from "@/services/dashboard";
import { TypeDto } from "@/services/dto/type.dto";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusCircle, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { register } from "module";
import { on } from "events";
import { set } from "date-fns";

export default function JsonInput() {
  const { table } = useTable("component");
  const tableName = table?.name || "";
  const { translate } = useTranslate();
  const [additionalFieldsCount, setAdditionalFieldsCount] = useState(0);
  const [textArea, setTextArea] = useState<any>([]);

  const { data: componentTypes } = useQuery<TypeDto[]>(["componentTypes"], () =>
    getTypes("component")
  );
  const { data: propTypes } = useQuery<TypeDto[]>(["propTypes"], () =>
    getTypes("prop")
  );

  const componentMutation = useMutation(
    (data: any) => {
      return createComponent({
        data: data,
      });
    },
    {
      onSuccess: () => {
        toast.success("Bileşen oluşturuldu");
      },
    }
  );

  type JSONArray = {
    array: [string, string][];
  };

  const defaultValues = {
    array: [
      {
        entries: [{ key: "item", value: "sdfdsfs" }],
      },
    ],
  };
  const form = useForm({
    mode: "onChange",
    defaultValues,
  });

  const values = form.watch();

  useEffect(() => {
    setTextArea(JSON.stringify(convertToBeklenen(values.array)));
  }, [values]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "array",
  });

  function convertToBeklenen(deger: any[]): any[] {
    return deger.map((item) => {
      const convertedEntries = item.entries.reduce((acc: any, entry: any) => {
        acc[entry.key] = entry.value;
        return acc;
      }, {});
      return convertedEntries;
    });
  }

  function convertToDeger(beklenen: any[]): any[] {
    return beklenen.map((item) => {
      const convertedEntries = Object.entries(item).map(([key, value]) => ({
        key,
        value,
      }));
      return { entries: convertedEntries };
    });
  }

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between mb-4"></div>

      <div className="flex justify-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <textarea className="border-2" value={textArea} />
            <ul>
              {fields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <button type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                    <NestedArray index={index} form={form} />
                  </li>
                );
              })}
            </ul>
            <Button
              className="mt-2 flex items-center bg-green-500 hover:bg-green-600"
              variant={"default"}
              type="button"
              onClick={() => append({ entries: [] })}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Append
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function NestedArray({ index, form }: { index: number; form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `array.${index}.entries`,
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
                {...form.register(`array.${index}.entries.${k}.key` as const)}
              />
              <input
                className="rounded-md border w-full border-gray-300 p-2"
                {...form.register(`array.${index}.entries.${k}.value` as const)}
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
            key: "item",
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
