import { TagService } from "@/services/tag.service"
import { ServerMessages } from "../../../../constants/messages.constants"

export async function GET(req: Request) {
    try {
        const tagService = new TagService()
        return await tagService.getTags()
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500])
    }
}

export async function POST(req: Request) {
    try {
        const tagService = new TagService()
        const body = await req.json()
        return await tagService.createTag(body)
    } catch (error) {
        console.log(error)
        throw new Error(ServerMessages[500])
    }
}