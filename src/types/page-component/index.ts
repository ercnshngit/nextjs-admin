export interface PageComponent {
  code: string;
  block_id: number;
  component: {
    id: number;
    name: string;
    tag: string;
    icon: string;
    tag_id: number;
    type_id: number;
  };
  hasChildren?: boolean;
  type: Type;
  depth: number;
  order: number;
  belong_component_id: string | null;
  props: ComponentProp[];
  children?: PageComponent[];
}
export interface Component {
  id: number;
  name: string;
  tag: {
    id: number;
    name: string;
  };
  types: Type;
  component_prop: {
    id: number;
    prop: Prop;
  }[];
  hasChildren?: boolean;
  icon: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface ComponentProp {
  prop: Prop;
  value: string;
}

export interface Prop {
  id: number;
  key: string;
  type: string;
  type_id: number;
}
