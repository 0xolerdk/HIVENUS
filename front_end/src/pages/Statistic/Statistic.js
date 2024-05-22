import React from "react";
import "../Statistic/Statistic.css";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import Calendar from "../../components/Calendar/Calendar";
import Statistics from "../../components/Statistics";
import { BrowserRouter as Route, Routes, Link } from 'react-router-dom';


function Statistic() {
  return (
    <div className="">
      <div className="top_bar">
        <Top_Bar />
      </div>
      <div className="calendar">
        <Calendar />
      </div>
      <div>
        <Statistics />
      </div>
    </div>
  );
}

export default Statistic;
