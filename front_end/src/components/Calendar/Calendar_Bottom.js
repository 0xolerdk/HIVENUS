import React from 'react'
import Donut from '../Donut';

const data = {
    labels: ["Green", "Blue", "Pink", "Yellow", "Grey"],
    datasets: [
      {
        data: [10, 50, 50, 20, 10],
        backgroundColor: ["#4CAF50", "#00BCD4", "#E91E63", "#FFC107", "#9E9E9E"],
      },
    ],
  };
  
  const data2 = {
    labels: ["Green", "Blue", "Pink", "Yellow", "Grey"],
    datasets: [
      {
        data: [15, 10, 20, 30, 60],
        backgroundColor: ["#4CAF50", "#00BCD4", "#E91E63", "#FFC107", "#9E9E9E"],
      },
    ],
  };
  
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
    height: 100,
    borderWidth: 1,
    fullSize: false,
    radius: 20,
    cutout: "85%", // This changes the radius of the Doughnut hole.
    rotation: 90, // This rotates the chart by 90 degrees.
    // Add other options here
  };
  
  const options2 = {
    borderWidth: 1,
    radius: 30,
    cutout: "85%", // This changes the radius of the Doughnut hole.
    rotation: 90, // This rotates the chart by 90 degrees.
    // Add other options here
  };
  
  const options3 = {
    borderWidth: 1,
    radius: 40,
    cutout: "85%", // This changes the radius of the Doughnut hole.
    rotation: 90, // This rotates the chart by 90 degrees.
    // Add other options here
  };
  const options4 = {
    borderWidth: 1,
    radius: 50,
    cutout: "85%", // This changes the radius of the Doughnut hole.
    rotation: 90, // This rotates the chart by 90 degrees.
    // Add other options here
  };

  export default function Calendar_Bottom({date}) {

    

  return (
    <div className="calendar">
        <Donut data={data} options={options1} width="60px" height="60px" text="<" />
        <Donut data={data2} options={options2} width="100px" height="100px" text={date.subtract(2,'day').format("DD")}/>
        <Donut data={data3} options={options3} width="110px" height="110px" text={date.subtract(1,'day').format("DD")}/>
        <Donut data={data2} options={options4} width="120px" height="120px" text={date.format("DD")} font_size={2}/>
        <Donut data={data2} options={options3} width="110px" height="110px" text={date.add(1,"day").format("DD")}/>
        <Donut data={data2} options={options2} width="100px" height="100px" text={date.add(2,"day").format("DD")}/>
        <Donut data={data2} options={options1} width="60px" height="60px" text=">"/>
      </div>
  )
}

