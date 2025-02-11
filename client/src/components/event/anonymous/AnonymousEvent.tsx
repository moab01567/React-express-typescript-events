import React, { useState } from "react";
// @ts-ignore
import styleEvent from "../Events.module.css";

interface Props {
  id: string;
  title: string;
}

export function AnonymousEvent({ title, id }: Props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
    setTimeout(() => setOpen(open), 1000);
  }

  return (
    <div
      onClick={handleClick}
      className={`${styleEvent.divEvent} ${styleEvent.divEventBlackBorder}`}
    >
      {title}
      <dialog open={open}>Login to see more details</dialog>
    </div>
  );
}
