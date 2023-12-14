import { prisma } from "@/libs/prisma";

export class LogService {
    async createLog(message: any) {
        await prisma.log.create({
            data: {
                body: JSON.stringify(message)
            }
        })
    }
}