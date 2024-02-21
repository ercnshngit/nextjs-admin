export type ComponentTagsType = {
  [key: string]: any;
};

export interface BlockComponentDto {
  component: ComponentDto;
  block: BlockDto;
  belong_block_component_code: string | null;
  depth: number;
  order: number;
  code: string;
  hasChildren?: boolean;
  props: ComponentPropDto[];
  children?: BlockComponentDto[];
}

export interface ComponentPropDto {
  prop: {
    id: number;
    key: string;
    type: TypeDto;
  };
  value: string;
}

export interface ComponentDto {
  id: number;
  name: string;
  tag: TagDto;
  type: TypeDto;
  icon?: string;
  props: PropDto[];
}

export interface TagDto {
  id: number;
  name: string;
}

export interface TypeDto {
  id: number;
  name: string;
  table_id?: number;
  language_code?: string;
}

export interface BlockComponentPropDto {
  prop: {
    id: number;
    key: string;
    type: TypeDto;
  };
  value: string;
}

export interface PropDto {
  id: number;
  key: string;
  type: TypeDto;
}
export interface BlockDto {
  id: number;
  title: string;
  type_id: number;
  description?: string;
  image_url?: string;
  background_image_url?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  status?: number;
}
