import { prisma } from "@/libs/prisma";
import { Encryptor } from "../functions/encryptor";
import { UserChangePasswordDto, UserRegisterDto } from "../dto/user.dto";
import {
  ConfirmMessages,
  ErrorMessages,
} from "../../../constants/messages.constants";
import { generateAccessToken } from "./jwt";
import { LogService } from "../log.service";
import { BaseService } from "../base.service";

const encryptor = new Encryptor();

export class AuthService extends BaseService {
  constructor(request?: any) {
    super(request);
  }

  async login(
    data: {
      email: string;
      password: string;
    },
    isRegister: boolean
  ) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (user == null) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.USER_NOT_FOUND_ERROR(),
          }),
          {
            status: 400,
          }
        );
      }
      const passwordIsValid = await encryptor.isPasswordCorrect(
        data.password,
        user.password
      );
      if (!passwordIsValid) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.WRONG_PASSWORD_ERROR(),
          }),
          {
            status: 400,
          }
        );
      }
      const token = generateAccessToken(user);
      const { password, ...result } = user;
      return new Response(
        JSON.stringify({
          message: isRegister
            ? ConfirmMessages.REGISTER_SUCCESS()
            : ConfirmMessages.LOGIN_SUCCESS(),
          user: result,
          token: token,
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async registerUser(data: UserRegisterDto) {
    try {
      const user = data;
      const passWithoutHash = user.password;
      if (
        user.email == undefined ||
        user.password == undefined ||
        user.first_name == undefined ||
        user.last_name == undefined
      ) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.REGISTER_ERROR_REQUIRED_FIELDS(),
          }),
          {
            status: 400,
          }
        );
      }
      const userCheck = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (userCheck != null) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.USER_ALREADY_EXISTS_ERROR(),
          }),
          {
            status: 400,
          }
        );
      }
      data.password = await encryptor.hashPassword(data.password); // password hasleniyor
      const result = await prisma.user.create({
        data: {
          email: data.email,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          password: data.password,
          role_id: 1,
        },
      });
      user.password = passWithoutHash; // password hashlenmemiş hali ile login işlemi gerçekleşiyor
      const res = await this.login(
        {
          email: user.email,
          password: user.password,
        },
        true
      ); // user veriliyor cunku hashlenmemıs hali ile login işlemi gerçekleşiyor
      return res;
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }

  async changePassword(data: any, user_id: any) {
    try {
      const user = data as UserChangePasswordDto;
      if (
        user.email == undefined ||
        user.old_password == undefined ||
        user.new_password == undefined
      ) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.CHANGE_PASSWORD_ERROR_REQUIRED_FIELDS(),
          })
        );
      }
      const userResult = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });
      if (userResult == null) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.USER_NOT_FOUND_ERROR(),
          }),
          {
            status: 401,
          }
        );
      } else if (userResult.id != user_id) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.ACOOUNTS_DIFFERENT_ERROR(),
          }),
          {
            status: 401,
          }
        );
      }
      if (
        !(await encryptor.isPasswordCorrect(
          user.old_password,
          userResult.password
        ))
      ) {
        return new Response(
          JSON.stringify({
            status: "error",
            message: ErrorMessages.OLD_PASSWORD_NOT_MATCH_ERROR(),
          }),
          {
            status: 401,
          }
        );
      }
      if (user.old_password == user.new_password) {
        return new Response(
          JSON.stringify({
            status: "error",
            message:
              ErrorMessages.OLD_PASSWORD_AND_NEW_PASSWORD_NOT_SAME_ERROR(),
          }),
          {
            status: 401,
          }
        );
      }
      user.new_password = await encryptor.hashPassword(user.new_password);
      const result = await prisma.user.update({
        where: {
          id: userResult.id,
        },
        data: {
          password: user.new_password,
        },
      });
      return new Response(
        JSON.stringify({
          status: "success",
          message: ConfirmMessages.PASSWORD_CHANGE_SUCCESS(),
        }),
        {
          status: 200,
        }
      );
    } catch (error) {
      const logService = new LogService();
      await logService.createLog({ error });
      console.log(error);
      return new Response(JSON.stringify({ status: "error", message: error }), {
        status: 500,
      });
    }
  }
}
