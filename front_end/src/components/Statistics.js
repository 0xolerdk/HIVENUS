import React, { useState, useEffect } from "react";
import "./Statistics.css";
import Donut from "./Donut";
import NutrientDonut from "./NutrientDonut";
import FCD from "../service/FCDLogic";
import dayjs from "dayjs";
import DonutWaves from "./DonutWaves";

const dataW = {
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

const optionsW = {
  height: 120,
  borderWidth: 1,
  fullSize: true,
  radius: 140,
  cutout: "78.5%", // This changes the radius of the Doughnut hole.
  rotation: 0, // This rotates the chart by 90 degrees.
  // Add other options here
};

const data = {
  labels: ["Red", "Blue"],
  datasets: [
    {
      label: "Dataset 1",
      data: [90, 10],
      backgroundColor: ["#4caf50", "#333333"],
      borderWidth: 5,
      borderColor: "#333333",
      borderRadius: 10,
    },
    {
      label: "Dataset 2",
      data: [60, 40],
      backgroundColor: ["#00bcd4", "#333333"],
      borderWidth: 4,
      borderColor: "#333333",
      borderRadius: 10,
    },
    {
      label: "Dataset 3",
      data: [70, 30],
      backgroundColor: ["#e91e63", "#333333"],
      borderWidth: 3,
      borderColor: "#333333",
      borderRadius: 10,
      hoverOffset: 4,
    },
  ],
};

const options1 = {
  height: 120,
  borderWidth: 1,
  fullSize: false,
  radius: 140,
  cutout: "60%", // This changes the radius of the Doughnut hole.
  rotation: 0, // This rotates the chart by 90 degrees.
  // Add other options here
};
const options2 = {
  borderWidth: 1,
  fullSize: false,
  radius: 150,
  cutout: "50%",
  rotation: 0,
  height: 120,
};
function Calendar({ selectedDate }) {
  const [totalNutrients, setTotalNutrients] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const savedDate = dayjs(localStorage.getItem("selectedDate"));
      selectedDate = savedDate;

      try {
        const nutrient = await FCD.calculateDailyNutrients(selectedDate.format("YYYY-MM-DD"), token);
        setTotalNutrients(nutrient);
      } catch (error) {
        console.error("Error fetching daily nutrients:", error);
      }
    };
    fetchData();
  }, [selectedDate]); // Add selectedDate as a dependency

  return (
    <div className="statistics">
      <div className="row">
      

        <Donut
          data={data}
          options={options1}
          text="Sleep"
          link="/main/sleep_track"
        />
        <NutrientDonut 
      selectedDate={selectedDate}
      text="Food Intake"
      link="/main/calories_intake"
      font_size={1.5}
      height={"300px"}
      options={options2}
      totalNutrients={totalNutrients}/>
              <Donut
          data={dataW}
          options={optionsW}
          text="Water Intake"
          font_size={2}
          link="/main/water_intake"
        />
      </div>
    </div>
  );
}

export default Calendar;
