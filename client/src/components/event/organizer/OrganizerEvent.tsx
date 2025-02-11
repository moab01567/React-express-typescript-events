import React, { useEffect } from "react";
// @ts-ignore
import styleEvent from "./../Events.module.css";
import {
  ApiEvents,
  ApiUser,
  EventCategory,
} from "../../../../../shared/ApiStructure";
import { UpdateEventButton } from "../../button/UpdateEventButton";
import { DeleteEventButton } from "../../button/DeleteEventButton";

interface Props {
  userInfo: ApiUser;
  eventsStructure: ApiEvents;
  updateEvents: () => void;
}

export function OrganizerEvent({
  userInfo,
  eventsStructure,
  updateEvents,
}: Props) {
  useEffect(() => {}, []);

  return (
    <div className={`${styleEvent.divEvent} ${styleEvent.divEventBlackBorder}`}>
      <UpdateEventButton
        eventStructure={eventsStructure}
        updateEvents={updateEvents}
      />
      <DeleteEventButton
        eventStructure={eventsStructure}
        updateEvents={updateEvents}
      ></DeleteEventButton>
      <h2>Event</h2>
      <div className={styleEvent.divEvent}>
        <p>Title: {eventsStructure?.title}</p>
        <p>Category: {EventCategory[eventsStructure?.category]}</p>
        <p>Time: {eventsStructure?.dateTime}</p>
        <p>Location: {eventsStructure?.location}</p>
        <p>Description: {eventsStructure?.description}</p>
      </div>
      <h2>Attending</h2>
      {eventsStructure.attendance.length === 0 ? "No one is attending" : ""}

      {eventsStructure.attendance.map((attended) => (
        <div className={styleEvent.divEventInfo}>
          <p>name: {attended.name}</p>
          <p>email: {attended.mailId}</p>
        </div>
      ))}
    </div>
  );
}
