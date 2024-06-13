import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Calendar from "../../components/Calendar/Calendar.js";
import Top_Bar from "../../components/Top_Bar/Top_Bar.js";
import "./WaterIntake.css";
import DonutWaves from "../../components/DonutWaves.jsx";
import WaterIntakeService from "../../services/WaterIntakeService";
import WaterHistory from "../../components/WaterHistory";
import BasicSpeedDial from "../../components/Add.js"; // Ensure the correct import path
import Container from '@mui/material/Container';
import CustomSnackbar from "../../components/CustomSnackbar"; // Import Custom Snackbar

const dataTemplate = {
  labels: ["Consumed", "Remaining"],
  datasets: [
    {
      label: "Water Intake",
      data: [0, 100],
      backgroundColor: ["#00bcd4", "#333333"],
      borderWidth: 0,
      borderColor: "#333333",
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

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchWaterData(newDate);
  };

  const fetchWaterData = async (date) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await WaterIntakeService.getWaterDataByDate(date.format('YYYY-MM-DD'), token);
      const waterIntakes = response.data;

      const totalIntake = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0);
      const cappedIntake = Math.min(totalIntake, 2000); // Cap the intake at 2000ml

      setPercent(((cappedIntake / 2000) * 100)); // Update percent here

      setData({
        ...dataTemplate,
        datasets: [
          {
            ...dataTemplate.datasets[0],
            data: [cappedIntake, 2000 - cappedIntake], // Assuming daily goal is 2000ml
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
    const token = localStorage.getItem("token");
    try {
      await WaterIntakeService.deleteWaterDataById(id, token);
      fetchWaterData(date); // Refresh data after deletion
      setSnackbarMessage("Water intake record deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
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
    fetchWaterData(date); // Refresh data after adding
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchWaterData(date);
  }, [date]);

  return (
    <div>
      <Top_Bar pageValue={4} />
      <div className="calendar">
        <Calendar selectedDate={date} onDateChange={handleDateChange} />
      </div>
      <DonutWaves data={data} options={options1} text={""} percent={percent}/>
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
