import React, { useState, useEffect } from "react";
import "./Statistics.css";
import Donut from "../Donut";
import NutrientDonut from "../CaloriesIntake/NutrientDonut";
import FCD from "../../services/FCDService";
import dayjs from "dayjs";
import WaterIntakeService from "../../services/WaterIntakeService";
import SleepTrackService from "../../services/SleepTrackService";
import SleepDonut from "../SleepTrack/SleepDonutStat";
import SettingsService from "../../services/SettingsService"; // Import SettingsService

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
  const [settings, setSettings] = useState({
    maxEnergy: 2000,
    maxProtein: 50,
    maxFat: 70,
    maxCarbs: 300,
    maxWater: 2000,
    minSleep: 8 * 60, // Default to 8 hours in minutes
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const fetchedSettings = await SettingsService.getSettings();
        setSettings({
          maxEnergy: fetchedSettings.maxEnergy,
          maxProtein: fetchedSettings.maxProtein,
          maxFat: fetchedSettings.maxFat,
          maxCarbs: fetchedSettings.maxCarbs,
          maxWater: fetchedSettings.maxWater,
          minSleep: fetchedSettings.minSleep * 60, // Convert hours to minutes
        });
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    const fetchData = async () => {
      const savedDate = dayjs(localStorage.getItem("selectedDate"));
      selectedDate = savedDate;

      try {
        const nutrient = await FCD.calculateDailyNutrients(selectedDate.format("YYYY-MM-DD"));
        setTotalNutrients(nutrient);
      } catch (error) {
        console.error("Error fetching daily nutrients:", error);
      }
    };

    const fetchWaterData = async (date) => {
      try {
        const response = await WaterIntakeService.getWaterDataByDate(date.format('YYYY-MM-DD'));
        const waterIntakes = response.data;
        const totalIntake = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0);
        const cappedIntake = Math.min(totalIntake, settings.maxWater);
        setWaterData({ consumed: cappedIntake, remaining: settings.maxWater - cappedIntake });
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };

    const fetchSleepData = async (date) => {
      try {
        const response = await SleepTrackService.getSleepDataByDate(date.format('YYYY-MM-DD'));
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

    fetchUserSettings().then(() => {
      fetchData();
      fetchWaterData(selectedDate);
      fetchSleepData(selectedDate);
    });
  }, [selectedDate, settings.maxWater]);

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
                    backgroundColor: ["#00bcd4", "rgba(0, 0, 0, 0.1)"],
                    borderWidth: 5,
                    borderColor: "rgba(0, 0, 0, 0.1)",
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
              link={"/main/sleep_track"}
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
