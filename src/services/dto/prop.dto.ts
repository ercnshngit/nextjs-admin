import { TypeDto } from "./type.dto";

//TODO: bunun aynısı başka yerde de var check it bu doğru olan
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
