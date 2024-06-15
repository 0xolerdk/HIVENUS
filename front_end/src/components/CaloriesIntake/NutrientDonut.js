import React, { useEffect, useState } from "react";
import Donut from "../Donut";
import UserSettingsService from "../../services/SettingsService"; // Assuming you have a UserSettingsService to fetch user settings

function calculateRemaining(nutrient, dailyNorm) {
  return nutrient > dailyNorm ? 0 : dailyNorm - nutrient;
}

function calculateExcess(nutrient, dailyNorm) {
  return nutrient > dailyNorm ? nutrient - dailyNorm : 0;
}

function NutrientDonut({ totalNutrients, width, height, text, font_size, link, options, tooltip, anim }) {
  const [userSettings, setUserSettings] = useState({
    maxEnergy: 1500,
    maxProtein: 70,
    maxCarbs: 20,
    maxFat: 30,
    rotate: 90,
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const settings = await UserSettingsService.getSettings();
        setUserSettings(settings);
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchUserSettings();
  }, []);

  const dailyNorms = {
    Energy: userSettings.maxEnergy,
    Protein: userSettings.maxProtein,
    Carbohydrate: userSettings.maxCarbs,
    Fat: userSettings.maxFat,
  };

  const data = {
    labels: ["Consumed", "Left", "Excess"],
    datasets: [
      {
        label: "Energy, kcal",
        data: [
          totalNutrients.Energy || 0,
          calculateRemaining(totalNutrients.Energy || 0, dailyNorms.Energy),
          calculateExcess(totalNutrients.Energy || 0, dailyNorms.Energy),
        ],
        backgroundColor: ["#4caf50", "rgba(0, 0, 0, 0.1)", "#f44336"],
        borderWidth: 5,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
      },
      {
        label: "Protein, g",
        data: [
          totalNutrients.Protein || 0,
          calculateRemaining(totalNutrients.Protein || 0, dailyNorms.Protein),
          calculateExcess(totalNutrients.Protein || 0, dailyNorms.Protein),
        ],
        backgroundColor: ["#00bcd4", "rgba(0, 0, 0, 0.1)", "#f44336"],
        borderWidth: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
      },
      {
        label: "Carbohydrate, g",
        data: [
          totalNutrients["Carbohydrate, by difference"] || 0,
          calculateRemaining(totalNutrients["Carbohydrate, by difference"] || 0, dailyNorms.Carbohydrate),
          calculateExcess(totalNutrients["Carbohydrate, by difference"] || 0, dailyNorms.Carbohydrate),
        ],
        backgroundColor: ["#faba22", "rgba(0, 0, 0, 0.1)", "#f44336"],
        borderWidth: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
      },
      {
        label: "Fat, g",
        data: [
          totalNutrients["Total lipid (fat)"] || 0,
          calculateRemaining(totalNutrients["Total lipid (fat)"] || 0, dailyNorms.Fat),
          calculateExcess(totalNutrients["Total lipid (fat)"] || 0, dailyNorms.Fat),
        ],
        backgroundColor: ["#e91e63", "rgba(0, 0, 0, 0.1)", "#f44336"],
        borderWidth: 3,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
        hoverOffset: 4,
      },
    ],
  };

  return (
      <Donut
          data={data}
          options={options}
          text={text}
          font_size={font_size}
          link={link}
          height={height}
          width={width}
          tooltip={tooltip}
          anim={anim}
      />
  );
}

export default NutrientDonut;
