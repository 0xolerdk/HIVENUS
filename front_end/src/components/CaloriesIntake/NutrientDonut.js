import React from "react";
import Donut from "../Donut";

function calculateRemaining(nutrient, dailyNorm) {
  return nutrient > dailyNorm ? 0 : dailyNorm - nutrient;
}

function calculateExcess(nutrient, dailyNorm) {
  return nutrient > dailyNorm ? nutrient - dailyNorm : 0;
}

function NutrientDonut({ totalNutrients, width, height, text, font_size, link, options, tooltip, anim }) {
  const dailyNorms = {
    Energy: 1500, // daily norm for energy in kcal
    Protein: 70, // daily norm for protein in grams
    Carbohydrate: 20, // daily norm for carbohydrates in grams
    Fat: 30, // daily norm for fat in grams
    rotate: 90, //
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
        backgroundColor: ["#4caf50", "#333333", "#ff0000"],
        borderWidth: 5,
        borderColor: "#333333",
        borderRadius: 10,
      },
      {
        label: "Protein, g",
        data: [
          totalNutrients.Protein || 0,
          calculateRemaining(totalNutrients.Protein || 0, dailyNorms.Protein),
          calculateExcess(totalNutrients.Protein || 0, dailyNorms.Protein),
        ],
        backgroundColor: ["#00bcd4", "#333333", "#ff0000"],
        borderWidth: 4,
        borderColor: "#333333",
        borderRadius: 10,
      },
      {
        label: "Carbohydrate, g",
        data: [
          totalNutrients["Carbohydrate, by difference"] || 0,
          calculateRemaining(
            totalNutrients["Carbohydrate, by difference"] || 0,
            dailyNorms.Carbohydrate
          ),
          calculateExcess(
            totalNutrients["Carbohydrate, by difference"] || 0,
            dailyNorms.Carbohydrate
          ),
        ],
        backgroundColor: ["#faba22", "#333333", "#ff0000"],
        borderWidth: 4,
        borderColor: "#333333",
        borderRadius: 10,
      },
      {
        label: "Fat, g",
        data: [
          totalNutrients["Total lipid (fat)"] || 0,
          calculateRemaining(
            totalNutrients["Total lipid (fat)"] || 0,
            dailyNorms.Fat
          ),
          calculateExcess(totalNutrients["Total lipid (fat)"] || 0, dailyNorms.Fat),
        ],
        backgroundColor: ["#e91e63", "#333333", "#ff0000"],
        borderWidth: 3,
        borderColor: "#333333",
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
