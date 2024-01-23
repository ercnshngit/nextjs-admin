import { prisma } from "@/libs/prisma";

export class LogService {
  path: string = "";

  constructor(path?: string) {
    this.path = path ? path : "";
  }

  async createLog(error: any) {
    const errorString = error.message != undefined ? error.message : error;
    if (error instanceof Object) {
      error = JSON.stringify(error);
    }
    console.log("log-path :: ", this.path);
    await prisma.log.create({
      data: {
        body: JSON.stringify(errorString != undefined ? errorString : error),
        path: this.path != undefined ? this.path : "path not found",
      },
    });
  }
}
