import { ColumnRelationDto } from "./column-relation.dto";
import { CrudOptionDto } from "./crud-option.dto";
import { TypeDto } from "./type.dto";

export interface DataBaseTableColumnDto {
  id: number;
  name: string;
  description: string;
  is_primary: boolean | false;
  is_required: boolean | false;
  is_unique: boolean | false;
  is_hidden: boolean | false;
  is_filterable: boolean | false;
  is_searchable: boolean | false;
  is_sortable: boolean | false;
  input_type_id: number;
  input_type?: TypeDto;
  column_relations: ColumnRelationDto[];
  create_crud_option_id?: number;
  update_crud_option_id?: number;
  read_crud_option_id?: number;
  create_crud_option: CrudOptionDto;
  update_crud_option: CrudOptionDto;
  read_crud_option: CrudOptionDto;
  options?: OptionDto[];
  order: number;
}

export interface OptionDto {
  id?: number;
  label: string;
  value: string;
  icon?: string;
}
