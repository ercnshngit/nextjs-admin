import { MediaService } from "@/services/media.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const service = new MediaService(req);
  try {
    await service.securiyCheck();
    const bearer = await service.encryptFileRequest();
    const res = await fetch(process.env.NEXT_PUBLIC_FILE_API_URL + "/file", {
      headers: {
        Authorization: "Bearer " + bearer,
      },
    });
    const data = await res.json();
    const response = new Response(JSON.stringify(data), { status: 200 });
    return cors(req, response);
  } catch (error) {
    console.log("error : ", error);
    return await service.createLogAndResolveError(error);
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { directory: string[] } }
) {
  const service = new MediaService(req);
  try {
    await service.securiyCheck();
    console.log("req : ", req);
    const reqBody = await req.formData();
    console.log("reqBody : ", reqBody);
    const bearer = await service.encryptFileRequest(reqBody);
    const directory = params.directory;

    const res = await fetch(
      process.env.NEXT_PUBLIC_FILE_API_URL +
        "/file/upload/" +
        directory.join("/"),
      {
        method: "POST",
        body: reqBody,
        headers: {
          Authorization: "Bearer " + bearer,
        },
      }
    );
    const data = await res.json();
    console.log("data : ", data);
    const response = new Response(JSON.stringify(data), { status: 200 });

    return cors(req, response);
  } catch (error) {
    console.log("error : ", error);
    return await service.createLogAndResolveError(error);
  }
}
