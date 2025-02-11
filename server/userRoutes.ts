import { Request, Response, Router } from "express";
import { getUserFromDatabase } from "./dbService";
import { ApiMassageResponse } from "../shared/ApiStructure";

export async function getPicture(
  token_type_access_token: string,
): Promise<ApiMassageResponse> {
  const photoResponse = await fetch(
    "https://graph.microsoft.com/v1.0/me/photo/$value",
    {
      method: "GET",
      headers: {
        Authorization: token_type_access_token,
      },
    },
  );
  if (photoResponse.ok) {
    const photoResponseBody = await photoResponse.arrayBuffer();
    return {
      ok: true,
      status: photoResponse.status,
      massage: "Picture in body",
      data: photoResponseBody,
    };
  } else {
    return {
      ok: false,
      status: photoResponse.status,
      massage: "can not get picture",
    };
  }
}

export function userRoutes(uri: string, db: string) {
  const userApi: Router = Router();

  userApi.get("/api/user/details", async (req: Request, res: Response) => {
    const { openid_config, token_type_access_token } = req.cookies;

    if (openid_config === undefined || token_type_access_token === undefined) {
      res.status(401).send({ massage: "Something went wrong" });
      return;
    }
    const { userinfo_endpoint } = await fetch(openid_config).then((res) =>
      res.json(),
    );
    const userInfo = await fetch(userinfo_endpoint, {
      headers: {
        Authorization: `${token_type_access_token}`,
      },
    });
    if (userInfo.ok) {
      const userInfoBody = await userInfo.json();
      res.send(await getUserFromDatabase(uri, db, userInfoBody.email));
      return;
    }
    res.status(401).send({ massage: "Something went wrong" });
  });

  userApi.get("/api/user/photo", async (req, res) => {
    const { openid_config, token_type_access_token } = req.cookies;

    if (openid_config === undefined || token_type_access_token === undefined) {
      const massage: ApiMassageResponse = {
        ok: false,
        status: 401,
        massage: "missing token",
      };
      res.status(massage.status).send(massage);
      return;
    }
    const massage: ApiMassageResponse = await getPicture(
      token_type_access_token,
    );

    if (massage.ok) {
      res.setHeader("Content-Type", "image/jpeg");
      res.send(Buffer.from(massage.data));
    } else {
      res.status(massage.status);
      res.send(massage);
    }
  });

  return userApi;
}
