import { DataBaseTableColumnDto } from "./database-table-column.dto";

export class DatabaseTableDto {
    id?: number;
    name?: string;
    icon?: string;
    is_hidden?: boolean;
    can_create?: boolean;
    can_update?: boolean;
    columns?: DataBaseTableColumnDto[];
}