import { ComponentPropDto, PropDto } from "./prop.dto";
import { TagDto } from "./tag.dto";
import { TypesDto } from "./types.dto";

export interface ComponentDto {
  id: number;
  name: string;
  tag: TagDto;
  types: TypesDto;
  icon?: string;
  component_prop: ComponentPropDto[];
}
