import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const service = new TypeService(req);
  try {
    await service.securiyCheck();
    const table_name = params.table_name;
    const res = await service.getTypeWithTableName(table_name);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    return await service.createLogAndResolveError(error);
  }
}
