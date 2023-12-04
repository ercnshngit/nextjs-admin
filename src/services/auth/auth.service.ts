import { prisma } from "@/libs/prisma";
import { Encryptor } from "./encrypt.data";
import { UserChangePasswordDto, UserRegisterDto } from "../dto/user.dto";
import { ConfirmMessages, ErrorMessages } from "../../../constants/messages.constants";
import { generateAccessToken } from "./jwt";

const encryptor = new Encryptor(); 
export class AuthService{


    async login(data : any, isRegister : boolean){
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: data.email
                }
            });
            if(user == null){
                return new Response(JSON.stringify({status : "error" , message : ErrorMessages.USER_NOT_FOUND_ERROR()}));
            }
            console.log(data.password," ", user.password)
            const passwordIsValid = await encryptor.isPasswordCorrect(data.password, user.password);
            if(!passwordIsValid){
                return new Response(JSON.stringify({status : "error" , message : ErrorMessages.WRONG_PASSWORD_ERROR()}));
            }
            const token = generateAccessToken(user);
            const {password , ...result} = user;
            return new Response(JSON.stringify({ message : isRegister ? ConfirmMessages.REGISTER_SUCCESS() : ConfirmMessages.LOGIN_SUCCESS(), user : result , token : token}));
        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify({status : "error" , message : error}));
        }
    }

    async registerUser(data : any) {
        
        try {
            const user = data as UserRegisterDto;
            const passWithoutHash = user.password;
            if(user.email == undefined || user.password == undefined || user.first_name == undefined || user.last_name == undefined){
                return new Response(JSON.stringify({status : "error" , message : ErrorMessages.REGISTER_ERROR_REQUIRED_FIELDS()}));
            }
            const userCheck = await prisma.user.findFirst({
                where : {
                    email : user.email
                }
            });
            if(userCheck != null){
                return new Response(JSON.stringify({status : "error" , message : ErrorMessages.USER_ALREADY_EXISTS_ERROR()}));
            }
            data.password = await encryptor.hashPassword(data.password); // password hasleniyor
            const result = await prisma.user.create({
                data : {
                    email : data.email,
                    first_name : data.first_name,
                    last_name : data.last_name,
                    password : data.password,
                    role_id : 1
                }
            });
            user.password = passWithoutHash; // password hashlenmemiş hali ile login işlemi gerçekleşiyor
            const res = await this.login(user, true,); // user veriliyor cunku hashlenmemıs hali ile login işlemi gerçekleşiyor
            return res;
        } catch (error) {
            console.log(error);
            return new Response(JSON.stringify({status : "error" , message : error}));
        }
    }

    async changePassword(data : any, user_id : any){
        const user = data as UserChangePasswordDto;
        if(user.email == undefined || user.old_password == undefined || user.new_password == undefined){
            return new Response(JSON.stringify({status : "error" , message : ErrorMessages.CHANGE_PASSWORD_ERROR_REQUIRED_FIELDS()}));
        }
        const userResult = await prisma.user.findUnique({
            where : {
                email : user.email
            }
        });
        if(userResult == null){
            return new Response(JSON.stringify({status : "error" , message : ErrorMessages.USER_NOT_FOUND_ERROR()}));
        }else if(userResult.id != user_id){
            return new Response(JSON.stringify({status : "error" , message : ErrorMessages.ACOOUNTS_DIFFERENT_ERROR()}));
        }
        const hashedOldPassword = await encryptor.hashPassword(user.old_password);
        if(hashedOldPassword != userResult.password){
            return new Response(JSON.stringify({status : "error" , message : ErrorMessages.OLD_PASSWORD_NOT_MATCH_ERROR()}));
        }
        if(user.old_password == user.new_password){
            return new Response(JSON.stringify({status : "error" , message : ErrorMessages.OLD_PASSWORD_AND_NEW_PASSWORD_NOT_SAME_ERROR()}));
        }
        user.new_password = await encryptor.hashPassword(user.new_password);
        try {
            const result = await prisma.user.update({
                where : {
                    email : user.email
                },
                data : {
                    password : user.new_password
                }
            });
            return new Response(JSON.stringify({status : "success" , message : ConfirmMessages.PASSWORD_CHANGE_SUCCESS()}));
        } catch (error) {
            return new Response(JSON.stringify({status : "error" , message : error}));
        }
    }
}