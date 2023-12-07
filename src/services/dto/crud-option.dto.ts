interface CrudOptionDto {
    id: number;
    name: string;
    is_hidden: boolean;
    is_required: boolean;
    is_readonly: boolean;
    input_type: null | DataTypeDto
}