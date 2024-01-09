import { DataBaseTableColumnDto } from "./database-table-column.dto";
import { prisma } from "@/libs/prisma";

export interface DatabaseTableDto {
  id?: number;
  name: string;
  display_column_id?: number;
  display_column?: DataBaseTableColumnDto;
  icon?: string;
  is_hidden?: boolean;
  can_create?: boolean;
  can_update?: boolean;
  columns?: DataBaseTableColumnDto[];
  column_relations?: any[];
  referenced_column_relations?: any[];
  pivoted_column_relations?: any[];
}
