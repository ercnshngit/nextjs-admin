import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { ComponentDto } from "@/services/dto/component.dto";
import { LogService } from "@/services/log.service";

export function transformInput({
  input,
  code,
  depth,
  order,
  components,
}: {
  input: [string, { [key: string]: any }];
  code?: string;
  depth?: number;
  order?: number;
  components: ComponentDto[];
}) {
  const [componentName, props, ...children] = input;
  const temp: BlockComponentDto[] = [];
  const newCode = crypto.randomUUID();
  const newdepth = typeof depth === "number" ? depth + 1 : 0;
  const neworder = typeof order === "number" ? order + 1 : 0;

  const existingComponent = components.find(
    (component) => component.tag.name === componentName
  ) || {
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
        .filter((child) => !Array.isArray(child))
        .filter((child) => child !== " " && child !== "" && child !== "\n")
        .map((child) => {
          return {
            id: 37,
            key: "value",
            type: {
              id: 5,
              name: "string",
            },
          };
        }),
    ],
  };

  const existingComponentProps = existingComponent.props;

  const transformedOutput: BlockComponentDto = {
    component: existingComponent,
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
        const prop = existingComponentProps.find((prop) => prop.key === key);

        const existingProp = prop
          ? {
              ...prop,
              type_id: prop.type.id,
              type: {
                id: prop.type.id,
                name: prop.type.name,
              },
            }
          : {
              id: 0,
              key: key,
              type: {
                // TODO: Burası saçma bi bak
                id: 0,
                name: "string",
              },
            };
        return {
          id: 0,
          prop: existingProp,
          value: value || "",
        };
      }),
      ...children
        .filter((child) => !Array.isArray(child))
        .filter((child) => child !== " " && child !== "" && child !== "\n")
        .map((child) => {
          return {
            id: 0,
            prop: {
              id: 37,
              key: "value", // TODO: Burası saçma
              type: {
                id: 0,
                name: "string",
              },
            },
            value: child,
          };
        }),
    ],
  };
  temp.push(transformedOutput);
  Array.isArray(children) &&
    children.forEach((child) => {
      if (child === " " || child === "" || child === "\n") return;
      Array.isArray(child)
        ? temp.push(
            ...transformInput({
              components: components,
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

export function transformToDesiredFormat(
  jsxtext: any,
  components: ComponentDto[]
) {
  const jsxToJson = require("simplified-jsx-to-json");
  try {
    const input = jsxToJson(jsxtext);
    console.log("input", input);
    const desiredOutput = input
      .map((e: any) => transformInput({ input: e, components: components }))
      .flat();
    console.log("hi", desiredOutput);

    return desiredOutput;
  } catch (e) {
    const logService = new LogService();
    logService.createLog({ e });
    return { error: e };
  }
}
