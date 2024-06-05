import React, { useState } from "react";
import dayjs from "dayjs";
import Calendar from "../../components/Calendar/Calendar.js";
import Top_Bar from "../../components/Top_Bar/Top_Bar.js";
import "./WaterIntake.css";
import WavesCircle from "../../components/WavesCircle.jsx";
import DonutWaves from "../../components/DonutWaves.jsx";
import Add from "../../components/Add.js"

const data = {
  labels: ["Red", "Blue"],
  datasets: [
    {
      label: "Dataset 1",
      data: [90, 10],
      backgroundColor: ["#00bcd4", "#333333"],
      borderWidth: 5,
      borderColor: "#333333",
      borderRadius: 50,
    }
  ],
};

const options1 = {
  height: 120,
  borderWidth: 1,
  fullSize: true,
  radius: 200,
  cutout: "78.5%", // This changes the radius of the Doughnut hole.
  rotation: 0, // This rotates the chart by 90 degrees.
  // Add other options here
};

export default function WaterIntake() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  };

  return (
    <div>
      <Top_Bar pageValue={4} />
      <div className="calendar">
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>
      <DonutWaves data={data} options={options1} text={""} />
      <Add className="add_button"/>
      
    </div>
  );
}
