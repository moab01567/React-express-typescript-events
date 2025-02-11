import React, { useEffect, useState } from "react";
// @ts-ignore
import styleEvent from "../Events.module.css";
import { ApiEvents, ApiUser } from "../../../../../shared/ApiStructure";
import { LoadingIndicator } from "../../loading/LoadingIndicator";
import { OrganizerEvent } from "./OrganizerEvent";
import { CreateEventButton } from "../../button/CreateEventButton";

interface Props {
  userinfo: ApiUser;
}

export function OrganizerEvents({ userinfo }: Props) {
  const [events, setEvents] = useState<ApiEvents[] | null>(null);
  const [massage, setMassage] = useState("");

  async function getEvents() {
    try {
      const res = await fetch(`/api/event/organized/${userinfo.mailId}`);
      if (res.ok) {
        const events: ApiEvents[] = await res.json();
        setEvents(events);
        setMassage("You are not organizing any event");
      } else {
        setEvents([]);
        setMassage("You are not Organizing any events");
      }
    } catch (error) {
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
      <CreateEventButton
        updateEvents={getEvents}
        userInfo={userinfo}
      ></CreateEventButton>

      <h1>Events</h1>
      <p>{events.length === 0 ? massage : ""}</p>
      {events.map((event) => (
        <OrganizerEvent
          updateEvents={getEvents}
          userInfo={userinfo}
          key={event._id}
          eventsStructure={event}
        ></OrganizerEvent>
      ))}
    </div>
  );
}
