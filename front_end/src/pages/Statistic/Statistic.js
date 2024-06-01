import React, { useState } from "react";
import "../Statistic/Statistic.css";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import Calendar from "../../components/Calendar/Calendar";
import Statistics from "../../components/Statistics";
import dayjs from "dayjs";
import { useEffect } from "react";
import FCD from "../../service/FCDLogic";


function Statistic() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  };

  return (
    <div className="">
      <div className="top_bar">
        <Top_Bar />
      </div>
      <div className="calendar" >
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
      </div>
        <div className="center" style={{height:"40px", marginTop: "20px"}}>
          {/* <Add/> */}
        </div>
      <div>
        <Statistics selectedDate={selectedDate}/>
      </div>
    </div>
  );
}

export default Statistic;
