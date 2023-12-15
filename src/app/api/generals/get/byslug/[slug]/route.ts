import { GeneralService } from "@/services/general.service";
import { ServerMessages } from "../../../../../../../constants/messages.constants";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const generalService = new GeneralService();
    return await generalService.getGeneralsBySlug(params.slug);
  } catch (error) {
    console.log(error);
    throw new Error(ServerMessages[500]);
  }
}
