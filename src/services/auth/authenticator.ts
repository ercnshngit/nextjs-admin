import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { ErrorMessages } from "../../../constants/messages.constants";

config();

export function isAuthenticated(req : any) : {status : boolean , message : any, httpStatus : number, user? : any}{
    const authorization  = req.headers.get("authorization");
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    if(!accessSecret) {
        return {status : false , message : ErrorMessages.JWT_ACCESS_SECRET_NOT_FOUND_ERROR(), httpStatus : 500};
    }
    if (!authorization) {
        return {status : false , message : ErrorMessages.UNAUTHORIZED_ERROR(), httpStatus : 401};
    }
    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, accessSecret);
        return { status: true, message: "OK", httpStatus: 200, user: payload };
    } catch (err : any) {
        if (err.name === 'TokenExpiredError') {
            return {status : false , message : ErrorMessages.TOKEN_EXPIRED_ERROR(), httpStatus : 401};
        }else{
            return {status : false , message : ErrorMessages.TOKEN_INVALID_ERROR(), httpStatus : 401};
        }
    }
}
