export interface BlockComponentDto {
    component_id: number;
    block_id: number;
    belong_component_id: number;
    depth: number;
    order: number;
    code: string;
    hasChildren: boolean;
}