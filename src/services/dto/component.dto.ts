import { ComponentPropDto, PropDto } from "./prop.dto";
import { TagDto } from "./tag.dto";
import { TypeDto } from "./types.dto";

export interface ComponentDto {
  id: number;
  name: string;
  tag: TagDto;
  type: TypeDto;
  icon?: string;
  component_prop: ComponentPropDto[];
}
