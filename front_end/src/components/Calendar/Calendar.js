import React, { useState, useEffect } from "react";
import "./Calendar.css";
import CalendarDialogue from "./Calendar_Dialogue";
import Calendar_Bottom from "./Calendar_Bottom";
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
      <Calendar_Bottom selectedDate={selectedDate} onDateChange={handleDateChange} />
      <div>
      </div>
    </div>
  );
}

export default Calendar;
