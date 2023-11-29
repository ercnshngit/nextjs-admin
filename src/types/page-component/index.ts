export interface PageComponent {
  id: number;
  block_id: number;
  name: string;
  tag: string;
  hasChildren?: boolean;
  type: Type;
  depth: number;
  order: number;
  belong_component_id: number | null;
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
}
