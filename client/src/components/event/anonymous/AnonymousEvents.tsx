import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../../loading/LoadingIndicator";
import { ApiGetAnonymousEvents } from "../../../../../shared/ApiStructure";
// @ts-ignore
import styleEvent from "../Events.module.css";
import { AnonymousEvent } from "./AnonymousEvent";

export function AnonymousEvents() {
  const [events, setEvents] = useState<ApiGetAnonymousEvents[] | null>(null);
  const [errorMassage, setErrorMassage] = useState("");

  async function getEvents() {
    try {
      const res = await fetch("/api/anonymous/events");
      if (res.ok) {
        const Events: ApiGetAnonymousEvents[] = await res.json();
        setErrorMassage("");
        setEvents(Events);
      } else {
        setEvents([]);
        setErrorMassage("No Events");
      }
    } catch (error) {
      setEvents([]);
      setErrorMassage(
        "Oops we couldn't load your events, please try again in a few minutes",
      );
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (events === null)
    return (
      <div>
        <h2>Events</h2>
        <div className={styleEvent.divAnonymousEvents}>
          <LoadingIndicator></LoadingIndicator>
        </div>
      </div>
    );

  return (
    <div>
      <h2>Events</h2>
      <div className={styleEvent.divAnonymousEvents}>
        <p>{errorMassage}</p>
        {events.map((event: ApiGetAnonymousEvents) => (
          <AnonymousEvent id={event._id} title={event.title} key={event._id} />
        ))}
      </div>
    </div>
  );
}
