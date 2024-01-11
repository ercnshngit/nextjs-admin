import { ComponentService } from "@/services/component.service";
import cors from "@/utils/cors";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import zodToJsonSchema from "zod-to-json-schema";
const dir = path.resolve(
  process.cwd() + "/src/components/block-builder/block-renderer/components/tags"
);
export async function POST(req: NextRequest) {
  const componentService = new ComponentService(req.nextUrl.pathname);

  try {
    const filenames = await fs.readdir(dir);

    const files = filenames.map((name) => name);

    const components = await getData(filenames);

    components?.forEach(async (component) => {
      console.log(component.name);
      console.log(component.componentPropsTypes.definitions);
      console.log(component.componentPropsTypes.definitions.componentPropTypes);
      console.log(typeof component.componentPropsTypes.definitions);
      const data = {
        id: 0,
        name: component.displayName || component.name,
        tag: {
          id: 0,
          name: component.name,
        },
        type: {
          id: 0,
          name: component.typeName || "Page Component",
        },
        icon: component.iconName || "",
        props: Object.entries(
          component.componentPropsTypes.definitions.componentPropTypes
            ?.properties
        ).map((i) => {
          console.log(i);
          return {
            prop: {
              id: 0,
              key: (i as [string, { type: string }])[0],
              type: {
                id: 0,
                name:
                  (i as [string, { type: string }])[0] === "children"
                    ? "children"
                    : (i as [string, { type: string }])[1].type || "string",
              },
            },
            value: "",
          };
        }),
      };

      const result = await componentService.createComponent(data);
    });

    const res = new Response(
      JSON.stringify({
        status: "success",
        data: {
          files: JSON.stringify(files),
          components: components,
        },
      }),
      { status: 200 }
    );

    return cors(req, res);
  } catch (error) {
    await componentService.createLog({ error });
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}

const getData = async (filenames: string[]) => {
  try {
    const components = [];
    for (const file of filenames) {
      console.log(file);
      if (!file) throw new Error("File not found");
      const componentModule = await import(
        "../../../../components/block-builder/block-renderer/components/tags/" +
          file
      );
      const Component = componentModule.default;

      components.push({
        name: file,
        displayName: Component.displayName,
        iconName: Component.iconName,
        typeName: Component.typeName,
        defaultProps: Component.defaultProps,
        componentPropsTypes: zodToJsonSchema(
          componentModule.propsSchema,
          "componentPropTypes"
        ) as {
          definitions: {
            componentPropTypes: {
              properties: { [key: string]: { type: string } };
            };
          };
        },
      });
    }
    return components;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
