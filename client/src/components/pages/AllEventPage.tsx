import React, { useEffect } from "react";

import { Header } from "../header/Header";
import { AllEventsWithDetails } from "../event/allEvents/AllEventsWithDetails";
import { ApiUser } from "../../../../shared/ApiStructure";

interface Props {
  userinfo: ApiUser;
}

export function AllEventPage({ userinfo }: Props) {
  useEffect(() => {
    window.history.replaceState("", "", "/events");
  }, []);

  return (
    <div>
      <Header allEvents={true}></Header>
      <AllEventsWithDetails userinfo={userinfo}></AllEventsWithDetails>
    </div>
  );
}
