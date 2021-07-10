import React, { useState } from "react";
import { Input } from "@material-ui/core";
import "./EventScheduler.css";
import { useStateValue } from "../../../StateProvider";
import db from "../firebase";

const EventScheduler = () => {
  const [{ user }, dispatch] = useStateValue();
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("events")
      .add({
        title: title,
        date: date,
        starttime: starttime,
        endtime: endtime,
        desc: desc,
        creator: user.displayName,
      })
      .then(() => {
        alert("Event has been created!");
      })
      .catch((error) => {
        alert(error.message);
      });

    setStarttime("");
    setEndtime("");
    setDesc("");
    setDate("");
    setTitle("");
  };

  return (
    <div>
      <div id="event-form-div" style={{display:"none"}}>
        <form id="event-form" onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            className="inputs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            id="desc"
            type="text"
            placeholder="Description"
            className="inputs"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>Date:</label>
          <input
            id="date"
            type="date"
            name="to_email"
            className="inputs"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div id="time">
            <div>
              <label>Start Time:</label>
              <input
                id="starttime"
                type="time"
                className="inputs"
                value={starttime}
                onChange={(e) => setStarttime(e.target.value)}
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                id="endtime"
                type="time"
                className="inputs"
                value={endtime}
                onChange={(e) => setEndtime(e.target.value)}
              />
            </div>
          </div>
          <input id="submit" type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
};

export default EventScheduler;
