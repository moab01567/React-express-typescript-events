import request from "supertest";
import { describe, test, expect } from "vitest";
import dotenv from "dotenv";
import express from "express";
import { authRoutes } from "../authRoutes";
import { googleLogin, microsoftOnlineLogin } from "../server";
dotenv.config();
const app = express();
app.use(express.json());
const uri = process.env.DB_URI || "";
const db = process.env.DB_NAME_TEST || "";
app.use(authRoutes(googleLogin, uri, db));

describe("checking admin config", () => {
  test("checking google admin", () => {
    expect(googleLogin.admin).toBeFalsy;
  });
  test("checking microsoft admin", () => {
    expect(microsoftOnlineLogin.admin).toBeTruthy;
  });
});

describe("checking login path", () => {
  test("checking microsoft path", () => {
    expect(googleLogin.urlPath).toBe("google");
  });
  test("checking microsoft admin", () => {
    expect(microsoftOnlineLogin.urlPath).toBe("microsoft");
  });
});

describe("GET /api/login/${loginType.urlPath}", async () => {
  const { authorization_endpoint } = await fetch(
    googleLogin.openIdConfigURL,
  ).then((res) => res.json());
  const authUrlBuilder = new URL(authorization_endpoint);
  authUrlBuilder.searchParams.append("scope", googleLogin.scope);
  authUrlBuilder.searchParams.append("response_type", "code");
  authUrlBuilder.searchParams.append(
    "redirect_uri",
    `${process.env.ORIGIN || "http://localhost:3000"}/api/login/${googleLogin.urlPath}/callback`,
  );
  authUrlBuilder.searchParams.append("client_id", googleLogin.clientId);
  test("try to get redirected to google", async () => {
    const res = await request(app).get("/api/login/google");
    expect(new URL(res.headers.location).href).toBe(authUrlBuilder.href);
  });
});
