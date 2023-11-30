import { prisma } from "@/libs/prisma";
import { BlockDto } from "@/services/dto/block.dto";

export class BlockService {
    async getBlock(id: number) {
        const block = await prisma.block.findUnique({ where: { id } })
        if (!block) { return new Response(JSON.stringify({ message: "Block bulunamadı." })); }
        return new Response(JSON.stringify(block));
    }

    async getBlocks() {
        const blocks = await prisma.block.findMany()
        if (!blocks) { return new Response(JSON.stringify({ message: "Block bulunamadı." })); }
        return new Response(JSON.stringify(blocks));
    }

    async createBlock(data: BlockDto) {
        try {
            const checkType = await prisma.types.findUnique({ where: { id: data.type_id } })
            if (!checkType) { return new Response(JSON.stringify({ message: "Type bulunamadı." })); }
            const block = await prisma.block.create({ data })
            if (!block) { return new Response(JSON.stringify({ message: "Block bulunamadı." })); }
            return new Response(JSON.stringify(block));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }

    async updateBlock(id: number, data: BlockDto) {
        try {
            if (data.type_id) {
                const checkType = await prisma.types.findUnique({ where: { id: data.type_id } })
                if (!checkType) { return new Response(JSON.stringify({ message: "Type bulunamadı." })); }
            }
            const block = await prisma.block.findUnique({ where: { id } })
            if (!block) { return new Response(JSON.stringify({ message: "Block bulunamadı." })); }
            Object.assign(block, data)
            const new_block = await prisma.block.update({ where: { id }, data })
            if (!new_block) { return new Response(JSON.stringify({ message: "Block güncelleme işlemi başarısız." })); }
            return new Response(JSON.stringify(new_block));
        }
        catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ status: "error", error_message: error }));
        }
    }
}