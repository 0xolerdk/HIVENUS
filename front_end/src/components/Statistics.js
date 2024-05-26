import React from 'react';
import "./Statistics.css"
import Donut from './Donut';

const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [90,10],
      backgroundColor: [
        '#4caf50',
        '#333333'


      ],
      borderWidth: 5,
      borderColor: "#333333",
      borderRadius: 10
    },
    {
      label: 'Dataset 2',
      data: [60,40],
      backgroundColor: [
        '#00bcd4',
        '#333333'


      ],
      borderWidth: 4,
      borderColor: "#333333",
      borderRadius: 10
    },
    {
      label: 'Dataset 3',
      data: [70,30],
      backgroundColor: [
        '#e91e63',
        '#333333'


      ],
      borderWidth: 3,
      borderColor: "#333333",
      borderRadius: 10,
      hoverOffset: 4
    }
  ]
};



const options1 = {
    height: 120,
    borderWidth: 1,
    fullSize: false,
    radius: 140,
    cutout: '60%', // This changes the radius of the Doughnut hole.
    rotation: 0, // This rotates the chart by 90 degrees.
    // Add other options here
  };
  

function Calendar() {
    return (
        
        <div className="statistics"> 
        <div className='row'><Donut  data={data} options={options1} text="Food Intake" link="/calories_intake" font_size={1.7}/>
            <Donut data={data} options={options1} text="Activity " link="/activity"/>
            <Donut data={data} options={options1} text="Calories Burned" font_size={1.4} link="/calories_use"/></div>
        <div className='row'><Donut data={data} options={options1} text="Sleep" link="/sleep_track"/>
            <Donut data={data} options={options1} text="Water Intake" font_size={1.7} link="/water_intake"/>
            <Donut data={data} options={options1} text="Weight" link="/weight"/>
          </div>    
            
        </div>
);

}

export default Calendar;
