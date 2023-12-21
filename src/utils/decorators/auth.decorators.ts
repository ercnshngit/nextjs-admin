import "reflect-metadata";

export const AUTH_METADATA_KEY = "custom:auth";
export const AUTH_PASS_METADATA_KEY = "custom:auth-pass";

export function Auth() {
    console.log("Auth Decorator");
    return Reflect.metadata(AUTH_METADATA_KEY, true);
}