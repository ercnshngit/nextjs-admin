export class InputTypes {
    static 1 = "hidden";
    static 2 = "image";
    static 3 = "text";
    static 4 = "textarea";
    static 5 = "select";
    static 6 = "checkbox";
    static 7 = "number";
    static 8 = "relation";
    static 9 = "multi-select";
    static 10 = "date";
    static 11 = "richtext";

    static HIDDEN = 1;
    static IMAGE = 2;
    static TEXT = 3;
    static TEXTAREA = 4;
    static SELECT = 5;
    static CHECKBOX = 6;
    static NUMBER = 7;
    static RELATION = 8;
    static MULTI_SELECT = 9;
    static DATE = 10;
    static RICHTEXT = 11;

    static INPUT_TYPES = [
        { name: InputTypes[1], id: InputTypes.HIDDEN, table_name: "database_table_column" },
        { name: InputTypes[2], id: InputTypes.IMAGE, table_name: "database_table_column" },
        { name: InputTypes[3], id: InputTypes.TEXT, table_name: "database_table_column" },
        { name: InputTypes[4], id: InputTypes.TEXTAREA, table_name: "database_table_column" },
        { name: InputTypes[5], id: InputTypes.SELECT, table_name: "database_table_column" },
        { name: InputTypes[6], id: InputTypes.CHECKBOX, table_name: "database_table_column" },
        { name: InputTypes[7], id: InputTypes.NUMBER, table_name: "database_table_column" },
        { name: InputTypes[8], id: InputTypes.RELATION, table_name: "database_table_column" },
        { name: InputTypes[9], id: InputTypes.MULTI_SELECT, table_name: "database_table_column" },
        { name: InputTypes[10], id: InputTypes.DATE, table_name: "database_table_column" },
        { name: InputTypes[11], id: InputTypes.RICHTEXT, table_name: "database_table_column" },
    ]
}

export class TypeCategories {
    static RELATION_TYPE = "column_relation";
    static INPUT_TYPE = "database_table_column";
}

export class TypeJsons {
    static INPUT_TYPES = [
        { name: InputTypes[1], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[2], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[3], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[4], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[5], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[6], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[7], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[8], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[9], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[10], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[11], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
    ]
}