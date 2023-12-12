import { PropDto } from "./prop.dto";
import { TagDto } from "./tag.dto";
import { TypesDto } from "./types.dto";

export interface ComponentDto {
  id: number;
  name: string;
  tag: TagDto;
  type: TypesDto;
  icon?: string;
  props: PropDto[];
}
