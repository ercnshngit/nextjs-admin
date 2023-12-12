import { BlockComponentDto } from "@/services/dto/block_component.dto";

export function transformInput({
  input,
  code,
  depth,
  order,
}: {
  input: [string, { [key: string]: any }];
  code?: string;
  depth?: number;
  order?: number;
}) {
  const [componentName, props, ...children] = input;
  const temp: BlockComponentDto[] = [];
  const newCode = crypto.randomUUID();
  const newdepth = depth ? depth + 1 : 0;
  const neworder = order ? order + 1 : 0;

  const transformedOutput: BlockComponentDto = {
    component: {
      id: 0,
      name: componentName,
      type: {
        id: 3,
        name: "PageElement",
      },
      tag: {
        id: 0,
        name: componentName,
      },
      props:
        Object.entries(props).length > 0
          ? Object.entries(props).map(([key, value]) => ({
              id: 32,
              key,
              type: {
                id: 5,
                name: "string",
              },
            }))
          : [],
    },
    block: {
      id: 5,
      title: "Deneme sdfdsfdsfSayfa",
      type_id: 10,
    },
    depth: newdepth,
    order: neworder,
    code: newCode,
    belong_block_component_code: !code ? null : code,
    hasChildren: children.length > 0,
    props: [
      {
        prop: {
          id: 37,
          key: "value",
          type_id: 5,
        },
        value: children.map((child) => !Array.isArray(child) && child).join(""),
      },
    ],
    children: [],
  };
  temp.push(transformedOutput);
  Array.isArray(children) &&
    children.forEach((child) => {
      if (child === " " || child === "" || child === "\n") return;
      Array.isArray(child)
        ? temp.push(
            ...transformInput({
              input: child,
              code: newCode,
              depth: newdepth,
              order: neworder,
            })
          )
        : null;
    });
  return temp.flat();
}

export function transformToDesiredFormat(jsxtext: any) {
  const jsxToJson = require("simplified-jsx-to-json");
  try {
    const input = jsxToJson(jsxtext);
    console.log("input", input);
    const desiredOutput = input
      .map((e: any) => transformInput({ input: e }))
      .flat();
    console.log("hi", desiredOutput);

    return desiredOutput;
  } catch (e) {
    return { error: e };
  }
}
