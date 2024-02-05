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
import { getComponents, getTypes } from "@/services/dashboard";
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

export default function DesignerSidebar() {
  const { data: sidebarComponents } = useQuery<ComponentDto[]>(
    ["components"],
    () => getComponents()
  );
  const {
    block,
    selectedElement,
    mode,
    setMode,
    updateElement,
    setUpdateBlockData,
  } = useDesigner();

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
        type_id: block.type_id || searchParams.getQueryString("type_id"),
        image_url: block.image_url,
        background_image_url: block.background_image_url,
      });
    }
    console.log("block yok");
  }, [block, form.reset, searchParams, form]);

  const onSubmit = (data: any) => {
    setUpdateBlockData({
      id: 0,
      title: data.title || "İsimsiz",
      slug: data.slug || "isimsiz",
      description: data.description || "",
      status: Number(data.status || 0),
      type_id: Number(data.type_id || 0),
      image_url: data.image_url || "",
      background_image_url: data.background_image_url || "",
    });
  };

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  return (
    <div className="h-full min-h-screen min-w-[300px] bg-white px-4 py-10">
      <div className="mb-2 flex items-center space-x-2">
        <Switch
          id="preview-mode"
          checked={mode === "preview"}
          onCheckedChange={() => {
            setMode((p) => (p === "preview" ? "ui" : "preview"));
          }}
        />
        <Label htmlFor="preview-mode">Preview Mode</Label>
      </div>

      <Tabs defaultValue={"block"} className="w-full">
        <TabsList>
          {/* <TabsTrigger value="components">Component</TabsTrigger> */}
          <TabsTrigger value="block">Block Settings</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="components">
          {selectedElement && (
            <div className="flex w-full flex-col gap-2">
              <h1 className="text-2xl font-bold">Properties</h1>

              {selectedElement.props.map((prop) => {
                if (prop.prop.key === "children") {
                  return <div key={prop.prop.key}>.</div>;
                }
                return (
                  <Suspense key={prop.prop.key} fallback={<Loading />}>
                    <SidebarInputFactory
                      propKey={prop.prop.key}
                      typeName={prop.prop.type.name}
                      key={prop.prop.key}
                      setValue={(value: string) =>
                        updateElement(selectedElement.code, {
                          ...selectedElement,
                          props: selectedElement.props.map((p) => {
                            if (p.prop.key === prop.prop.key) {
                              return {
                                ...p,
                                value: value,
                              };
                            }
                            return p;
                          }),
                        })
                      }
                      value={prop.value}
                    />
                  </Suspense>
                );
              })}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {!selectedElement &&
              sidebarComponents?.map((component) => {
                return (
                  <SidebarComponent component={component} key={component.id} />
                );
              })}
          </div>
        </TabsContent> */}
        <TabsContent value="block">
          <div className="flex w-full flex-col gap-2">
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

export function DesignerSidebarWithoutDnd() {
  const {
    block,
    selectedElement,
    mode,
    setMode,
    updateElement,
    setUpdateBlockData,
  } = useDesigner();

  const { data: blockTypes } = useQuery<TypeDto[]>(["blockTypes"], () =>
    getTypes("block")
  );

  const { translate } = useTranslate();

  const form = useForm();

  useEffect(() => {
    if (block) {
      console.log(block);
      form.reset({
        status: block.status,
        title: block.title,
        slug: block.slug,
        description: block.description,
        type_id: block.type_id,
        image_url: block.image_url,
        background_image_url: block.background_image_url,
      });
    }
    console.log("block yok");
  }, [block, form.reset]);

  const onSubmit = (data: any) => {
    setUpdateBlockData({
      id: block?.id || 0,
      title: data.title || "İsimsiz",
      slug: data.slug || "isimsiz",
      description: data.description || "",
      status: Number(data.status || 0),
      type_id: Number(data.type_id || 0),
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
    if (selectedElement) {
      setTab("components");
    } else {
      setTab("block");
    }
  }, [selectedElement]);

  const onTabChange = (value: string) => {
    setTab(value as any);
  };

  return (
    <div className="h-full min-h-screen min-w-[300px] bg-white px-4 py-10">
      <div className="mb-2 flex items-center space-x-2">
        <Switch
          id="preview-mode"
          checked={mode === "preview"}
          onCheckedChange={() => {
            setMode((p) => (p === "preview" ? "ui" : "preview"));
          }}
        />
        <Label htmlFor="preview-mode">Preview Mode</Label>
      </div>

      <Tabs
        value={tab}
        onValueChange={onTabChange}
        defaultValue={"block"}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="components">Component</TabsTrigger>
          <TabsTrigger value="block">Block Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          {selectedElement && (
            <div className="flex w-full flex-col gap-2">
              <h1 className="text-2xl font-bold">Properties</h1>

              {selectedElement.props.map((prop) => {
                if (prop.prop.key === "children") {
                  return <div key={prop.prop.key}>.</div>;
                }
                return (
                  <Suspense key={prop.prop.key} fallback={<Loading />}>
                    <SidebarInputFactory
                      propKey={prop.prop.key}
                      typeName={prop.prop.type.name}
                      key={prop.prop.key}
                      setValue={(value: string) =>
                        updateElement(selectedElement.code, {
                          ...selectedElement,
                          props: selectedElement.props.map((p) => {
                            if (p.prop.key === prop.prop.key) {
                              return {
                                ...p,
                                value: value,
                              };
                            }
                            return p;
                          }),
                        })
                      }
                      value={prop.value}
                    />
                  </Suspense>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="block">
          <div className="flex w-full flex-col gap-2">
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
                        defaultValue={String(field.value)}
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
                        defaultValue={String(field.value)}
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
