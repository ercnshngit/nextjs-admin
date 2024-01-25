import { BlockDto } from "./block.dto";
import { ComponentDto } from "./component.dto";
import { ComponentPropDto } from "./prop.dto";

export interface CreateBlockComponentsDto {
  block: Partial<BlockDto>;
  block_components: BlockComponentDto[];
}

export interface BlockComponentDto {
  component: ComponentDto;
  block: BlockDto;
  belong_block_component_code: string | null;
  depth: number;
  order: number;
  code: string;
  hasChildren?: boolean;
  props: ComponentPropDto[];
  children?: BlockComponentDto[];
}

export interface CreateBlockComponentDto {
  component_id: number;
  block: BlockDto;
  belong_block_component_code?: string;
  depth: number;
  order: number;
  code: string;
  hasChildren?: boolean;
  props: ComponentPropDto[] | [];
}

export interface UpdateBlockComponentDto {
  component_id?: number;
  block_id?: number;
  belong_block_component_code?: string;
  depth?: number;
  order?: number;
  code?: string;
  hasChildren?: boolean;
}
