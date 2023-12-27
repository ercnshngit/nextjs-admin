import { axiosFileClient } from "@/libs/axios";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = axiosFileClient.post("/mail/send-contact-mail", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const res = new Response(JSON.stringify(data), { status: 200 });
    return cors(req, res);
  } catch (error) {
    const res = new Response(
      JSON.stringify({ status: "error", message: error }),
      { status: 500 }
    );
    return cors(req, res);
  }
}
