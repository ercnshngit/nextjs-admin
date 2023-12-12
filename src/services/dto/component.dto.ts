import { ComponentPropDto, PropDto } from "./prop.dto";
import { TagDto } from "./tag.dto";
import { TypeDto } from "./type.dto";

export interface ComponentDto {
  id: number;
  name: string;
  tag: TagDto;
  type_id: number;
  icon?: string;
  props: ComponentPropDto[];
}
