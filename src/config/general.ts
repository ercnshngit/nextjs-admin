import { DATABASE_TABLE_DYNAMIC } from "@/types/config";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdSettingsInputComponent } from "react-icons/md";
import { DATABASE_TABLE_COLUMN as DATABASE_TABLE_COLUMN_DYNAMIC } from "@/types/config";
export const IMAGE_URL = process.env.NEXT_PUBLIC_FILE_URL || "";

export const tableNames = [
  "page",
  "component",
  "component_type",
  "page_component",
  "page_config",
  "generals",
  "menu",
  "menu_type",
  "language",
  "config",
] as const;

export type DATABASE_TABLE = DATABASE_TABLE_DYNAMIC<
  (typeof tableNames)[number]
>;
export type DATABASE_TABLE_COLUMN = DATABASE_TABLE_COLUMN_DYNAMIC<
  (typeof tableNames)[number]
>;

export const DATABASE_TABLES: DATABASE_TABLE[] = [
  {
    name: "page_config",
    hidden: true,
    columns: [
      {
        name: "id",
        type: "number",
        hidden: true,
        read: { hidden: false },
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "css",
        type: "string",
        inputType: "textarea",
      },
    ],
  },
  {
    name: "component_type",
    hidden: true,
    columns: [
      {
        name: "id",
        type: "number",
        hidden: true,
        read: { hidden: false },
      },
      {
        name: "name",
        type: "string",
      },
    ],
  },
  {
    name: "component",
    hidden: true,
    columns: [
      {
        name: "id",
        type: "number",
        hidden: true,
        read: { hidden: false },
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "type_id",
        type: "number",
        inputType: "relation",
        read: {
          inputType: "select",
        },
        create: { inputType: "select" },
        update: { inputType: "select" },
        relation: {
          table: "component_type",
          keyColumn: "id",
          displayColumn: "name",
          type: "one",
        },
      },
    ],
  },
  {
    name: "page_component",
    hidden: true,
    columns: [
      {
        name: "id",
        type: "number",
        hidden: true,
      },

      {
        name: "page_id",
        type: "number",
        hidden: true,
        relation: {
          table: "page",
          keyColumn: "id",
          displayColumn: "title",
          type: "one",
        },
      },
      {
        name: "component_id",
        type: "number",
        hidden: true,
        relation: {
          table: "component",
          keyColumn: "id",
          displayColumn: "title",
          type: "one",
        },
      },
      {
        name: "value",
        type: "string",
      },
      {
        name: "index",
        type: "number",
      },
    ],
  },
  {
    name: "menu_type",
    Icon: BsFillMenuButtonFill,
    columns: [
      {
        name: "id",
        type: "number",
        update: { hidden: true },
        create: { hidden: true },
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "slug",
        type: "string",
      },
      {
        name: "language_code",
        type: "string",
        inputType: "relation",
        update: { inputType: "select" },
        create: { inputType: "select" },
        relation: {
          table: "language",
          keyColumn: "code",
          displayColumn: "name",
          type: "one",
        },
      },
    ],
  },
  {
    name: "language",
    columns: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "code",
        type: "string",
      },
    ],
  },
  {
    name: "page",
    Icon: HiOutlineDocumentDuplicate,

    columns: [
      {
        name: "id",
        type: "number",
        update: { hidden: true },
        create: { hidden: true },
      },
      {
        name: "title",
        type: "string",
        searchable: true,
      },
      {
        name: "description",
        type: "string",
        inputType: "textarea",
      },
      {
        name: "image",
        type: "string",
        inputType: "text",
      },
      {
        name: "slug",
        type: "string",
      },
      {
        name: "language_code",
        type: "string",
        inputType: "relation",
        update: { inputType: "select" },
        create: { inputType: "select" },
        relation: {
          table: "language",
          keyColumn: "code",
          displayColumn: "name",
          type: "one",
        },
        filterable: true,
      },
      {
        name: "content",
        type: "string",
        inputType: "relation",
        read: {
          inputType: "multi-select",
        },
        relation: {
          table: "component",
          keyColumn: "id",
          displayColumn: "title",
          type: "many",
          pivotTable: "page_component",
          pivotTableKeyColumn: "page_id",
          pivotTableForeignKeyColumn: "component_id",
          pivotTableExtraColumns: [
            {
              name: "value",
              type: "string",
            },
            {
              name: "index",
              type: "number",
            },
          ],
        },
      },
      {
        name: "config_id",
        type: "number",
        inputType: "relation",
        read: {
          inputType: "select",
        },
        create: { inputType: "select" },
        update: { inputType: "select" },
        relation: {
          table: "page_config",
          keyColumn: "id",
          displayColumn: "title",
          type: "one",
        },
      },
    ],
  },

  {
    name: "generals",
    Icon: MdSettingsInputComponent,
    columns: [
      {
        name: "id",
        type: "number",
        create: { hidden: true },
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "description",
        type: "string",
      },
      {
        name: "slug",
        type: "string",
        filterable: true,
      },
      {
        name: "img",
        type: "string",
        inputType: "text",
      },
      {
        name: "created_at",
        type: "string",
        hidden: true,
      },
      {
        name: "updated_at",
        type: "string",
        hidden: true,
      },
    ],
  },
  {
    name: "menu",

    hidden: true,
    columns: [
      {
        name: "id",
        type: "number",
        hidden: true,
        read: { hidden: false },
      },
      {
        name: "title",
        type: "string",
      },
      {
        name: "type_id",
        type: "number",
        relation: {
          table: "menu_type",
          keyColumn: "id",
          displayColumn: "name",
          type: "one",
        },
        inputType: "relation",
        create: {
          inputType: "select",
        },
        update: {
          inputType: "select",
        },
      },
      {
        name: "slug",
        type: "string",
        inputType: "text",
      },
      {
        name: "created_at",
        type: "string",
        update: { hidden: true },
        create: { hidden: true },
      },
      {
        name: "updated_at",
        type: "string",
        create: { hidden: true },
        update: { hidden: true },
      },
      {
        name: "menu_belong_id",
        type: "number",
        hidden: true,
        inputType: "select",
        required: false,
        default: "null",
        options: [],
      },
      {
        name: "route",
        type: "string",
      },
      {
        name: "status",
        type: "number",
        inputType: "select",
        options: [
          {
            label: "Pasif",
            value: "0",
          },
          {
            label: "Aktif",
            value: "1",
          },
        ],
      },
    ],
  },
];

export const getDatabaseTable = (name: string) => {
  try {
    return DATABASE_TABLES.find((table) => table.name === name);
  } catch (e) {
    console.log(e);
  }
};

export const getDatabaseTableColumns = (name: string) => {
  return getDatabaseTable(name)?.columns;
};

export const getDatabaseTableColumnsFilterable = (name: string) => {
  return getDatabaseTableColumns(name)?.filter((column) => column.filterable);
};
export const getDatabaseTableColumnsSearchable = (name: string) => {
  return getDatabaseTableColumns(name)?.filter((column) => column.searchable);
};

export const getDatabaseTableColumnsSortable = (name: string) => {
  return getDatabaseTableColumns(name)?.filter((column) => column.sortable);
};
