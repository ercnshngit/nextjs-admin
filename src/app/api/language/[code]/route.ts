import { LanguageService } from "@/services/language.service";
import { LogService } from "@/services/log.service";
import cors from "@/utils/cors";

export async function GET(
  req: Request,
  params: { params: { code: string } }
) {
  const code = params.params.code
  const languageService = new LanguageService()
  try {
    const res = await languageService.getLanguageByCode(code)
    return cors(req, res);
  } catch (error) {
    const logService = new LogService();
    await logService.createLog({ error });
    const res = new Response(JSON.stringify({ status: "error", message: error }), { status: 500 });
    return cors(req, res);
  }
}