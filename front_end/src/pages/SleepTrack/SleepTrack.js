import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Calendar from '../../components/Calendar/Calendar';
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import SleepTrackService from '../../services/SleepTrackService';
import SleepDonut from '../../components/SleepTrack/SleepDonut'; // Import the new SleepDonut component
import { Button, Grid, Typography, Container, Box } from '@mui/material';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomSnackbar from '../../components/CustomSnackbar'; // Adjust the import path as needed

const options1 = {
  height: 120,
  borderWidth: 1,
  fullSize: true,
  radius: 185,
  cutout: "80%",
  rotation: 0,
};

const calculateSleepDuration = (startHour, startMinute, endHour, endMinute) => {
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (endMinutes < startMinutes) {
    // Sleep period crosses midnight
    return (1440 - startMinutes) + endMinutes;
  }
  return endMinutes - startMinutes;
};

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hours ${mins} minutes`;
};

export default function SleepTrack() {
  const [date, setDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? dayjs(savedDate) : dayjs();
  });
  const [sleepData, setSleepData] = useState(null);
  const [startTime, setStartTime] = useState(dayjs().hour(0).minute(0));
  const [endTime, setEndTime] = useState(dayjs().hour(0).minute(0));
  const [displayStartTime, setDisplayStartTime] = useState(dayjs().hour(0).minute(0));
  const [displayEndTime, setDisplayEndTime] = useState(dayjs().hour(0).minute(0));
  const [sleepDuration, setSleepDuration] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await SleepTrackService.getSleepDataByDate(date.format('YYYY-MM-DD'), token);
        setSleepData(response.data);
        if (response.data) {
          const { startTime, endTime } = response.data;
          const newStartTime = dayjs().startOf('day').add(startTime, 'minute');
          const newEndTime = dayjs().startOf('day').add(endTime, 'minute');
          setStartTime(newStartTime);
          setEndTime(newEndTime);
          setDisplayStartTime(newStartTime);
          setDisplayEndTime(newEndTime);
          const duration = calculateSleepDuration(newStartTime.hour(), newStartTime.minute(), newEndTime.hour(), newEndTime.minute());
          setSleepDuration(duration);
        } else {
          setStartTime(dayjs().hour(0).minute(0));
          setEndTime(dayjs().hour(0).minute(0));
          setDisplayStartTime(dayjs().hour(0).minute(0));
          setDisplayEndTime(dayjs().hour(0).minute(0));
          setSleepDuration(0);
        }
      } catch (error) {
        console.error("Error fetching sleep data:", error);
      }
    };
    fetchData();
  }, [date]);

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
    const duration = calculateSleepDuration(newStartTime.hour(), newStartTime.minute(), endTime.hour(), endTime.minute());
    setSleepDuration(duration);
  };

  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime);
    const duration = calculateSleepDuration(startTime.hour(), startTime.minute(), newEndTime.hour(), newEndTime.minute());
    setSleepDuration(duration);
  };

  const handleAddSleepData = async (event) => {
    event.preventDefault();
    const startHour = startTime.hour();
    const startMinute = startTime.minute();
    const endHour = endTime.hour();
    const endMinute = endTime.minute();
    const data = {
      startTime: startHour * 60 + startMinute,
      endTime: endHour * 60 + endMinute,
      date: date.format('YYYY-MM-DD')
    };

    try {
      const token = localStorage.getItem("token");
      const response = await SleepTrackService.addSleepDataByDate(data, token);
      setSleepData(response.data);
      setDisplayStartTime(startTime);
      setDisplayEndTime(endTime);
      setSnackbar({ open: true, message: "Sleep data added successfully!", severity: "success" });
    } catch (error) {
      console.error("Error adding sleep data:", error);
      setSnackbar({ open: true, message: "Error adding sleep data. Please try again.", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const formattedDuration = formatDuration(sleepDuration);

  return (
      <div>
        <Top_Bar pageValue={2} />
        <div className="calendar">
          <Calendar selectedDate={date} onDateChange={setDate} />
        </div>

        <SleepDonut duration={sleepDuration} options={options1} width={400} height={400} />
        <Typography
            variant="h6"
            align="center"
            mb="10px"
            color={sleepDuration > 480 ? "#ff0000" : "white"}
        >
          Sleep Duration: {formattedDuration}
        </Typography>
        <Box my={2}>
          <form onSubmit={handleAddSleepData}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                  <Typography color="white" variant="h6" align="center">Start Time</Typography>
                  <Box display="flex" justifyContent="center">
                    <MultiSectionDigitalClock
                        value={startTime}
                        onChange={handleStartTimeChange}
                        ampm={false}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography color="white" variant="h6" align="center">End Time</Typography>
                  <Box display="flex" justifyContent="center">
                    <MultiSectionDigitalClock
                        value={endTime}
                        onChange={handleEndTimeChange}
                        ampm={false}
                    />
                  </Box>
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Box mt={2} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Add Sleep Data
              </Button>
            </Box>
          </form>
        </Box>

        <CustomSnackbar
            open={snackbar.open}
            onClose={handleSnackbarClose}
            message={snackbar.message}
            severity={snackbar.severity}
        />
      </div>
  );
}
