export class TypeCategories {
  static RELATION_TYPE = "column_relation";
  static COMPONENT_TYPE = "component";
  static PROP_TYPE = "prop";
  static BLOCK_TYPE = "block";
  static INPUT_TYPE = "database_table_column";
}

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
  static 12 = "slugify";
  static 13 = "file";

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
  static SLUGIFY = 12;
  static FILE = 13;

  static INPUT_TYPES = [
    {
      name: InputTypes[1],
      id: InputTypes.HIDDEN,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[2],
      id: InputTypes.IMAGE,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[3],
      id: InputTypes.TEXT,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[4],
      id: InputTypes.TEXTAREA,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[5],
      id: InputTypes.SELECT,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[6],
      id: InputTypes.CHECKBOX,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[7],
      id: InputTypes.NUMBER,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[8],
      id: InputTypes.RELATION,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[9],
      id: InputTypes.MULTI_SELECT,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[10],
      id: InputTypes.DATE,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[11],
      id: InputTypes.RICHTEXT,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[12],
      id: InputTypes.SLUGIFY,
      table_name: TypeCategories.INPUT_TYPE,
    },
    {
      name: InputTypes[13],
      id: InputTypes.FILE,
      table_name: TypeCategories.INPUT_TYPE,
    },
  ];
}

export class RelationTypes {
  static 1 = "One to One";
  static 2 = "One to Many";
  static 3 = "Many to Many";

  static ONE_TO_ONE = 1;
  static ONE_TO_MANY = 2;
  static MANY_TO_MANY = 3;

  static RELATION_TYPES = [
    {
      name: RelationTypes[1],
      id: RelationTypes.ONE_TO_ONE,
      table_name: TypeCategories.RELATION_TYPE,
    },
    {
      name: RelationTypes[2],
      id: RelationTypes.ONE_TO_MANY,
      table_name: TypeCategories.RELATION_TYPE,
    },
    {
      name: RelationTypes[3],
      id: RelationTypes.MANY_TO_MANY,
      table_name: TypeCategories.RELATION_TYPE,
    },
  ];
}

export class TypeJsons {
  static INPUT_TYPES = [
    { name: InputTypes[1], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[2], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[3], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[4], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[5], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[6], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[7], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[8], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[9], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[10], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[11], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[12], table_name: TypeCategories.INPUT_TYPE },
    { name: InputTypes[13], table_name: TypeCategories.INPUT_TYPE },
  ];
  static RELATION_TYPES = [
    { name: RelationTypes[1], table_name: TypeCategories.RELATION_TYPE },
    { name: RelationTypes[2], table_name: TypeCategories.RELATION_TYPE },
    { name: RelationTypes[3], table_name: TypeCategories.RELATION_TYPE },
  ];
}
