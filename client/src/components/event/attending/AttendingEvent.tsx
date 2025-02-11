import React, { useEffect, useState } from "react";
// @ts-ignore
import styleEvent from "./../Events.module.css";
import {
  ApiEvents,
  ApiUser,
  EventCategory,
} from "../../../../../shared/ApiStructure";

interface Props {
  userInfo: ApiUser;
  eventsStructure: ApiEvents;
  updateEvents: () => void;
}

export function AttendingEvent({
  userInfo,
  eventsStructure,
  updateEvents,
}: Props) {
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState(false);

  async function handleClickedUpdateAttending() {
    await fetch(
      attending ? "/api/event/attending/remove" : "/api/event/attending/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: eventsStructure?._id,
          attending: userInfo,
        }),
      },
    );
    updateEvents();
  }

  useEffect(() => {
    const attending = eventsStructure.attendance.find(
      (attendance) => attendance.mailId === userInfo.mailId,
    );
    setAttending(attending !== undefined);
  }, []);

  function handleAllEventsClicked() {
    setOpen(!open);
  }
  return (
    <div
      onClick={handleAllEventsClicked}
      className={`${styleEvent.divEvent} ${attending ? styleEvent.divEventGreenBorder : styleEvent.divEventBlackBorder}`}
    >
      <h2>Event</h2>
      <div className={styleEvent.divEvent}>
        <p>Title: {eventsStructure?.title}</p>
        <p>Category: {EventCategory[eventsStructure?.category]}</p>
        <p>Time: {eventsStructure?.dateTime}</p>
        <p>Location: {eventsStructure?.location}</p>
        <p>Description: {eventsStructure?.description}</p>
      </div>

      <h2>Organizer</h2>
      <div className={styleEvent.divEventInfo}>
        <p>Name: {eventsStructure?.organizer.name}</p>
        <p>Email: {eventsStructure?.organizer.mailId}</p>
      </div>

      <dialog open={open}>
        <button onClick={handleClickedUpdateAttending}>
          {attending ? "Remove From Attending " : "Add to Attending"}
        </button>
      </dialog>
    </div>
  );
}
