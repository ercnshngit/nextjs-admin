export interface PageComponent {
  code: string;
  block_id: number;
  component: {
    id: number;
    name: string;
    tag: string;
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
  tag: string;
  type: Type;
  props: Prop[];
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
}
