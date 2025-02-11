import React, { useEffect } from "react";
import { Header } from "../header/Header";
import { AttendingEvents } from "../event/attending/AttendingEvents";
import { ApiUser } from "../../../../shared/ApiStructure";

interface Props {
  userInfo: ApiUser;
}

export function EventAttendingPage({ userInfo }: Props) {
  useEffect(() => {
    window.history.replaceState("", "", "/attending");
  }, []);

  return (
    <div>
      <Header eventsAttending={true}></Header>
      <AttendingEvents userinfo={userInfo}></AttendingEvents>
    </div>
  );
}
