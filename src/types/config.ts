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
  icon: string | null;
  is_hidden: boolean | null;
  can_create: boolean | null;
  can_update: boolean | null;
  columns: Column[];
};

export interface Column {
  id: number;
  name: string;
  is_primary: boolean;
  is_required: boolean;
  is_unique: boolean;
  is_hidden: boolean;
  is_filterable: boolean;
  is_searchable: boolean;
  is_sortable: boolean;
  create_crud_option_id?: CrudOptionDto;
  update_crud_option_id?: CrudOptionDto;
  read_crud_option_id?: CrudOptionDto;
  type: Type;
  input_type: InputType;
  create_crud_option: CrudOption;
  read_crud_option: CrudOption;
  update_crud_option: CrudOption;
  relation: any;
  options?: Option[];
}

export type Option = {
  label: string;
  value: string;
};

export interface Type {
  id: number;
  name: string;
  type_id: number;
}

export interface InputType {
  id: number;
  name: string;
  type_id: number;
}

export interface CrudOption {
  id: number;
  is_hidden: boolean;
  is_required: boolean;
  is_readonly: boolean;
  input_type: null | DataTypeDto;
}

export interface DataTypeDto {
  id: number;
  name: string;
  type_id: number;
}
