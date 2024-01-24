export class SqlConstants {
  static SELECT = " SELECT ";
  static FROM = " FROM ";
  static WHERE = " WHERE ";
  static AND = " AND ";
  static OR = " OR ";
  static ORDER_BY = " ORDER BY ";
  static LIMIT = " LIMIT ";
  static OFFSET = " OFFSET ";
  static INSERT_INTO = " INSERT INTO ";
  static VALUES = " VALUES ";
  static UPDATE = " UPDATE ";
  static SET = " SET ";
  static DELETE_FROM = " DELETE FROM ";
  static COUNT = " COUNT ";
  static JOIN = " JOIN ";
  static ON = " ON ";
  static ASC = " ASC ";
  static DESC = " DESC ";
  static AS = " AS ";
  static INNER = " INNER ";
  static LEFT = " LEFT ";
  static LEFT_JOIN = " LEFT JOIN ";
  static RIGHT = " RIGHT ";
  static FULL = " FULL ";
  static OUTER = " OUTER ";
  static CROSS = " CROSS ";
  static NATURAL = " NATURAL ";
  static USING = " USING ";
  static GROUP_BY = " GROUP BY ";
  static HAVING = " HAVING ";
  static IN = " IN ";
  static NOT_IN = " NOT IN ";
  static BETWEEN = " BETWEEN ";
  static NOT_BETWEEN = " NOT BETWEEN ";
  static LIKE = " LIKE ";
  static NOT_LIKE = " NOT LIKE ";
  static ILIKE = " ILIKE ";
  static NOT_ILIKE = " NOT ILIKE ";
  static SIMILAR_TO = " SIMILAR TO ";
  static NOT_SIMILAR_TO = " NOT SIMILAR TO ";
  static IS_NULL = " IS NULL ";
  static IS_NOT_NULL = " IS NOT NULL ";
  static IS_TRUE = " IS TRUE ";
  static IS_NOT_TRUE = " IS NOT TRUE ";
  static IS_FALSE = " IS FALSE ";
  static IS_NOT_FALSE = " IS NOT FALSE ";
  static IS_UNKNOWN = " IS UNKNOWN ";
  static IS_NOT_UNKNOWN = " IS NOT UNKNOWN ";
  static ANY = " ANY ";
  static ALL = " ALL ";
  static SOME = " SOME ";
  static UNION = " UNION ";
  static UNION_ALL = " UNION ALL ";
  static SELECT_ALL = " * ";
  static SELECT_COUNT = " COUNT(*) ";
  static SELECT_DISTINCT = " DISTINCT ";
  static SELECT_DISTINCT_ON = " DISTINCT ON ";
  static CASCADE = "CASCADE";
  static RESTRICT = "RESTRICT";
  static NO_ACTION = "NO ACTION";
  static SHOW = " SHOW ";
  static COLUMNS = " COLUMNS ";
  static TABLES = " TABLES ";
  static TABLE_NAME = " TABLE_NAME ";
  static COLUMN_NAME = " COLUMN_NAME ";
  static CONSTRAINT_NAME = " CONSTRAINT_NAME ";
  static REFERENCED_TABLE_NAME = " REFERENCED_TABLE_NAME ";
  static REFERENCED_COLUMN_NAME = " REFERENCED_COLUMN_NAME ";
  static UPDATE_RULE = " UPDATE_RULE ";
  static DELETE_RULE = " DELETE_RULE ";
  static INFORMATION_SCHEMA_TABLES = " information_schema.TABLES ";
  static INFORMATION_SCHEMA_KEY_COLUMN_USAGE =
    " information_schema.KEY_COLUMN_USAGE ";
  static INFORMATION_SCHEMA_REFERENTIAL_CONSTRAINTS =
    " information_schema.REFERENTIAL_CONSTRAINTS ";
  static CONSTRAINT_SCHEMA = " CONSTRAINT_SCHEMA ";

  static SELECT_ALL_QUERRY(tableName: string) {
    return this.SELECT + this.SELECT_ALL + this.FROM + tableName;
  }

  static SELECT_ALL_WITH_WHERE_QUERRY(tableName: string, where: string) {
    return this.SELECT_ALL_QUERRY(tableName) + this.WHERE + where;
  }

  static SELECT_ALL_WITH_ID_QUERRY(tableName: string, id: number) {
    return this.SELECT_ALL_WITH_WHERE_QUERRY(tableName, "id = " + id);
  }

  //TODO: Metem burası güvenli mi bi bak sdfsdfsd
  static SELECT_ALL_WITH_COLUMN_NAME_QUERY({
    tableName,
    column,
    value,
  }: {
    tableName: string;
    value: string;
    column: string;
  }) {
    return this.SELECT_ALL_WITH_WHERE_QUERRY(
      tableName,
      tableName + "." + column + " = '" + value + "'"
    );
  }

  static UPDATE_QUERRY_WITH_ID(tableName: string, set: string, id: number) {
    return this.UPDATE + tableName + this.SET + set + this.WHERE + "id = " + id;
  }

  static DELETE_WITH_ID_QUERRY(tableName: string, id: number) {
    return this.DELETE_FROM + tableName + this.WHERE + "id = " + id;
  }

  static ALTER_TABLE_QUERRY(tableName: string) {
    return "ALTER TABLE " + tableName + " ";
  }

  static INSERT_QUERRY(tableName: string, body: any) {
    let columns = " (";
    let values = " (";
    body.forEach((element: { key: string; value: string }) => {
      columns += element.key + ", ";
      values += "'" + element.value + "', ";
    });
    columns = columns.substring(0, columns.length - 2) + ") ";
    values = values.substring(0, values.length - 2) + ") ";
    return this.INSERT_INTO + tableName + columns + this.VALUES + values;
  }

  static SELECT_WITH_MULTIPLE_JOIN_QUERRY(
    tableName: string,
    alias: string,
    joins: string,
    where: string
  ) {
    let querry =
      this.SELECT + "*" + this.FROM + tableName + this.AS + alias + " ";
    querry += joins + " ";
    querry += this.WHERE + where;
    return querry;
  }

  static JOIN_QUERRY_CREATOR(
    join_type: string,
    join_table_name: string,
    join_table_alias: string,
    join_table_column_name: string,
    table_column_name: string,
    table_name?: string,
    table_alias?: string | undefined
  ) {
    return (
      join_type +
      join_table_name +
      this.AS +
      join_table_alias +
      this.ON +
      (join_table_alias != undefined ? join_table_alias : join_table_name) +
      "." +
      join_table_column_name +
      " = " +
      table_alias +
      "." +
      table_column_name
    );
  }

  static SHOW_TABLE_COLUMNS_QUERRY(tableName: string) {
    return this.SHOW + this.COLUMNS + this.FROM + tableName;
  }

  static IS_TABLE_EXISTS_QUERRY(tableName: string) {
    return (
      this.SELECT +
      this.SELECT_COUNT +
      this.AS +
      "STATUS" +
      this.FROM +
      this.INFORMATION_SCHEMA_TABLES +
      this.WHERE +
      this.TABLE_NAME +
      " = '" +
      tableName +
      "'"
    );
  }

  static DELETE_QUERY_WITH_ID(tableName: string, id: number) {
    return this.DELETE_FROM + tableName + this.WHERE + "id = " + id;
  }
}

export class SqlDataType {
  static BOOLEAN = "tinyint(1)";
  static INT = "int(11)";
  static SMALLINT = "SMALLINT";
  static TINYINT = "tinyint";
  static BIGINT = "BIGINT";
  static REAL = "REAL";
  static DOUBLE = "DOUBLE";
  static CHAR = "CHAR";
  static VARCHAR = "varchar(255)";
  static TEXT = "TEXT";
  static DATE = "DATE";
  static DATETIME = "datetime(6)";
  static TIME = "TIME";
  static TIMESTAMP = "TIMESTAMP";
  static BLOB = "BLOB";
  static CLOB = "CLOB";
  static UUID = "UUID";
  static JSON = "JSON";
  static JSONB = "JSONB";
  static XML = "XML";
  static ARRAY = "ARRAY";
  static RANGE = "RANGE";
  static ENUM = "ENUM";
}
