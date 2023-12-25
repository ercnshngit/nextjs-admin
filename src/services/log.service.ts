import { prisma } from "@/libs/prisma";

export class LogService {

    path : string = "";

    constructor(path: string) {
        this.path = path;
    }

    async createLog(error: any) {
        console.log("epathhhhhh : ", this.path);
        await prisma.log.create({
            data: {
                body: error.message != undefined ? error.message : error,
                path: this.path != undefined ? this.path : "path not found"
            }
        })
    }
}