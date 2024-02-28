"use client";
import { jsonParse } from "@/block-renderer/utils/json-parse";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

export default function JsonInput({
  propKey,
  value,
  setValue,
  ...rest
}: {
  propKey: string;
  value: any;
  setValue: any;
}) {
  const defaultValues = {
    array: value ? convertToDeger(jsonParse<typeof value>(value)) : [],
  };
  const form = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "array",
  });

  function convertToBeklenen(deger: any[]) {
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

  return (
    <div className="w-full">
      <input
        className="rounded-md border w-full border-gray-300 p-2"
        type="text"
        id={propKey}
        value={value}
        onChange={(e) => {}}
        {...rest}
      />

      <div className="flex justify-center ">
        <Form {...form}>
          <form className="flex flex-col gap-2">
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
              onClick={() => {
                setValue(
                  JSON.stringify(convertToBeklenen(form.getValues().array))
                );
                append({
                  entries: [
                    {
                      key: "",
                      value: "",
                    },
                  ],
                });
              }}
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
              className="gap-2"
              style={{
                display: "flex",
                marginLeft: 10,
              }}
            >
              <input
                className="rounded-md border w-full border-gray-300 px-2 py-1"
                {...form.register(`array.${index}.entries.${k}.key` as const)}
              />
              <input
                className="rounded-md border w-full border-gray-300 px-2 py-1"
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
