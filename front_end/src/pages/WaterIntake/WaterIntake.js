import React,{useState} from 'react'
import dayjs from 'dayjs';
import Calendar from '../../components/Calendar/Calendar';
import Top_Bar from "../../components/Top_Bar/Top_Bar"
import { Box, IconButton } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import "./WaterIntake.css"

export default function WaterIntake() {
  const [waterLevel, setWaterLevel] = useState(0); // Відсоток заповнення

  const addWater = () => {
    setWaterLevel(prev => Math.min(prev + 10, 100)); // Додаємо 10% за один раз, до максимуму 100%
  };

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (newDate) => {
    setSelectedDate(dayjs(newDate));
  }
  return (
    <div>
    <Top_Bar pageValue={4}/>
    <div className="calendar" >
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange}/>
      </div>
      <div className="container2">
      <div className="glass">
        <div className="water" style={{ height: `${waterLevel}%` }}>
          <div className="percentage">{waterLevel}%</div>
        </div>
      </div>
      <button onClick={addWater}>Add 200ml</button>
    </div>
    </div>
  )
}
