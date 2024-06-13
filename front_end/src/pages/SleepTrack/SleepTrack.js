import React,{useState} from 'react'
import dayjs from 'dayjs';
import Calendar from '../../components/Calendar/Calendar';
import Top_Bar from "../../components/Top_Bar/Top_Bar"
import SleepCircle from '../../components/SleepCircle';

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
  radius: 185,
  cutout: "80%", // This changes the radius of the Doughnut hole.
  rotation: 0, // This rotates the chart by 90 degrees.
  // Add other options here
};

export default function SleepTrack() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  }
  return (
    <div>
    <Top_Bar pageValue={2}/>
    <div className="calendar" >
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
      </div>
      <SleepCircle data={data} options={options1} text={""} width={400}
        height={400}/>
    </div>
  )
}
