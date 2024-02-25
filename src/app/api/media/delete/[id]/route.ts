import { MediaService } from "@/services/media.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const service = new MediaService(req);
  try {
    await service.securiyCheck();
    const bearer = await service.encryptFileRequest();
    const res = await fetch(
      process.env.NEXT_PUBLIC_FILE_API_URL + "/file/delete/" + params.id,
      {
        headers: {
          Authorization: "Bearer " + bearer,
        },
      }
    );
    const data = await res.json();
    const response = new Response(JSON.stringify(data), { status: 200 });
    return cors(req, response);
  } catch (error) {
    console.log("error : ", error);
    return await service.createLogAndResolveError(error);
  }
}
