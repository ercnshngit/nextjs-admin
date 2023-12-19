import React from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/libs/jose";
import { JWTPayload, decodeJwt } from "jose";

const fromServer = async () => {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value: token } = cookieList.get("token") || { value: null };
  const verifiedToken = await verifyJwtToken(token);

  return verifiedToken;
};

// TODO: this `useAuth` creates a vulnerability issue because it needs to have
// verifyJwtToken which works with process.env.JWT_SECRET_KEY which is not
// initially available on the client side. This is why we shouldn't rely on
// this hook if we really don't need to use.
// Alternatively we can have an API route to to verification on the server layer.
export function useAuth() {
  // Have also loading state to not show flickering to user
  const [auth, setAuth] = React.useState<JWTPayload | null>(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") || null;
    //TODO: verifytoken ayarla
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };

  React.useEffect(() => {
    getVerifiedtoken();
  }, []);

  return auth;
}

export function useUser() {
  // Have also loading state to not show flickering to user
  const [user, setUser] = React.useState<JWTPayload | null>(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") || null;
    console.log(token);
    //TODO: verifytoken ayarla
    const verifiedToken = await verifyJwtToken(token);
    const decodedToken =
      verifiedToken && (await decodeJwt(verifiedToken.toString()));
    setUser(decodedToken);
  };

  React.useEffect(() => {
    getVerifiedtoken();
  }, []);

  return user;
}

useAuth.fromServer = fromServer;
