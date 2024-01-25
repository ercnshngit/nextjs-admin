import cors from "@/utils/cors";
import { ErrorMessages } from "../../constants/messages.constants";
import { isAuthenticated } from "./auth/authenticator";
import { ErrorResolverService } from "./error-resolver.service";
import { LogService } from "./log.service";
import { PermissionService } from "./permission.service";

export class BaseService {
  api_path = "";
  logService: LogService;
  request: any;
  permissionService: PermissionService;
  errorResolverService: ErrorResolverService;

  constructor(request?: any) {
    this.request = request;
    this.api_path =
      request == undefined
        ? ""
        : typeof request === "string"
        ? request
        : this.request.nextUrl.pathname;
    this.logService = new LogService(this.api_path);
    this.permissionService = new PermissionService(this.logService);
    this.errorResolverService = new ErrorResolverService(request);
  }

  async createLog(data: any) {
    try {
      await this.logService.createLog(data);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  async createLogAndResolveError(data: any) {
    try {
      await this.logService.createLog(data);
      return await this.errorResolverService.resolve(data);
    } catch (error) {
      console.log("error : ", error);
      const res = new Response(
        JSON.stringify({ status: "error", message: error }),
        { status: 500 }
      );
      return cors(this.request, res);
    }
  }

  async permissionCheck(apiRoutePermissionInfo: any, isAuth: any) {
    try {
      if (apiRoutePermissionInfo.is_role) {
        // Role kontrolu yapılıyor
        if (
          await this.permissionService.isUserHasAPermission(
            isAuth.user,
            apiRoutePermissionInfo.id
          )
        ) {
          return;
        } else {
          throw new Response(
            JSON.stringify({ error: ErrorMessages.PERMISSION_ERROR() }),
            {
              status: 403,
            }
          );
        }
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async authAndPermissionCheck(apiRoutePermissionInfo: any) {
    try {
      const isAuth = await isAuthenticated(this.request);
      if (!isAuth.status) {
        // Eğer giriş yapılmamışsa hata döndürüyor
        throw new Response(JSON.stringify({ error: isAuth.message }), {
          status: 401,
        });
      } else {
        if (!apiRoutePermissionInfo.is_role) {
          // Role kontrolu yapılıyor
          return;
        } else {
          await this.permissionCheck(apiRoutePermissionInfo, isAuth);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async securiyCheck() {
    try {
      if (!this.api_path || !this.request) {
        throw new Error("api_path or request is null");
      }
      const apiRoutePermissionInfo =
        await this.permissionService.getApiRouteInfo(
          this.api_path,
          this.request
        );
      if (!apiRoutePermissionInfo) {
        // Eğer api route kaydı yoksa direkt girişe izin veriyor
        return;
      } else {
        if (apiRoutePermissionInfo.is_auth) {
          return await this.authAndPermissionCheck(apiRoutePermissionInfo);
        } else {
          return; // Eğer api route kaydı varsa ve is_auth false ise direkt girişe izin veriyor
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
