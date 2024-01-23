import { TagService } from "@/services/tag.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new TagService(req);
  try {
    await service.securiyCheck();
    const res = await service.deleteTag(Number(params.id));
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
