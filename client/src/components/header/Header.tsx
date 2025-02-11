import React from "react";
// @ts-ignore
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  allEvents?: boolean;
  eventsAttending?: boolean;
  eventsOrganizing?: boolean;
  profile?: boolean;
}

export function Header({
  allEvents = false,
  eventsAttending = false,
  eventsOrganizing = false,
  profile = false,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <h1>Event Creator</h1>
      <nav>
        <button
          onClick={() => navigate("/events")}
          className={allEvents ? style.navInputClicked : style.navInput}
        >
          All Events
        </button>
        <button
          onClick={() => navigate("/attending")}
          className={eventsAttending ? style.navInputClicked : style.navInput}
        >
          Events Attending
        </button>
        <button
          onClick={() => navigate("/organizer")}
          className={eventsOrganizing ? style.navInputClicked : style.navInput}
        >
          Events Organizing
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={profile ? style.navInputClicked : style.navInput}
        >
          Profile
        </button>
      </nav>
    </div>
  );
}
