import { TestService } from "@/services/test.service";
import cors from "@/utils/cors";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
    ) {
    const id = params.id 
    const service = new TestService(req);
    try {
        await service.securiyCheck();
        const res = new Response(
            JSON.stringify({ status: "ok", message: "ok" }),
            { status: 200 }
        );
        return cors(req, res);
    } catch (error) {
        return service.createLogAndResolveError(error);
    } 
  }
  
  export async function POST(
    req: NextRequest,
    { params }: { params: { id: number } }
    ) {
    const id = params.id 
    const service = new TestService(req);
    try {
        await service.securiyCheck();
        const body = await req.json();
        const res = new Response(
        JSON.stringify({ status: "ok", message: "ok" }),
            { status: 200 }
        );
        return cors(req, res);
    } catch (error) {
        return service.createLogAndResolveError(error);
    }
  }
  