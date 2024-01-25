import { prisma } from "@/libs/prisma";
import { ApiRouteConstants } from "../../constants/api-route.constants";
import { LogService } from "./log.service";

export class PermissionService {
  logService: LogService;

  constructor(logService: LogService) {
    this.logService = logService;
  }

  async getApiRouteInfo(path: string, request: any) {
    try {
      const apiRoutes = await prisma.api_route.findMany();
      const correctApi = this.findCorrectApiPath(request, apiRoutes);
      const apiRouteInfo = await prisma.permission.findFirst({
        include: {
          api_route: true,
          permission_roles: {
            include: {
              role: true,
            },
          },
        },
        where: {
          api_route_id: correctApi == undefined ? 0 : correctApi.id,
        },
      });
      return apiRouteInfo;
    } catch (error) {
      throw error;
    }
  }

  async isUserHasAPermission(userPayload: any, permission_id: number) {
    try {
      if (!userPayload) {
        return false;
      }
      const user = await prisma.user.findFirst({
        include: {
          role: {
            include: {
              permission_roles: true,
            },
          },
        },
        where: {
          id: userPayload.id,
          role: {
            permission_roles: {
              some: {
                permission_id,
              },
            },
          },
        },
      });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  isPathHasAuthPass(path: string, request: any, authPassPaths: any[]): boolean {
    let isTrue = false;
    authPassPaths.forEach((authPassPath) => {
      if (authPassPath.hasParams) {
        const pathSplit = path.split("/");
        const authPassPathSplit = authPassPath.path.split("/");
        if (pathSplit.length === authPassPathSplit.length) {
          // pathlerin parçalanmıs hallerının eleman mıtkarı kontrol edılıyor
          let isSame = true;
          for (let i = 0; i < pathSplit.length; i++) {
            // pathlerin her bir elemanı kontrol ediliyor
            if (authPassPathSplit[i] === ApiRouteConstants.PARAM) {
              // eğer parametreyse kontrol edilmiyor VE BU SEKILDE o / x / arasındakı parametre degerıde pass gecılıyor
              continue;
            }
            if (pathSplit[i] !== authPassPathSplit[i]) {
              // eğer parametre değilse ve pathlerin elemanları eşit değilse false dönüyor
              isSame = false;
              break;
            }
          }
          if (isSame && authPassPath.method === request.method) {
            // eğer pathlerin elemanları eşitse ve parametre değilse true dönüyor
            isTrue = true;
          }
        }
      }
      if (path.includes(authPassPath.path)) {
        // eğer pathlerin parçalanmıs hallerının eleman mıtkarı eşit değilse ve pathlerin içerisinde authPassPath varsa true dönüyor
        if (authPassPath.method === request.method) {
          isTrue = true;
        }
      }
    });
    return isTrue;
  }

  findCorrectApiPath(request: any, apiRoutePaths: any[]): any {
    let path = request.nextUrl.pathname;
    let method = request.method;
    let realPath: any;
    apiRoutePaths.forEach((apiRoutePath) => {
      if (this.isPathSameAsApiRoute(path, apiRoutePath.path)) {
        if (apiRoutePath.method === method) {
          // Eğer methodlar eşitse direk döndürüyor
          realPath = apiRoutePath;
          return;
        }
      }
    });
    return realPath;
  }

  isPathSameAsApiRoute(path: string, apiRoutePath: string): boolean {
    const pathSegments = path.split("/");
    const apiRouteSegments = apiRoutePath.split("/");

    if (pathSegments.length !== apiRouteSegments.length) {
      return false;
    }

    for (let i = 0; i < pathSegments.length; i++) {
      if (apiRouteSegments[i] === ApiRouteConstants.PARAM) {
        continue;
      }

      if (pathSegments[i] !== apiRouteSegments[i]) {
        return false;
      }
    }
    return true;
  }
}
