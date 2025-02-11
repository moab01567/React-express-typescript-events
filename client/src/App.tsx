import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FrontPage } from "./components/pages/FrontPage";
import { AllEventPage } from "./components/pages/AllEventPage";
import { PrivetRouter } from "./components/pages/PrivetRouter";
import { EventAttendingPage } from "./components/pages/EventAttendingPage";
import { ApiUser } from "../../shared/ApiStructure";
import { OrganizerEventPage } from "./components/pages/OrganizerEventPage";
import { ProfilePage } from "./components/pages/ProfilePage";

export function App() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [userinfo, setUserinfo] = useState<ApiUser>({});
  const [massage, setMassage] = useState<null | string>(null);

  async function getUserInfo() {
    try {
      const res = await fetch("/api/user/details");
      if (res.ok) {
        const userinfo = await res.json();
        setUserinfo(userinfo);
        console.log(userinfo);
        setAuthenticated(true);
        setMassage(null);
      } else {
        setMassage(null);
        setAuthenticated(false);
      }
    } catch (error) {
      setMassage("We have problems with the server you can not login");
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  if (massage !== null) return <p>{massage}</p>;

  return (
    <BrowserRouter>
      <Routes>
        //dokuemntasjon på routers
        //https://www.w3schools.com/react/react_router.asp
        <Route
          index
          path="/front"
          element={
            <PrivetRouter
              status={authenticated}
              fallBack={<FrontPage />}
              access={<AllEventPage userinfo={userinfo} />}
            />
          }
        />
        <Route
          path="/events"
          element={
            <PrivetRouter
              status={authenticated}
              fallBack={<FrontPage />}
              access={<AllEventPage userinfo={userinfo} />}
            />
          }
        />
        <Route
          path="/attending"
          element={
            <PrivetRouter
              status={authenticated}
              fallBack={<FrontPage />}
              access={<EventAttendingPage userInfo={userinfo} />}
            />
          }
        />
        <Route
          path="/organizer"
          element={
            <PrivetRouter
              status={authenticated}
              fallBack={<FrontPage />}
              access={<OrganizerEventPage userinfo={userinfo} />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivetRouter
              status={authenticated}
              fallBack={<FrontPage />}
              access={<ProfilePage userinfo={userinfo} />}
            />
          }
        />
        <Route
          path="/*"
          element={
            <PrivetRouter
              status={authenticated}
              fallBack={<FrontPage />}
              access={<AllEventPage userinfo={userinfo} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
