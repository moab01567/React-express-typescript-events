import React, { useState } from "react";
import {
  ApiCreateEvent,
  ApiMassageResponse,
  ApiUser,
  EventCategory,
} from "../../../../shared/ApiStructure";
// @ts-ignore
import styleCreateButton from "./CreateEventButton.module.css";

interface Props {
  userInfo: ApiUser;
  updateEvents: () => {};
}

export function CreateEventButton({ userInfo, updateEvents }: Props) {
  const [open, setOpen] = useState(false);
  const [tittle, setTittle] = useState("");
  const [category, setCategory] = useState<number>(0);
  const [place, setPlace] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [openErrorMassage, setOpenErrorMassage] = useState(false);
  const [badError, setBadError] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");

  function showMassage(massage: string, errorTpe: boolean) {
    setErrorMassage(massage);
    setBadError(errorTpe);
    setOpenErrorMassage(true);
    setTimeout(() => setOpenErrorMassage(false), 2000);
  }

  async function handleClickCreate() {
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
      organizer: userInfo,
      attendance: [],
    };
    const res = await fetch("/api/create/event", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      showMassage("Created", false);
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
          badError ? styleCreateButton.badError : styleCreateButton.goodError
        }
        open={openErrorMassage}
      >
        {errorMassage}
      </dialog>
      <button onClick={() => setOpen(!open)}>
        <h3>Create Event</h3>
      </button>
      <dialog open={open}>
        <div>
          <div className={styleCreateButton.dialogDivItems}>
            <p>Event Category:</p>
            <select
              value={category}
              onChange={(event) => setCategory(parseInt(event.target.value))}
            >
              {Object.entries(EventCategory)
                .filter(([key, value]) => !isNaN(Number(key)))
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
          <div className={styleCreateButton.dialogDivItems}>
            <p>Tittle: </p>
            <input
              onChange={(event) => setTittle(event.target.value)}
              type="text"
            />
          </div>
          <div className={styleCreateButton.dialogDivItems}>
            <p>Place: </p>
            <input
              onChange={(event) => setPlace(event.target.value)}
              type="text"
            />
          </div>
          <div className={styleCreateButton.dialogDivItems}>
            <p>Date and Time: </p>
            <input
              onChange={(event) => setDateTime(event.target.value)}
              type="datetime-local"
            />
          </div>
          <div className={styleCreateButton.dialogDivItems}>
            <p>Description: </p>
            <textarea
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              id="description"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <div className={styleCreateButton.dialogDivItems}>
            <button onClick={handleClickCreate}>Create</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
