import React, { useState } from "react";
import "../Statistic/Statistic.css";
import TopBar from "../../components/TopBar/TopBar";
import Calendar from "../../components/Calendar/Calendar";
import Statistics from "../../components/Statistic/Statistics";
import dayjs from "dayjs";



function Statistic() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  };

  return (
    <div className="">
      <div className="top_bar">
        <TopBar />
      </div>
      <div className="calendar" >
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
      </div>
        <div className="center" style={{height:"40px", marginTop: "20px"}}>
          {/* <Add/> */}
        </div>
      <div className="statistics">
        <Statistics selectedDate={selectedDate}/>
      </div>
    </div>
  );
}

export default Statistic;
