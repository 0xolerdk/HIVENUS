import React, { useState, useEffect } from "react";
import Donut from "./Donut";
import FCD from "../service/FCDLogic";
import dayjs from "dayjs";



function calculateRemaining(nutrient, dailyNorm) {
  return nutrient > dailyNorm ? 0 : dailyNorm - nutrient;
}

function calculateExcess(nutrient, dailyNorm) {
  return nutrient > dailyNorm ? nutrient - dailyNorm : 0;
}



function NutrientDonut({ selectedDate, width, height, text, font_size, link, options, tooltip, anim }) {
  const [nutrient, setTotalNutrients] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
    selectedDate = dayjs(localStorage.getItem('selectedDate'))

      try {
        const nutrient = await FCD.calculateDailyNutrients(selectedDate.format("YYYY-MM-DD"), token);
        setTotalNutrients(nutrient);
      } catch (error) {
        console.error("Error fetching daily nutrients:", error);
      }
    };
    fetchData();
  }, [selectedDate]); // Add selectedDate as a dependency

  const dailyNorms = {
    Energy: 1500, // daily norm for energy in kcal
    Protein: 70, // daily norm for protein in grams
    Carbohydrate: 20, // daily norm for carbohydrates in grams
    Fat: 30, // daily norm for fat in grams
  };

  const data = {
    labels: ['Consumed', 'Left', 'Excess'],
    datasets: [
      {
        label: 'Energy, kcal',
        data: [
          nutrient.Energy || 0,
          calculateRemaining(nutrient.Energy || 0, dailyNorms.Energy),
          calculateExcess(nutrient.Energy || 0, dailyNorms.Energy)
        ],
        backgroundColor: ['#4caf50', '#333333', '#ff0000'],
        borderWidth: 5,
        borderColor: "#333333",
        borderRadius: 10
      },
      {
        label: 'Protein, g',
        data: [
          nutrient.Protein || 0,
          calculateRemaining(nutrient.Protein || 0, dailyNorms.Protein),
          calculateExcess(nutrient.Protein || 0, dailyNorms.Protein)
        ],
        backgroundColor: ['#00bcd4', '#333333', '#ff0000'],
        borderWidth: 4,
        borderColor: "#333333",
        borderRadius: 10
      },
      {
        label: 'Carbohydrate, g',
        data: [
          nutrient["Carbohydrate, by difference"] || 0,
          calculateRemaining(nutrient["Carbohydrate, by difference"] || 0, dailyNorms.Carbohydrate),
          calculateExcess(nutrient["Carbohydrate, by difference"] || 0, dailyNorms.Carbohydrate)
        ],
        backgroundColor: ['#faba22', '#333333', '#ff0000'],
        borderWidth: 4,
        borderColor: "#333333",
        borderRadius: 10
      },
      {
        label: 'Fat, g',
        data: [
          nutrient["Total lipid (fat)"] || 0,
          calculateRemaining(nutrient["Total lipid (fat)"] || 0, dailyNorms.Fat),
          calculateExcess(nutrient["Total lipid (fat)"] || 0, dailyNorms.Fat)
        ],
        backgroundColor: ['#e91e63', '#333333', '#ff0000'],
        borderWidth: 3,
        borderColor: "#333333",
        borderRadius: 10,
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="donuts">
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
    </div>
  );
}

export default NutrientDonut;
