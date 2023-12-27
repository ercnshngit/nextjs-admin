import cors from "@/utils/cors";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import React from "react";

export async function GET(req: NextRequest) {
  try {
    const dir = path.resolve(
      process.cwd() +
        "/src/components/block-builder/block-renderer/components/tags"
    );
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
      const Component2 = (
        await import(
          "../../../components/block-builder/block-renderer/components/tags/" +
            file
        )
      ).default;

      const staticComponent = React.createElement(Component2, {
        title: "sadfdsf",
      });

      const htmlRendered = ReactDOMServer.renderToStaticMarkup(staticComponent);

      console.log(file);
      components.push({
        name: file,
        renderString: htmlRendered,

        displayName: Component2.displayName || "yok",
        propTypes: Component2.propTypes || "yok",
        constextTypes: Component2.contextTypes || "yok",
        defaultProps: Component2.defaultProps || "yok",
      });
    }

    return components;
  } catch (err) {
    console.log(err);
    return err;
  }
};
