interface CrudOptionDto {
    id: number;
    is_hidden: boolean;
    is_required: boolean;
    is_readonly: boolean;
    input_type: null | DataTypeDto
}