import { privateEncrypt } from "crypto";
import { readFile } from "fs/promises";
import { BaseService } from "./base.service";

export class MediaService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

  async encryptFileRequest(content?: any) {
    try {
      const data = {
        data: content || {},
        date: new Date(),
      };
      const private_key = await readFile("./private_key.pem", {
        encoding: "utf8",
      });
      if (private_key === null) {
        return null;
      }
      const encrypted = privateEncrypt(
        private_key,
        Buffer.from(JSON.stringify(data))
      );
      const encryptedData = encrypted.toString("base64");
      console.log("encrypted: ", encryptedData);
      return encryptedData;
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  }
}
