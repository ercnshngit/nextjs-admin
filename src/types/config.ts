import { tableNames } from "@/config/general";

export type OPTION = {
  label: string;
  value: string;
  icon?: any;
};

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

type CRUD_OPTIONS = {
  hidden?: boolean;
  required?: boolean;
  readonly?: boolean;
  inputType?: INPUT_TYPE;
};

export type COLUMN_RELATION<T> = {
  table: T;
  keyColumn: string;
  displayColumn: string;
  type?: "one" | "many";
  pivotTable?: string;
  pivotTableKeyColumn?: string;
  pivotTableForeignKeyColumn?: string;
  pivotTableExtraColumns?: DATABASE_TABLE_COLUMN<T>[];
};

export type DATABASE_TABLE_COLUMN<T> = {
  name: string;
  type: "string" | "number";
  default?: any;
  filterable?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  options?: OPTION[];
  hidden?: boolean;
  required?: boolean;
  inputType?: INPUT_TYPE;
  create?: CRUD_OPTIONS;
  update?: CRUD_OPTIONS;
  read?: CRUD_OPTIONS;
  relation?: COLUMN_RELATION<T>;
};

export type DATABASE_TABLE_DYNAMIC<T> = {
  name: T;
  Icon?: any;
  hidden?: boolean;
  canCreate?: boolean;
  canUpdate?: boolean;
  columns: DATABASE_TABLE_COLUMN<T>[];
};
