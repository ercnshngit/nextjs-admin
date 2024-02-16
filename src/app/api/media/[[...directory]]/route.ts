import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    console.log("dfds", process.env.NEXT_PUBLIC_FILE_API_URL);
    const res = await fetch(process.env.NEXT_PUBLIC_FILE_API_URL + "/file");
    const data = await res.json();
    const response = new Response(JSON.stringify(data), { status: 200 });
    return cors(req, response);
  } catch (error) {
    console.log("error : ", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { directory: string } }
) {
  try {
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
        },
      }
    );
    const data = await res.json();
    const response = new Response(JSON.stringify(data), { status: 200 });

    return cors(req, response);
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
