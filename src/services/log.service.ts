import { prisma } from "@/libs/prisma";

export class LogService {
    async createLog(message: any, path?: any) {
        await prisma.log.create({
            data: {
                body: JSON.stringify(message),
                path: path
            }
        })
    }
}