import { BlockDto } from "./block.dto";
import { ComponentDto } from "./component.dto";
import { ComponentPropDto } from "./prop.dto";

export interface CreateBlockComponentsDto {
    block_components: BlockComponentDto[];
}

export interface BlockComponentDto {
    component: ComponentDto;
    block: BlockDto;
    belong_component_id?: number;
    depth: number;
    order: number;
    code: string;
    hasChildren?: boolean;
    props: ComponentPropDto[];
}

export interface CreateBlockComponentDto {
    component_id: number;
    block: BlockDto;
    belong_component_id?: number;
    depth: number;
    order: number;
    code: string;
    hasChildren?: boolean;
    props: ComponentPropDto[] | [];
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