import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { ErrorMessages } from "../../../constants/messages.constants";
import { LogService } from "../log.service";
import cors from "@/utils/cors";

config();

export function isAuthenticated(req: any): { status: boolean, message: any, httpStatus: number, user?: any } | any {
    const authorization = req.headers.get("authorization");
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    if (!accessSecret) {
        return { status: false, message: ErrorMessages.JWT_ACCESS_SECRET_NOT_FOUND_ERROR(), httpStatus: 500 };
    }
    if (!authorization) {
        return { status: false, message: ErrorMessages.UNAUTHORIZED_ERROR(), httpStatus: 401 };
    }
    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, accessSecret);
        return { status: true, message: "OK", httpStatus: 200, user: payload };
    } catch (err: any) {
        const logService = new LogService();
        logService.createLog({ err });
        if (err.name === 'TokenExpiredError') {
            const res = new Response(JSON.stringify({ status: "error", message: ErrorMessages.TOKEN_EXPIRED_ERROR() }), { status: 401 });
            return cors(req, res);
        } else {
            const res = new Response(JSON.stringify({ status: "error", message: ErrorMessages.TOKEN_EXPIRED_ERROR() }), { status: 401 });
            return cors(req, res);
        }
    }
}
