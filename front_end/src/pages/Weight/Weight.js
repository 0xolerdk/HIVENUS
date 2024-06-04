import React,{useState} from 'react'
import dayjs from 'dayjs';
import Calendar from '../../components/Calendar/Calendar';
import Top_Bar from "../../components/Top_Bar/Top_Bar"

export default function Weight() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  }
  return (
    <div>
    <Top_Bar pageValue={3}/>
    <div className="calendar" >
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
      </div>
    </div>
  )
}
