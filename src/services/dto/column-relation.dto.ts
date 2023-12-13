interface ColumnRelationCreateDto {
    table_id: number;
    referenced_table_id: number;
    pivot_table_id: number;
    column_id: number;
    referenced_column_id: number;
    relation_type_id: number;
    foreign_key_name: string;
}