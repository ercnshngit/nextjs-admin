import { PageComponent } from "@/types/page-component";

export function createChildrenTree(
  component: PageComponent,
  components: PageComponent[]
) {
  const temp: PageComponent = { ...component, children: [] };

  components.forEach((component) => {
    if (component.belong_component_id === temp.code) {
      temp.children?.push(component);
    }
  });

  return temp;
}

export function createTree(components: PageComponent[]) {
  const map: { [key: string]: PageComponent } = {};

  components.forEach((component) => {
    map[component.code] = { ...component, children: [] };
  });

  function addChildren(component: PageComponent) {
    components.forEach((child) => {
      if (child.belong_component_id === component.code) {
        component.children?.push(addChildren({ ...child, children: [] }));
      }
    });
    return component;
  }

  return components
    .filter((component) => !component.belong_component_id)
    .map((root) => addChildren(map[root.code]));
}
