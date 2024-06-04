import React,{useState} from 'react'
import Top_Bar from "../../components/Top_Bar/Top_Bar"
import dayjs from 'dayjs';
import Calendar from '../../components/Statistics';

export default function CaloriesUse() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  };
  return (
    <div>
    <Top_Bar/>
    <div className="calendar" >
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
      </div>
    </div>
  )
}
