import React from "react";
import Donut from "./Donut";

const data3 = {
    labels: ["Green", "Blue", "Pink", "Yellow", "Grey"],
    datasets: [
      {
        data: [15, 20, 20, 50, 30],
        backgroundColor: ["#4CAF50", "#00BCD4", "#E91E63", "#FFC107", "#9E9E9E"],
      },
    ],
  };

  const options1 = {
    borderWidth: 1,
    fullSize: true,
    radius: 180,
    cutout: "85%",
    rotation: 90,
  };

function NutrientDonut() {
  return (
    <div className="donuts">
    <Donut
      data={data3}
      options={options1}
      text={""}
      height={"500px"}
      width={"500px"}
    />
  </div>
  );
}

export default NutrientDonut;
