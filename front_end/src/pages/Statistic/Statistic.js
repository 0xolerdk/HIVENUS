import React from "react";
import "../Statistic/Statistic.css";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import Calendar from "../../components/Calendar/Calendar";
import Statistics from "../../components/Statistics";
import Add from "../../components/Add"

function Statistic() {
  return (
    <div className="">
      <div className="top_bar">
        <Top_Bar />
      </div>
      <div className="calendar" >
        <Calendar />
      </div>
        <div className="center" style={{height:"40px", marginTop: "20px"}}>
          {/* <Add/> */}
        </div>
      <div>
        <Statistics />
      </div>
    </div>
  );
}

export default Statistic;
