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
      name: componentName,
      tag: {
        id: 0,
        name: componentName,
      },
      id: 0,
      type: {
        id: 3,
        name: "Page Component",
      },
      props: [
        ...Object.entries(props).map(([key, value]) => {
          return {
            id: 0,
            key: key,
            type: {
              id: 5,
              name: "string",
            },
          };
        }),
        ...children
          .map((child) => {
            if (child === " " || child === "" || child === "\n") return null;
            if (!Array.isArray(child)) {
              return {
                id: 37,
                key: "value",
                type: {
                  id: 5,
                  name: "string",
                },
              };
            } else {
              return null;
            }
          })
          .filter((e) => e),
      ],
    },
    block: {
      id: 0,
      title: "Page",
      type_id: 1,
    },
    belong_block_component_code: code || null,
    depth: newdepth,
    order: neworder,
    code: newCode,
    hasChildren: Array.isArray(children) && children.length > 0,
    props: [
      ...Object.entries(props).map(([key, value]) => {
        return {
          id: 0,
          prop: {
            id: 0,
            key: key,
            type: {
              id: 5,
              name: "string",
            },
          },
          value: value,
        };
      }),
      ...children
        .map((child) => {
          if (child === " " || child === "" || child === "\n") return null;
          if (!Array.isArray(child)) {
            return {
              id: 0,
              prop: {
                id: 37,
                key: "value",
                type: {
                  id: 5,
                  name: "string",
                },
              },
              value: child,
            };
          } else {
            return null;
          }
        })
        .filter((e) => e),
    ],
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
