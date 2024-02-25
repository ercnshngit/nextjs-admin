import { MediaService } from "@/services/media.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new MediaService(req);
  try {
    await service.securiyCheck();
    const reqBody = await req.json();
    const bearer = await service.encryptFileRequest(reqBody);
    const res = await fetch(process.env.NEXT_PUBLIC_FILE_API_URL + "/file", {
      headers: {
        Authorization: "Bearer " + bearer,
      },
    });
    const data = await res.json();
    const response = new Response(JSON.stringify(data), { status: 200 });
    return cors(req, response);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { directory: string } }
) {
  const service = new MediaService(req);
  try {
    await service.securiyCheck();
    const reqBody = await req.json();
    const bearer = await service.encryptFileRequest(reqBody);
    const directory = params.directory;
    const body = await req.json();
    const formData = new FormData();
    formData.append("file", body.file);
    const res = await fetch(
      process.env.NEXT_PUBLIC_FILE_API_URL + "/file/upload/" + directory,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + bearer,
        },
      }
    );
    const data = await res.json();
    const response = new Response(JSON.stringify(data), { status: 200 });

    return cors(req, response);
  } catch (error) {
    return await service.createLogAndResolveError(error);
  }
}
