import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { addNewUser } from "./dbService";
import { ApiMassageResponse } from "../shared/ApiStructure";

dotenv.config();

export interface LoginType {
  urlPath: string;
  openIdConfigURL: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  admin: boolean;
}

export function authRoutes(loginType: LoginType, uri: string, db: string) {
  const authApi: Router = express.Router();

  authApi.get(
    `/api/login/${loginType.urlPath}`,
    async (req: Request, res: Response) => {
      const { authorization_endpoint } = await fetch(
        loginType.openIdConfigURL,
      ).then((res) => res.json());
      const authUrlBuilder = new URL(authorization_endpoint);
      authUrlBuilder.searchParams.append("scope", loginType.scope);
      authUrlBuilder.searchParams.append("response_type", "code");
      authUrlBuilder.searchParams.append(
        "redirect_uri",
        `${process.env.ORIGIN || "http://localhost:3000"}/api/login/${loginType.urlPath}/callback`,
      );
      authUrlBuilder.searchParams.append("client_id", loginType.clientId);
      res.redirect(authUrlBuilder.toString());
    },
  );
  async function getUserData(
    userinfo_endpoint: string,
    token_type_access_token: string,
  ) {
    return await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `${token_type_access_token}`,
      },
    }).then((res) => res.json());
  }



  authApi.get(
    `/api/login/${loginType.urlPath}/callback`,
    async (req: Request, res: Response) => {
      const { token_endpoint, userinfo_endpoint } = await fetch(
        loginType.openIdConfigURL,
      ).then((res) => res.json());
      console.log(req.query.code);
      const requestBody = `grant_type=authorization_code&client_id=${loginType.clientId}&client_secret=${loginType.clientSecret}&code=${req.query.code}&redirect_uri=${process.env.ORIGIN || "http://localhost:3000"}/api/login/${loginType.urlPath}/callback`;

      const { token_type, access_token } = await fetch(token_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: requestBody,
      })
        .then((response) => response.json())
        .catch((error) => console.error(error));

      const data: any = await getUserData(
        userinfo_endpoint,
        `${token_type} ${access_token}`,
      );

      console.log(data);
      const dataBaseStatus: ApiMassageResponse = await addNewUser(uri, db, {
        name: data.name,
        admin: loginType.admin,
        mailId: data.email,
        picture: data.picture,
        loginType: loginType.urlPath,
      });
      if (dataBaseStatus.ok) {
        res.cookie("token_type_access_token", `${token_type} ${access_token}`);
        res.cookie("openid_config", loginType.openIdConfigURL);
        res.redirect(process.env.ORIGIN || "http://localhost:5173");
      }
    },
  );

  authApi.get("/api/auth/logout", (req, res) => {
    res.clearCookie("token_type_access_token");
    res.clearCookie("openid_config");
    const massage: ApiMassageResponse = {
      status: 200,
      massage: "logged out",
      ok: true,
    };
    res.status(massage.status);
    res.send(massage);
  });

  return authApi;
}
