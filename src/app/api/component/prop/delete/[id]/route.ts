import { ComponentPropService } from "@/services/component_prop.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new ComponentPropService(req);
  try {
    await service.securiyCheck();
    const res = await service.deleteComponentProp(
      Number(params.id)
    );
    return cors(req, res);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
