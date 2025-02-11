import React, { useEffect, useState } from "react";
// @ts-ignore
import styleEvent from "../Events.module.css";
import { ApiEvents, ApiUser } from "../../../../../shared/ApiStructure";
import { LoadingIndicator } from "../../loading/LoadingIndicator";
import { AllEvent } from "./AllEvent";
import { EventSorter, FilterOption } from "../../from/eventSorter/EventSorter";
interface Props {
  userinfo: ApiUser;
}

export function AllEventsWithDetails({ userinfo }: Props) {
  const [events, setEvents] = useState<ApiEvents[] | null>(null);
  const [filterOption, setFilterOption] = useState<FilterOption>({
    tittle: null,
    location: null,
    time: null,
    category: null,
    description: null,
  });
  const [errorMassage, setErrorMassage] = useState("");

  async function updateEvents() {
    let res;
    try {
      res = await fetch("/api/events");
    } catch (error) {
      setEvents([]);
      setErrorMassage("Server Not Response");
      return;
    }
    if (!res.ok) {
      setEvents([]);
      setErrorMassage(
        "Oops we couldn't load your events, please try again in a few minutes",
      );
      return;
    }
    const events: ApiEvents[] = await res.json();
    const value = Object.values(filterOption).find((option) => option !== null);
    if (value === undefined) {
      setEvents(events);
      return;
    }
    const filteredEvents = events.filter((event) => {
      let add = false;
      if (filterOption.tittle !== null && !add) {
        add = event.title
          .toLowerCase()
          .includes(filterOption.tittle.toLowerCase());
      }
      if (filterOption.description !== null && !add) {
        add = event.description
          .toLowerCase()
          .includes(filterOption.description.toLowerCase());
      }
      if (filterOption.location !== null && !add) {
        add = event.location
          .toLowerCase()
          .includes(filterOption.location.toLowerCase());
      }
      if (filterOption.category !== null && !add) {
        add = event.category === filterOption.category;
      }
      return add;
    });
    setErrorMassage("");
    setEvents(filteredEvents);
  }
  useEffect(() => {
    updateEvents();
  }, [filterOption]);

  async function getEvents() {
    try {
      setEvents(null);
      const res = await fetch("/api/events");
      if (res.ok) {
        const events: ApiEvents[] = await res.json();
        setErrorMassage("");
        setEvents(events);
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
      <div className={styleEvent.divAllEvents}>
        <h1>Events</h1>
        <div className={styleEvent.divAnonymousEvents}>
          <LoadingIndicator></LoadingIndicator>
        </div>
      </div>
    );

  return (
    <div className={styleEvent.divAllEvents}>
      <EventSorter
        setFilteredEvents={(filterOption: FilterOption) =>
          setFilterOption(filterOption)
        }
      />
      <h1>Events</h1>
      <p>{errorMassage}</p>
      {events.map((event) => (
        <AllEvent
          updateEvents={getEvents}
          userInfo={userinfo}
          key={event._id}
          eventsStructure={event}
        ></AllEvent>
      ))}
    </div>
  );
}
