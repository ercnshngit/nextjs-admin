import { BlockComponentDto } from "@/services/dto/block_component.dto";
import { PageComponent } from "@/types/page-component";

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

export function createTree(components: BlockComponentDto[]) {
  const map: { [key: string]: BlockComponentDto } = {};

  components.forEach((component) => {
    map[component.code] = { ...component, children: [] };
  });

  function addChildren(component: BlockComponentDto) {
    components.forEach((child) => {
      if (child.belong_block_component_code === component.code) {
        component.children?.push(addChildren({ ...child, children: [] }));
      }
    });
    return component;
  }

  return components
    .filter((component) => !component.belong_block_component_code)
    .map((root) => addChildren(map[root.code]));
}
