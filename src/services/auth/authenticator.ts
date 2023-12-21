import { verifyJwtToken } from "@/libs/jose";
import { ErrorMessages } from "../../../constants/messages.constants";
import { LogService } from "../log.service";

export async function isAuthenticated(req: any): Promise<{ status: boolean, message: any, httpStatus: number, user?: any }> {
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
        const payload = await verifyJwtToken(token);
        return { status: true, message: "OK", httpStatus: 200, user: payload };
    } catch (err: any) {
        console.log("err :",err);
        const logService = new LogService();
        logService.createLog({ err });
        if (err.name === 'TokenExpiredError') {
            return { status: false, message: ErrorMessages.TOKEN_EXPIRED_ERROR(), httpStatus: 401 };
        } else {
            return { status: false, message: err, httpStatus: 401 };
        }
    }
}
