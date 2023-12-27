import cors from "@/utils/cors";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import React from "react";
import { ComponentProps } from "react";
import zodToJsonSchema from "zod-to-json-schema";
const dir = path.resolve(
  process.cwd() + "/src/components/block-builder/block-renderer/components/tags"
);
export async function GET(req: NextRequest) {
  try {
    const filenames = await fs.readdir(dir);

    const files = filenames.map((name) => name);

    const components = await getData(filenames);

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
    console.log(error);
    const res = new Response(
      JSON.stringify({ status: "error", message: JSON.stringify(error) }),
      { status: 500 }
    );
    return cors(req, res);
  }
}

const getData = async (filenames: string[]) => {
  try {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const components = [];
    for (const file of filenames) {
      if (file === "slider-") {
      } else {
        const componentModule = await import(
          "../../../components/block-builder/block-renderer/components/tags/" +
            file
        );
        const Component = componentModule.default;

        const staticComponent = React.createElement(Component, {
          title: "sadfdsf",
        });

        const htmlRendered =
          ReactDOMServer.renderToStaticMarkup(staticComponent);

        components.push({
          name: file,
          renderString: htmlRendered,
          componentPropsTypes: zodToJsonSchema(
            componentModule.propsSchema,
            "componentPropTypes"
          ),
        });
      }
    }
    return components;
  } catch (err) {
    console.log(err);
    return err;
  }
};
