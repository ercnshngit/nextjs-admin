export type INPUT_TYPE =
  | "hidden"
  | "image"
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "relation"
  | "multi-select"
  | "date"
  | "richtext";

export type Database_Table = {
  id: number;
  name: string;
  icon: string;
  is_hidden: boolean;
  can_create: boolean;
  can_update: boolean;
  columns: Column[];
};

export interface Column {
  id: number;
  name: string;
  table_id: number;
  type_id: number;
  is_primary: boolean;
  is_required: boolean;
  is_unique: boolean;
  is_hidden: boolean;
  is_filterable: boolean;
  is_searchable: boolean;
  is_sortable: boolean;
  input_type_id: number;
  create_crud_option_id: any;
  update_crud_option_id: any;
  read_crud_option_id: any;
  type: Type;
  input_type: InputType;
  create_crud_option: any;
  read_crud_option: any;
  update_crud_option: any;
}

export interface Type {
  id: number;
  name: string;
  type_category_id: number;
}

export interface InputType {
  id: number;
  name: string;
  type_category_id: number;
}
