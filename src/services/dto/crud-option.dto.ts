import { TypeDto } from "./type.dto";

export interface CrudOptionDto {
  id: number;
  name: string;
  is_hidden: boolean;
  is_required: boolean;
  is_readonly: boolean;
  input_type: null | TypeDto;
}

export interface CrudOptionCreateDto {
  name: string;
  is_hidden: boolean;
  is_required: boolean;
  is_readonly: boolean;
  input_type_id: number;
  crud_type: number; // 1 = create, 2 = update, 3 = read
}
