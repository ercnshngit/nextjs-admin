import { TypeDto } from "./type.dto";

export interface ComponentPropDto {
  prop: {
    id: number;
    key: string;
    type_id: number;
  };
  value: string;
}

export interface PropDto {
  id: number;
  key: string;
  type: TypeDto;
}
