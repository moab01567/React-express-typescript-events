import { ApiUser } from "../../../../shared/ApiStructure";
import React, { useEffect, useState } from "react";
import { Header } from "../header/Header";
// @ts-ignore
import ProfileStyle from "./ProfilePage.module.css";
interface Props {
  userinfo: ApiUser;
}

export function ProfilePage({ userinfo }: Props) {
  const [picture, setPicture] = useState<any>(userinfo.picture);

  async function getPicture() {
    const res = await fetch("/api/user/photo", {});
    if (res.ok) {
      const massage = await res.blob();

      setPicture(URL.createObjectURL(massage));
    } else {
      setPicture(null);
      console.log("not good");
    }
  }

  async function handleOnClickLogout() {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      window.location.reload();
    }
  }

  useEffect(() => {
    if (userinfo.loginType === "microsoft") {
      getPicture();
    }
    window.history.replaceState("", "", "/profile");
  }, []);

  return (
    <div>
      <Header profile={true}></Header>
      <div className={ProfileStyle.div}>
        {picture === null ? (
          <p>No Profile Picture </p>
        ) : (
          <img src={picture} alt="profile image" />
        )}
        <button onClick={handleOnClickLogout}> Logout</button>
      </div>
    </div>
  );
}
