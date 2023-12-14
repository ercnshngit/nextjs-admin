import { DataBaseTableColumnDto } from "./database-table-column.dto";
import { DatabaseTableDto } from "./database-table.dto";
import { TypeDto } from "./type.dto";

export interface ColumnRelationCreateDto {
    table_id: number;
    referenced_table_id: number;
    pivot_table_id: number;
    column_id: number;
    referenced_column_id: number;
    relation_type_id: number;
    foreign_key_name: string;
}

export interface ColumnRelationDto {
    table_id: number;
    referenced_table_id: number;
    pivot_table_id: number;
    column_id: number;
    referenced_column_id: number;
    relation_type_id: number;
    foreign_key_name: string;
    table : DatabaseTableDto;
    referenced_table : DatabaseTableDto;
    pivot_table : DatabaseTableDto;
    column: DataBaseTableColumnDto;
    referenced_column: DataBaseTableColumnDto;
    relation_type: TypeDto;
}