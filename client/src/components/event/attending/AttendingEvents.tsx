import React, { useEffect, useState } from "react";
// @ts-ignore
import styleEvent from "../Events.module.css";
import { ApiEvents, ApiUser } from "../../../../../shared/ApiStructure";
import { LoadingIndicator } from "../../loading/LoadingIndicator";
import { AttendingEvent } from "./AttendingEvent";

interface Props {
  userinfo: ApiUser;
}

export function AttendingEvents({ userinfo }: Props) {
  const [events, setEvents] = useState<ApiEvents[] | null>(null);
  const [massage, setMassage] = useState("");

  async function getEvents() {
    try {
      const res = await fetch(`/api/event/attending/${userinfo.mailId}`);
      if (res.ok) {
        const events: ApiEvents[] = await res.json();
        setEvents(events);
        setMassage("You are not attending any events");
      } else {
        setEvents([]);
        setMassage("No events");
      }
    } catch (e) {
      setEvents([]);
      setMassage(
        "Oops we couldn't load your events, please try again in a few minutes",
      );
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (events === null)
    return (
      <div className={styleEvent.divAllEvents}>
        <h1>Events</h1>
        <div className={styleEvent.divAnonymousEvents}>
          <LoadingIndicator></LoadingIndicator>
        </div>
      </div>
    );

  return (
    <div className={styleEvent.divAllEvents}>
      <h1>Events</h1>
      <p>{events.length === 0 ? massage : ""}</p>
      {events.map((event) => (
        <AttendingEvent
          updateEvents={getEvents}
          userInfo={userinfo}
          key={event._id}
          eventsStructure={event}
        ></AttendingEvent>
      ))}
    </div>
  );
}
