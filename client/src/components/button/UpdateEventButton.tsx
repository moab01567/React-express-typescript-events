import React, { useState } from "react";
import {
  ApiCreateEvent,
  ApiEvents,
  ApiMassageResponse,
  EventCategory,
} from "../../../../shared/ApiStructure";
// @ts-ignore
import styleUpdateButton from "./UpdateEventButton.module.css";

interface Props {
  eventStructure: ApiEvents;
  updateEvents: () => void;
}

export function UpdateEventButton({ eventStructure, updateEvents }: Props) {
  const [open, setOpen] = useState(false);
  const [openErrorMassage, setOpenErrorMassage] = useState(false);
  const [badError, setBadError] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [tittle, setTittle] = useState(eventStructure.title);
  const [category, setCategory] = useState<number>(eventStructure.category);
  const [place, setPlace] = useState(eventStructure.location);
  const [dateTime, setDateTime] = useState(eventStructure.dateTime);
  const [description, setDescription] = useState(eventStructure.description);

  function showMassage(massage: string, badError: boolean) {
    setBadError(badError);
    setErrorMassage(massage);
    setOpenErrorMassage(true);
    setTimeout(() => setOpenErrorMassage(false), 2000);
  }

  async function handleClickUpdate() {
    if (
      [
        tittle.trim(),
        place.trim(),
        dateTime.trim(),
        description.trim(),
      ].includes("")
    ) {
      showMassage("Please fill out all the fields.", true);
      return;
    }
    const body: ApiCreateEvent = {
      title: tittle,
      description: description,
      category: category,
      location: place,
      dateTime: dateTime,
      organizer: eventStructure.organizer,
      attendance: eventStructure.attendance,
    };
    const res = await fetch(`/api/update/event/${eventStructure._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const resBody: ApiMassageResponse = await res.json();
      console.log(resBody);
      showMassage(resBody.massage, false);
      setOpen(!open);
      updateEvents();
    } else {
      const resBody: ApiMassageResponse = await res.json();
      showMassage(resBody.massage, true);
    }
  }

  return (
    <div>
      <dialog
        className={
          badError ? styleUpdateButton.badError : styleUpdateButton.goodError
        }
        open={openErrorMassage}
      >
        {errorMassage}
      </dialog>
      <button onClick={() => setOpen(!open)}>
        <h3>Update Event</h3>
      </button>
      <dialog open={open}>
        <div>
          <div className={styleUpdateButton.dialogDivItems}>
            <p>Event Category:</p>
            <select
              value={category}
              onChange={(event) => setCategory(parseInt(event.target.value))}
              name="categories"
              id="categories"
            >
              <option value={EventCategory.Food}>
                {EventCategory[EventCategory.Food]}
              </option>
              <option value={EventCategory.Sports}>
                {EventCategory[EventCategory.Sports]}
              </option>
              <option value={EventCategory.Conference}>
                {EventCategory[EventCategory.Conference]}
              </option>
              <option value={EventCategory.Expo}>
                {EventCategory[EventCategory.Expo]}
              </option>
              <option value={EventCategory.Concert}>
                {EventCategory[EventCategory.Concert]}
              </option>
              <option value={EventCategory.Political}>
                {EventCategory[EventCategory.Political]}
              </option>
              <option value={EventCategory.Religion}>
                {EventCategory[EventCategory.Religion]}
              </option>
              <option value={EventCategory.Protest}>
                {EventCategory[EventCategory.Protest]}
              </option>
            </select>
          </div>
          <div className={styleUpdateButton.dialogDivItems}>
            <p>Tittle: </p>
            <input
              value={tittle}
              onChange={(event) => setTittle(event.target.value)}
              type="text"
            />
          </div>
          <div className={styleUpdateButton.dialogDivItems}>
            <p>Place: </p>
            <input
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              type="text"
            />
          </div>
          <div className={styleUpdateButton.dialogDivItems}>
            <p>Date and Time: </p>
            <input
              value={dateTime}
              onChange={(event) => setDateTime(event.target.value)}
              type="datetime-local"
            />
          </div>
          <div className={styleUpdateButton.dialogDivItems}>
            <p>Description: </p>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              id="description"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <div className={styleUpdateButton.dialogDivItems}>
            <button onClick={handleClickUpdate}>Update</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
