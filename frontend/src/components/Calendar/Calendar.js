import React, { useState } from "react";
import "./Calendar.css";
import CalendarDialogue from "./CalendarDialogue";
import CalendarBottom from "./CalendarBottom";
import dayjs from 'dayjs';


function Calendar({ onDateChange }) {

  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem('selectedDate');
    return savedDate ? dayjs(savedDate) : dayjs();
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem('selectedDate', date.toString());
    if (onDateChange) {
      onDateChange(date);
    }
  }

  return (
    <div className="center">
      <div className="month">
        <CalendarDialogue selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>
      <CalendarBottom selectedDate={selectedDate} onDateChange={handleDateChange} />
      <div>
      </div>
    </div>
  );
}

export default Calendar;
