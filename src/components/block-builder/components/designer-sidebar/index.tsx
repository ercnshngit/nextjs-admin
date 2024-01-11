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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SidebarComponent from "../sidebar-component";
import SidebarInputFactory from "../sidebar-input-factory";
import ImagePickerInput from "../sidebar-input-factory/components/image-picker-input";
import RichTextEditor from "../sidebar-input-factory/components/rich-text";
import TextInput from "../sidebar-input-factory/components/text-input";

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

  useEffect(() => {
    if (block) {
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
  }, [block, form.reset]);

  const onSubmit = (data: any) => {
    console.log(data);
    setUpdateBlockData({
      title: data.title,
      slug: data.slug,
      description: data.description,
      status: Number(data.status || 0),
      type_id: Number(data.type_id),
      image_url: data.image_url,
      background_image_url: data.background_image_url,
    });
  };

  const title = form.watch("title");

  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  return (
    <div className="bg-white px-4 py-10 h-full min-w-[300px] min-h-screen">
      <div className="flex mb-2 items-center space-x-2">
        <Switch
          id="preview-mode"
          checked={mode === "preview"}
          onCheckedChange={() => {
            setMode((p) => (p === "preview" ? "ui" : "preview"));
          }}
        />
        <Label htmlFor="preview-mode">Preview Mode</Label>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList>
          <TabsTrigger value="components">Component</TabsTrigger>
          <TabsTrigger value="block">Block Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          {selectedElement && (
            <div className="flex flex-col w-full gap-2">
              <h1 className="text-2xl font-bold">Properties</h1>

              {selectedElement.props.map((prop) => {
                if (prop.prop.key === "children") {
                  return <div key={prop.prop.key}>.</div>;
                }
                return (
                  <SidebarInputFactory
                    blockComponent={selectedElement}
                    key={prop.prop.key}
                    blockComponentProp={prop}
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
        </TabsContent>
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
                          key={field.name}
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
                  name={"slug"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <TextInput
                          key={field.name}
                          value={slugify(
                            field.value ? field.value : title || ""
                          )}
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
                          key={field.name}
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
                        <ImagePickerInput
                          key={field.name}
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
                  name={"background_image_url"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translate(field.name)}</FormLabel>
                      <p className="text-xs text-gray-400">{field.name}</p>

                      <FormControl>
                        <ImagePickerInput
                          key={field.name}
                          value={field.value}
                          setValue={field.onChange}
                        />
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
