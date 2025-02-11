import express, { Express } from "express";
import { authRoutes, LoginType } from "./authRoutes";
import { eventRoutes } from "./eventRoutes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userRoutes } from "./userRoutes";
dotenv.config();

export const googleLogin: LoginType = {
  urlPath: "google",
  openIdConfigURL:
    "https://accounts.google.com/.well-known/openid-configuration",
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  scope: "openid profile email",
  admin: false,
};
export const microsoftOnlineLogin: LoginType = {
  urlPath: "microsoft",
  openIdConfigURL:
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration",
  clientId: process.env.MICROSOFT_CLIENT_ID || "",
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
  scope: "openid email profile offline_access",
  admin: true,
};
const db = process.env.DB_NAME || "";
const uri = process.env.DB_URI || "";
const port = process.env.PORT || "3000";

console.log(googleLogin)
export const app: Express = express();
app.listen(port);
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes(googleLogin, uri, db));
app.use(authRoutes(microsoftOnlineLogin, uri, db));
app.use(userRoutes(uri, db));
app.use(eventRoutes(uri, db));
app.use("/", express.static("../client/dist"));
app.use("*", express.static("../client/dist"));
