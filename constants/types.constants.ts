export class InputTypes {
    static 1 = "INT";
    static 2 = "FLOAT";
    static 3 = "VARCHAR";
    static 4 = "BOOLEAN";
    static 5 = "DATE";
    static 6 = "TIME";
    static 7 = "DATETIME";
    static 8 = "TIMESTAMP";
    static 9 = "JSON";
    static 10 = "JSONB";
    static 11 = "UUID";
    static 12 = "ARRAY";
    static 13 = "ENUM";
    static 14 = "OBJECT";
    static 15 = "TEXT";
    static 16 = "BYTEA";
    static 17 = "BYTE";
    static 18 = "CHAR";
    static 19 = "CHARACTER";
    static 20 = "CHARACTER_VARYING";
    static 21 = "CIDR";
    static 22 = "CIRCLE";
    static 23 = "DOUBLE_PRECISION";
    static 24 = "BIGINT";
    static 25 = "DECIMAL";
    static 26 = "TINYINT";

    static INT = 1;
    static FLOAT = 2;
    static VARCHAR = 3;
    static BOOLEAN = 4;
    static DATE = 5;
    static TIME = 6;
    static DATETIME = 7;
    static TIMESTAMP = 8;
    static JSON = 9;
    static JSONB = 10;
    static UUID = 11;
    static ARRAY = 12;
    static ENUM = 13;
    static OBJECT = 14;
    static TEXT = 15;
    static BYTEA = 16;
    static BYTE = 17;
    static CHAR = 18;
    static CHARACTER = 19;
    static CHARACTER_VARYING = 20;
    static CIDR = 21;
    static CIRCLE = 22;
    static DOUBLE_PRECISION = 23;
    static BIGINT = 24;
    static DECIMAL = 25;
    static TINYINT = 26;

    static INPUT_TYPES = [
        { name: InputTypes[1], id: InputTypes.INT, table_name: "database_table_column" },
        { name: InputTypes[2], id: InputTypes.FLOAT, table_name: "database_table_column" },
        { name: InputTypes[3], id: InputTypes.VARCHAR, table_name: "database_table_column" },
        { name: InputTypes[4], id: InputTypes.BOOLEAN, table_name: "database_table_column" },
        { name: InputTypes[5], id: InputTypes.DATE, table_name: "database_table_column" },
        { name: InputTypes[6], id: InputTypes.TIME, table_name: "database_table_column" },
        { name: InputTypes[7], id: InputTypes.DATETIME, table_name: "database_table_column" },
        { name: InputTypes[8], id: InputTypes.TIMESTAMP, table_name: "database_table_column" },
        { name: InputTypes[9], id: InputTypes.JSON, table_name: "database_table_column" },
        { name: InputTypes[10], id: InputTypes.JSONB, table_name: "database_table_column" },
        { name: InputTypes[11], id: InputTypes.UUID, table_name: "database_table_column" },
        { name: InputTypes[12], id: InputTypes.ARRAY, table_name: "database_table_column" },
        { name: InputTypes[13], id: InputTypes.ENUM, table_name: "database_table_column" },
        { name: InputTypes[14], id: InputTypes.OBJECT, table_name: "database_table_column" },
        { name: InputTypes[15], id: InputTypes.TEXT, table_name: "database_table_column" },
        { name: InputTypes[16], id: InputTypes.BYTEA, table_name: "database_table_column" },
        { name: InputTypes[17], id: InputTypes.BYTE, table_name: "database_table_column" },
        { name: InputTypes[18], id: InputTypes.CHAR, table_name: "database_table_column" },
        { name: InputTypes[19], id: InputTypes.CHARACTER, table_name: "database_table_column" },
        { name: InputTypes[20], id: InputTypes.CHARACTER_VARYING, table_name: "database_table_column" },
        { name: InputTypes[21], id: InputTypes.CIDR, table_name: "database_table_column" },
        { name: InputTypes[22], id: InputTypes.CIRCLE, table_name: "database_table_column" },
        { name: InputTypes[23], id: InputTypes.DOUBLE_PRECISION, table_name: "database_table_column" },
        { name: InputTypes[24], id: InputTypes.BIGINT, table_name: "database_table_column" },
        { name: InputTypes[25], id: InputTypes.DECIMAL, table_name: "database_table_column" },
        { name: InputTypes[26], id: InputTypes.TINYINT, table_name: "database_table_column" },
    ]
}

export class TypeCategories {
    static RELATION_TYPE = 0;
    static INPUT_TYPE = 1;
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
        { name: InputTypes[12], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[13], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[14], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[15], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[16], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[17], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[18], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[19], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[20], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[21], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[22], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[23], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[24], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[25], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
        { name: InputTypes[26], type_id: TypeCategories.INPUT_TYPE, table_name: "database_table_column" },
    ]
}