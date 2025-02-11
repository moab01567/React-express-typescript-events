import React, { useEffect } from "react";
import { Header } from "../header/Header";
import { ApiUser } from "../../../../shared/ApiStructure";
import { OrganizerEvents } from "../event/organizer/OrganizerEvents";

interface Props {
  userinfo: ApiUser;
}

export function OrganizerEventPage({ userinfo }: Props) {
  useEffect(() => {
    window.history.replaceState("", "", "/organizer");
  }, []);

  return (
    <div>
      <Header eventsOrganizing={true}></Header>
      <OrganizerEvents userinfo={userinfo}></OrganizerEvents>
    </div>
  );
}
