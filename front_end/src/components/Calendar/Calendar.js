import React, { useState } from "react";
import "./Calendar.css";
import Donut from "../Donut";
import CalendarDialogue from "./Calendar_Dialogue";
import Calendar_Bottom from "./Calendar_Bottom";
import dayjs from 'dayjs';


function Calendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div className="center">
      <div className="month">
        <CalendarDialogue selectedDate={selectedDate} onDateChange={setSelectedDate}/>
      </div>
      <Calendar_Bottom selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <div>
      </div>
    </div>
  );
}

export default Calendar;
