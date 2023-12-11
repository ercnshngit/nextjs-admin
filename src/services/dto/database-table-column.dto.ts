export interface DataBaseTableColumnDto{
    id: number;
    name: string;
    type?: DataTypeDto;
    is_primary: boolean | false;
    is_required: boolean | false;
    is_unique: boolean | false;
    is_hidden: boolean | false;
    is_filterable: boolean | false;
    is_searchable: boolean | false;
    is_sortable: boolean | false;
    input_type?: DataTypeDto;
    create_crud_option_id?: number;
    update_crud_option_id?: number; 
    read_crud_option_id?: number;
    create_crud_option: CrudOptionDto;
    update_crud_option: CrudOptionDto;
    read_crud_option: CrudOptionDto;
}