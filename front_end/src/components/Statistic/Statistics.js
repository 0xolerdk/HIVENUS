import React, { useState, useEffect } from "react";
import "./Statistics.css";
import Donut from "../Donut";
import NutrientDonut from "../CaloriesIntake/NutrientDonut";
import FCD from "../../services/FCDLogic";
import dayjs from "dayjs";
import WaterIntakeService from "../../services/WaterIntakeService";
import SleepTrackService from "../../services/SleepTrackService";
import SleepDonut from "../SleepTrack/SleepDonutStat";

const optionsW = {
  height: 120,
  borderWidth: 1,
  fullSize: true,
  radius: 140,
  cutout: "78.5%",
  rotation: 0,
};

const options1 = {
  height: 120,
  borderWidth: 1,
  fullSize: false,
  radius: 140,
  cutout: "80%",
  rotation: 0,
};

const options2 = {
  borderWidth: 1,
  fullSize: false,
  radius: 140,
  cutout: "50%",
  rotation: 0,
  height: 120,
};

function Statistics({ selectedDate }) {
  const [totalNutrients, setTotalNutrients] = useState({});
  const [waterData, setWaterData] = useState({ consumed: 0, remaining: 2000 });
  const [sleepDuration, setSleepDuration] = useState(0);

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

    const fetchWaterData = async (date) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await WaterIntakeService.getWaterDataByDate(date.format('YYYY-MM-DD'), token);
        const waterIntakes = response.data;
        const totalIntake = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0);
        const cappedIntake = Math.min(totalIntake, 2000);
        setWaterData({ consumed: cappedIntake, remaining: 2000 - cappedIntake });
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    const fetchSleepData = async (date) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await SleepTrackService.getSleepDataByDate(date.format('YYYY-MM-DD'), token);
        const sleepData = response.data;

        if (sleepData) {
          const duration = calculateSleepDuration(sleepData.startTime, sleepData.endTime);
          setSleepDuration(duration);
        } else {
          setSleepDuration(0);
        }
      } catch (error) {
        console.error("Error fetching sleep data:", error);
      }
    };

    const calculateSleepDuration = (startMinutes, endMinutes) => {
      if (endMinutes < startMinutes) {
        return (1440 - startMinutes) + endMinutes;
      }
      return endMinutes - startMinutes;
    };

    fetchData();
    fetchWaterData(selectedDate);
    fetchSleepData(selectedDate);
  }, [selectedDate]);

  return (
      <div className="statistics">
        <div className="row">
          <Donut
              data={{
                labels: ["Consumed", "Remaining"],
                datasets: [
                  {
                    label: "Water Intake",
                    data: [waterData.consumed, waterData.remaining],
                    backgroundColor: ["#00bcd4", "#333333"],
                    borderWidth: 5,
                    borderColor: "#333333",
                    borderRadius: 50,
                  }
                ],
              }}
              options={optionsW}
              text="Water Intake"
              font_size={2}
              link="/main/water_intake"
          />
          <SleepDonut
              duration={sleepDuration}
              options={options1}
              width={300}
              height={300}
              font_size={10}
          />
          <NutrientDonut
              selectedDate={selectedDate}
              text="Food Intake"
              link="/main/calories_intake"
              font_size={1.5}
              height={"300px"}
              options={options2}
              totalNutrients={totalNutrients}
          />
        </div>
      </div>
  );
}

export default Statistics;
