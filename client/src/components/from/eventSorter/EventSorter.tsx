// @ts-ignore
import style from "./EventSorter.module.css";
import React, { useEffect, useState } from "react";
import { EventCategory } from "../../../../../shared/ApiStructure";

export interface FilterOption {
  tittle: string | null;
  category: number | null;
  time: string | null;
  location: string | null;
  description: string | null;
}

interface Props {
  setFilteredEvents: (filterOption: FilterOption) => void;
}

export function EventSorter({ setFilteredEvents }: Props) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(-1);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [tittle, setTittle] = useState("");

  useEffect(() => {
    setFilteredEvents({
      tittle: tittle.length === 0 ? null : tittle,
      location: location.length === 0 ? null : location,
      time: time.length === 0 ? null : time,
      category: category === -1 ? null : category,
      description: description.length === 0 ? null : description,
    });
  }, [tittle, description, time, location, category]);

  // @ts-ignore
  return (
    <div className={style.div}>
      <h1>Filter Events</h1>
      <div className={style.divAllItems}>
        <div className={style.divItems}>
          <p>Tittle: </p>
          <input
            onChange={(event) => setTittle(event.target.value)}
            type="text"
          />
        </div>
        <div className={style.divItems}>
          <p>Location: </p>
          <input
            onChange={(event) => setLocation(event.target.value)}
            type="text"
          />
        </div>
        <div className={style.divItems}>
          <p>Date Time: </p>
          <input
            onChange={(event) => setTime(event.target.value)}
            type="datetime-local"
          />
        </div>
        <div className={style.divItems}>
          <p>Category: </p>
          <select
            onChange={(event) => setCategory(parseInt(event.target.value))}
          >
            <option value={-1}>None</option>
            {Object.entries(EventCategory)
              .filter(([key, value]) => !isNaN(Number(key)))
              .map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={style.divItems}>
        <p>Description: </p>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          cols={30}
          rows={10}
        ></textarea>
      </div>
    </div>
  );
}
