import React, { useEffect } from "react";
// @ts-ignore
import styleHomePage from "./FrontPage.module.css";
import { LoginButton } from "../button/LoginButton";
import { AnonymousEvents } from "../event/anonymous/AnonymousEvents";

export function FrontPage() {
  useEffect(() => {
    window.history.replaceState("", "", "/front");
  }, []);

  return (
    <div className={styleHomePage.holePageDiv}>
      <header className={styleHomePage.header}>
        <h1>Event Creator ()</h1>
      </header>
      <div className={styleHomePage.loginDiv}>
        <LoginButton
          value="Login With Google"
          loginUrl="/api/login/google"
        ></LoginButton>
        <LoginButton
          value="Login With Entra Id"
          loginUrl={"/api/login/microsoft"}
        ></LoginButton>
      </div>
      <div className={styleHomePage.eventsDiv}>
        <AnonymousEvents></AnonymousEvents>
      </div>
    </div>
  );
}
