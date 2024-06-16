import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Calendar from "../../components/Calendar/Calendar.js";
import Top_Bar from "../../components/Top_Bar/Top_Bar.js";
import "./WaterIntake.css";
import DonutWaves from "../../components/WaterIntake/DonutWaves.jsx";
import WaterIntakeService from "../../services/WaterIntakeService";
import WaterHistory from "../../components/WaterIntake/WaterHistory";
import BasicSpeedDial from "../../components/WaterIntake/Add.js"; // Ensure the correct import path
import Container from '@mui/material/Container';
import CustomSnackbar from "../../components/CustomSnackbar"; // Import Custom Snackbar
import SettingsService from "../../services/SettingsService"; // Import SettingsService

const dataTemplate = {
  labels: ["Consumed", "Remaining"],
  datasets: [
    {
      label: "Water Intake",
      data: [0, 100],
      backgroundColor: ["#00bcd4", "rgba(0, 0, 0, 0.1)"],
      borderWidth: 0,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: 50,
    }
  ],
};

const options1 = {
  height: 120,
  borderWidth: 0,
  fullSize: true,
  radius: 200,
  cutout: "78.5%",
  rotation: 0,
};

export default function WaterIntake() {
  const [date, setDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? dayjs(savedDate) : dayjs();
  });
  const [data, setData] = useState(dataTemplate);
  const [history, setHistory] = useState([]);
  const [percent, setPercent] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [dailyWaterGoal, setDailyWaterGoal] = useState(2500); // Initially null
  const [calendarKey, setCalendarKey] = useState(0); // Add state to track Calendar re-render

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const fetchWaterData = async (date, dailyGoal) => {
    try {
      const response = await WaterIntakeService.getWaterDataByDate(date.format('YYYY-MM-DD'));
      const waterIntakes = response.data;

      const totalIntake = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0);
      const cappedIntake = Math.min(totalIntake, dailyGoal); // Cap the intake at user's daily goal

      setPercent(((cappedIntake / dailyGoal) * 100)); // Update percent here

      setData({
        ...dataTemplate,
        datasets: [
          {
            ...dataTemplate.datasets[0],
            data: [cappedIntake, dailyGoal - cappedIntake], // Using user's daily goal
          }
        ],
      });
      setHistory(waterIntakes);
      return totalIntake;
    } catch (error) {
      console.error("Error fetching water data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await WaterIntakeService.deleteWaterDataById(id);
      if (dailyWaterGoal) {
        fetchWaterData(date, dailyWaterGoal); // Refresh data after deletion
      }
      setSnackbarMessage("Water intake record deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setCalendarKey(prevKey => prevKey + 1); // Trigger Calendar re-render
    } catch (error) {
      console.error("Error deleting water data:", error);
      setSnackbarMessage("Error deleting water intake record");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleAddSuccess = () => {
    setSnackbarMessage("Water intake record added successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    if (dailyWaterGoal) {
      fetchWaterData(date, dailyWaterGoal); // Refresh data after adding
    }
    setCalendarKey(prevKey => prevKey + 1); // Trigger Calendar re-render
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const settings = await SettingsService.getSettings();
        setDailyWaterGoal(settings.maxWater); // Set user's daily water goal
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    fetchUserSettings();
  }, []);

  useEffect(() => {
    if (dailyWaterGoal !== null) {
      fetchWaterData(date, dailyWaterGoal);
    }
  }, [date, dailyWaterGoal]);

  return (
      <div>
        <Top_Bar pageValue={4} />
        <div className="calendar">
          <Calendar key={calendarKey} selectedDate={date} onDateChange={handleDateChange} />
        </div>
        <DonutWaves data={data} options={options1} text={""} percent={percent} />
        <BasicSpeedDial selectedDate={date} refreshData={handleAddSuccess} />
        <Container maxWidth="md">
          <WaterHistory history={history} onDelete={handleDelete} />
        </Container>
        <CustomSnackbar
            open={snackbarOpen}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />
      </div>
  );
}
