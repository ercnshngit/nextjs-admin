export interface Component {
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
  children?: Component[];
}

export interface Type {
  id: number;
  name: string;
}

export interface ComponentProp {
  id: number;
  prop: Prop;
  value: string;
}

export interface Prop {
  id: number;
  key: string;
}
