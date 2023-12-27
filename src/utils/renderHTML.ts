"use client";

import React from "react";

export const getData = async (filenames: string[]) => {
  try {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const components = [];
    for (const file of filenames) {
      const Component2 = await import(
        "../../../components/block-builder/block-renderer/components/tags/" +
          file
      );

      const staticComponent = React.createElement(Component2.default, {
        title: "sadfdsf",
      });

      const htmlRendered = ReactDOMServer.renderToStaticMarkup(staticComponent);

      console.log(htmlRendered);
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
