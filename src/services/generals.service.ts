import { prisma } from "@/libs/prisma";
import { ConfirmMessages, ErrorMessages } from "../../constants/messages.constants";
import { GeneralsDto } from "./dto/generals.dto";

export class GeneralsService {
    async getGeneral(id: number) {
        const general = await prisma.generals.findUnique({ where: { id } })
        if (!general) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(general));
    }

    async getGenerals() {
        const generals = await prisma.generals.findMany()
        if (generals.length < 1) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
        return new Response(JSON.stringify(generals));
    }

    async createGeneral(data: GeneralsDto) {
        try {
            const general = await prisma.generals.create({ data })
            if (!general) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            return new Response(JSON.stringify(general));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateGeneral(id: number, data: GeneralsDto) {
        try {
            const general = await prisma.generals.findUnique({ where: { id } })
            if (!general) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            Object.assign(general, data)
            const new_general = await prisma.generals.update({ where: { id }, data })
            if (!new_general) { return new Response(JSON.stringify({ message: ErrorMessages.UPDATE_FAILED_ERROR() })); }
            return new Response(JSON.stringify(new_general));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async deleteGeneral(id: number) {
        try {
            const general = await prisma.generals.findUnique({ where: { id } })
            if (!general) { return new Response(JSON.stringify({ message: ErrorMessages.NOT_FOUND_ERROR() })); }
            const delete_general = await prisma.generals.delete({ where: { id } })
            if (!delete_general) { return new Response(JSON.stringify({ message: ErrorMessages.DELETE_FAILED_ERROR() })); }
            return new Response(JSON.stringify({ message: ConfirmMessages.DELETE_SUCCESS_CONFIRM() }));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}