import React, { useState } from "react";
import { ApiEvents, ApiMassageResponse } from "../../../../shared/ApiStructure";
// @ts-ignore
import styleCreateButton from "./UpdateEventButton.module.css";

interface Props {
  eventStructure: ApiEvents;
  updateEvents: () => void;
}

export function DeleteEventButton({ eventStructure, updateEvents }: Props) {
  const [openErrorMassage, setOpenErrorMassage] = useState(false);
  const [badError, setBadError] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");

  function showMassage(massage: string, badError: boolean) {
    setBadError(badError);
    setErrorMassage(massage);
    setOpenErrorMassage(true);
    setTimeout(() => setOpenErrorMassage(false), 2000);
  }

  async function handleClickDelete() {
    const res = await fetch(`/api/delete/event/${eventStructure._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      showMassage("Successfully Deleted", false);
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
      <button onClick={handleClickDelete}>
        <h3>Delete Event</h3>
      </button>
    </div>
  );
}
