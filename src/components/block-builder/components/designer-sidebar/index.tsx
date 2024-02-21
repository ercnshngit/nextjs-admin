import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDesigner } from "@/contexts/designer-context";
import { useTranslate } from "@/langs";
import {
  getBlockComponentsBySlug,
  getComponents,
  getTable,
  getTypes,
} from "@/services/dashboard";
import { ComponentDto } from "@/services/dto/component.dto";
import { TypeDto } from "@/services/dto/type.dto";
import { slugify } from "@/utils/slugify";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SidebarComponent from "../sidebar-component";
import SidebarInputFactory from "../sidebar-input-factory";
import ImagePickerInput from "../sidebar-input-factory/components/image-picker-input";
import RichTextEditor from "../sidebar-input-factory/components/rich-text";
import TextInput from "../sidebar-input-factory/components/text-input";
import Loading from "@/components/loading";
import useSearchParams from "@/hooks/use-search-params";
import BlocksDropdown from "../blocks-dropdown";
import { BlockDto } from "@/services/dto/block.dto";

export default function DesignerSidebar({ dragDrop }: { dragDrop: boolean }) {
  const { data: sidebarComponents } = useQuery<ComponentDto[]>(
    ["components"],
    () => getComponents()
  );
  const { block, selectedElement, setUpdateBlockData, addElement, elements } =
    useDesigner();

  const { data: blockTypes } = useQuery<TypeDto[]>(["blockTypes"], () =>
    getTypes("block")
  );

  const { translate } = useTranslate();

  const form = useForm();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (block) {
      console.log(block);
      form.reset({
        status: block.status || 1,
        title: block.title,
        slug: block.slug,
        description: block.description,
        type_id: block.type_id || searchParams.getQueryString("type_id") || 0,
        image_url: block.image_url,
        background_image_url: block.background_image_url || "",
      });
    }
  }, [block, form.reset, form]);

  const onSubmit = (data: any) => {
    setUpdateBlockData({
      id: block?.id || 0,
      title: data.title || "İsimsiz",
      slug: data.slug || "isimsiz",
      description: data.description || "",
      status: Number(data.status || 1),
      type_id: Number(
        data.type_id || searchParams.getQueryString("type_id") || 0
      ),
      image_url: data.image_url || "",
      background_image_url: data.background_image_url || "",
    });
  };

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  const [tab, setTab] = useState<"components" | "block">("block");

  useEffect(() => {
    if (selectedElement && dragDrop) {
      setTab("components");
    } else {
      setTab("block");
    }
  }, [selectedElement]);

  const onTabChange = (value: string) => {
    setTab(value as any);
  };

  const { data: blocks } = useQuery<BlockDto[]>(["blocks"], () =>
    getTable({
      tableName: "block",
    })
  );
  const [selectedForCopyBlockSlug, setSelectedForCopyBlockSlug] =
    useState<string>("");

  const handleCopyBlock = async (value: string) => {
    const allComponentsOfBlock = await getBlockComponentsBySlug(value);
    //change block component codes
    const newCodes: { oldCode: string; newCode: string }[] = [];
    allComponentsOfBlock.forEach((component) => {
      if (component.belong_block_component_code === null) {
        const newElement = {
          ...component,
          code: crypto.randomUUID(),
          block: {
            id: 0,
            title: "deneme block",
            type_id: 1,
          },
        };
        newCodes.push({ oldCode: component.code, newCode: newElement.code });

        addElement(elements.length, newElement);
      }
    });
    allComponentsOfBlock.forEach((component) => {
      if (component.belong_block_component_code !== null) {
        const newElement = {
          ...component,
          code:
            newCodes.find(
              (c) => c.oldCode === component.belong_block_component_code
            )?.newCode || crypto.randomUUID(),
          block: {
            id: 0,
            title: "deneme block",
            type_id: 1,
          },
        };
        newCodes.push({ oldCode: component.code, newCode: newElement.code });

        addElement(0, newElement);
      }
    });
  };

  return (
    <div className=" min-h-screen h-full w-full bg-white px-4 py-10">
      <Tabs
        value={tab}
        onValueChange={onTabChange}
        defaultValue={"block"}
        className="w-full"
      >
        <TabsList>
          {dragDrop && <TabsTrigger value="components">Component</TabsTrigger>}
          <TabsTrigger value="block">Block Settings</TabsTrigger>
        </TabsList>
        {dragDrop && (
          <TabsContent value="components">
            <div className="mb-4">
              <BlocksDropdown
                value={selectedForCopyBlockSlug}
                setValue={(value) => handleCopyBlock(value)}
                blocks={
                  blocks?.map((block) => ({
                    label: block.title,
                    value: block.slug || "",
                  })) || []
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sidebarComponents &&
                sidebarComponents?.map((component) => {
                  return (
                    <SidebarComponent
                      component={component}
                      key={component.id}
                    />
                  );
                })}
            </div>
          </TabsContent>
        )}
        <TabsContent value="block">
          <div className="flex flex-col w-full gap-2">
            <h1 className="text-2xl font-bold">Properties</h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name={"title"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <TextInput
                          propKey={field.name}
                          value={field.value}
                          setValue={(value: string) => {
                            field.onChange(value);
                            form.setValue("slug", slugify(value));
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"slug"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <TextInput
                          propKey={field.name}
                          value={slugify(field.value ? field.value : "")}
                          setValue={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"description"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <RichTextEditor
                          propKey={field.name}
                          value={field.value}
                          setValue={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"status"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(field.value || 1)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={String(0)}>Draft</SelectItem>
                          <SelectItem value={String(1)}>Publish</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"type_id"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={String(
                          field.value ||
                            searchParams.getQueryString("type_id") ||
                            1
                        )}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {blockTypes?.map((item) => (
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

                <FormField
                  control={form.control}
                  name={"image_url"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <Suspense key={field.name} fallback={<Loading />}>
                          <ImagePickerInput
                            propKey={field.name}
                            value={field.value}
                            setValue={field.onChange}
                          />
                        </Suspense>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={"background_image_url"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <Suspense key={field.name} fallback={<Loading />}>
                          <ImagePickerInput
                            propKey={field.name}
                            value={field.value}
                            setValue={field.onChange}
                          />
                        </Suspense>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
