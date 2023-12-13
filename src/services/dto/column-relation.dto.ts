interface ColumnRelationCreateDto {
    table_id: number;
    reference_table_id: number;
    pivot_table_id: number;
    column_id: number;
    reference_column_id: number;
    relation_type_id: number;
    foreign_key_name: string;
}