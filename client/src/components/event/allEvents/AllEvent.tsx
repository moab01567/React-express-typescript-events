import React, { useEffect, useState } from "react";
// @ts-ignore
import styleEvent from "../Events.module.css";
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

export function AllEvent({ userInfo, eventsStructure, updateEvents }: Props) {
  const [open, setOpen] = useState(false);
  const [attending, setAttending] = useState(false);

  async function handleClickedUpdateAttending() {
    const res = await fetch(
      attending ? "/api/event/attending/remove" : "/api/event/attending/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: eventsStructure._id,
          attending: userInfo,
        }),
      },
    );
    if (res.ok) {
      updateEvents();
    }
  }

  function handleAllEventsClicked() {
    setOpen(!open);
  }

  useEffect(() => {
    const attending = eventsStructure.attendance.find(
      (attendance) => attendance.mailId === userInfo.mailId,
    );
    setAttending(attending !== undefined);
    console.log(userInfo);
    console.log(eventsStructure);
  }, []);
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
