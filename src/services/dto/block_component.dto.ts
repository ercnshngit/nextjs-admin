import { BlockDto } from "./block.dto";
import { ComponentDto } from "./component.dto";
import { PropDto } from "./prop.dto";

export interface CreateBlockComponentDto {
    block_components: BlockComponentDto[];
}

export interface BlockComponentDto {
    component: ComponentDto;
    block: BlockDto;
    belong_component_id?: number;
    depth: number;
    order: number;
    code?: string;
    hasChildren?: boolean;
    props: PropDto[] | [];
}

export interface UpdateBlockComponentDto {
    component_id?: number;
    block_id?: number;
    belong_component_id?: number;
    depth?: number;
    order?: number;
    code?: string;
    hasChildren?: boolean;
}