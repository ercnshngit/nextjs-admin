import { ComponentDto } from "./component.dto";
import { PropDto } from "./prop.dto";

export interface BlockComponentDto {
    component: ComponentDto;
    block_id: number;
    belong_component_id?: number;
    depth: number;
    order: number;
    code?: string;
    hasChildren?: boolean;
    props?: PropDto[];
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