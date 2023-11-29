import { PageComponent } from "@/types/page-component";

export function createChildrenTree(
  component: PageComponent,
  components: PageComponent[]
) {
  const temp: PageComponent = { ...component, children: [] };

  components.forEach((component) => {
    if (component.belong_component_id === temp.id) {
      temp.children?.push(component);
    }
  });

  return temp;
}

export function createTree(components: PageComponent[]) {
  const map: { [key: number]: PageComponent } = {};

  components.forEach((component) => {
    map[component.id] = { ...component, children: [] };
  });

  function addChildren(component: PageComponent) {
    components.forEach((child) => {
      if (child.belong_component_id === component.id) {
        component.children?.push(addChildren({ ...child, children: [] }));
      }
    });
    return component;
  }

  return components
    .filter((component) => !component.belong_component_id)
    .map((root) => addChildren(map[root.id]));
}
