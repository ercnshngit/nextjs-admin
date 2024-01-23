import { prisma } from "@/libs/prisma";
import { TagDto } from "./dto/tag.dto";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { LogService } from "./log.service";
import { BaseService } from "./base.service";

export class TagService extends BaseService{

    constructor(request?: any) {
        super(request);
    }

    async getTag(id: number) {
        const tag = await prisma.tag.findUnique({ where: { id } })
        if (!tag) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(tag));
    }

    async getTags() {
        const tags = await prisma.tag.findMany()
        if (tags.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
        return new Response(JSON.stringify(tags));
    }

    async createTag(data: TagDto) {
        try {
            const tag = await prisma.tag.create({ data })
            if (!tag) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            return new Response(JSON.stringify(tag));
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateTag(id: number, data: TagDto) {
        try {
            const tag = await prisma.tag.findUnique({ where: { id } })
            if (!tag) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            Object.assign(tag, data)
            const new_tag = await prisma.tag.update({ where: { id }, data })
            if (!new_tag) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() }), { status: 400 }); }
            return new Response(JSON.stringify(new_tag));
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteTag(id: number) {
        try {
            const tag = await prisma.tag.findUnique({ where: { id } })
            if (!tag) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() }), { status: 404 }); }
            const delete_tag = await prisma.tag.delete({ where: { id } })
            if (!delete_tag) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() }), { status: 400 }); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }), { status: 200 });
        }
        catch (error) {
            const logService = new LogService();
            await logService.createLog({ error });
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}