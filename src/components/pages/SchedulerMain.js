import React, { Component } from "react";
import Scheduler from "./scheduler/Scheduler";
import Sidebar from "../Sidebar";
import Header from "../Header";
import "../css/SchedulerMain.css";

const data = [
  {
    start_date: "2020-06-10 6:00",
    end_date: "2020-06-10 8:00",
    text: "Event 1",
    id: 1,
  },
  {
    start_date: "2020-06-13 10:00",
    end_date: "2020-06-13 18:00",
    text: "Event 2",
    id: 2,
  },
];

class SchedulerMain extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id="SchedulerMainPage">
          <Sidebar />
          <div className="scheduler-container">
            <Scheduler events={data} />
          </div>
        </div>
      </div>
    );
  }
}
export default SchedulerMain;
