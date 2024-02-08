import { TypeDto } from "./type.dto";

export interface ComponentPropDto {
  prop: {
    id: number;
    key: string;
    type: TypeDto;
  };
  value: string;
}

export interface PropDto {
  id: number;
  key: string;
  type: TypeDto;
}

export interface CreateComponentPropDto {
  component_id: number;
  prop_id: number;
}
