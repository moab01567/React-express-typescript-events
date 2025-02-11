import React from "react";
// @ts-ignore
import LoginButtonStyle from "./LoginButton.module.css";
interface Props {
  loginUrl: string;
  value: string;
}

export function LoginButton({ value, loginUrl }: Props) {
  return (
    <a className={LoginButtonStyle.a} href={loginUrl}>
      {value}
    </a>
  );
}
