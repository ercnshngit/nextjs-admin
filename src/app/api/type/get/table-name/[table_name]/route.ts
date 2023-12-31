import { TypeService } from "@/services/type.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { table_name: string } }
) {
  const typesService = new TypeService(req.nextUrl.pathname);
  try {
    const table_name = params.table_name;
    const res = await typesService.getTypeWithTableName(table_name);
    return cors(req, res);
  } catch (error) {
    console.log(error);
    await typesService.createLog({ error });
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
