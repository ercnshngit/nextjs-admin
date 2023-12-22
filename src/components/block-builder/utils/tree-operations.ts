import { BlockComponentDto } from "@/services/dto/block_component.dto";

export function createChildrenTree(
  component: BlockComponentDto,
  components: BlockComponentDto[]
) {
  const temp: BlockComponentDto = { ...component, children: [] };

  components.forEach((component) => {
    if (component.belong_block_component_code === temp.code) {
      temp.children?.push(component);
    }
  });

  return temp;
}

export function createTree(
  components: BlockComponentDto[]
): BlockComponentDto[] {
  const map: { [key: string]: BlockComponentDto } = {};

  components.forEach((component) => {
    map[component.code] = { ...component, children: [] };
  });

  function addChildren(component: BlockComponentDto) {
    try {
      const componentChildren: BlockComponentDto[] = [];
      components.forEach((child) => {
        if (!component.code) throw new Error("component.code is undefined");
        if (child.belong_block_component_code === component.code) {
          const children = addChildren(map[child.code]);
          if (!children) throw new Error("children is undefined");
          componentChildren.push(children);
        }
      });
      return { ...component, children: componentChildren };
    } catch (e) {
      console.log(e);
      return;
    }
  }

  return components
    .filter((component) => !component.belong_block_component_code)
    .map((root) => addChildren(map[root.code]))
    .filter((e) => e) as BlockComponentDto[];
}

export function createStringFromElements(elements: BlockComponentDto[]) {
  const temp: string[] = elements.map((element) => {
    const props = element.props.reduce((acc, prop) => {
      return (
        prop.prop.key != "children" && { ...acc, [prop.prop.key]: prop.value }
      );
    }, {} as any);
    if (element.belong_block_component_code === null) {
      if (element.hasChildren) {
        console.log("dsfds", element.children);
        return `<${element.component.tag.name} ${Object.entries(props)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ")}>${
          element.children && element.children.length > 0
            ? createStringFromElements(element.children)
            : ""
        }</${element.component.tag.name}>`;
      } else {
        return `<${element.component.tag.name} ${Object.entries(props)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ")} />`;
      }
    } else {
      return "";
    }
  });

  return temp.join("\n");
}

export function createStringFromTree(tree: BlockComponentDto[]) {
  const temp: string[] = tree.map((element) => {
    const props = element.props.reduce((acc, prop) => {
      return (
        prop.prop.key != "children" && { ...acc, [prop.prop.key]: prop.value }
      );
    }, {} as any);
    if (element.children && element.children.length > 0) {
      console.log("çokomelli", createStringFromTree(element.children));
      return `<${element.component.tag.name} ${Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")
        .trimEnd()}>\n${
        element.children && element.children.length > 0
          ? createStringFromTree(element.children)
          : ""
      }\n</${element.component.tag.name}>`;
    } else {
      return `<${element.component.tag.name} ${Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")} />`;
    }
  });

  return temp.join("\n");
}
