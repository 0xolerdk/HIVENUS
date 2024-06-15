import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { LocalDrink, Opacity, WaterDrop } from '@mui/icons-material';
import WaterIntakeService from '../../services/WaterIntakeService'; // Ensure the correct import path

const actions = [
  { icon: <LocalDrink />, name: '200ml', amount: 200 },
  { icon: <Opacity />, name: '500ml', amount: 500 },
  { icon: <WaterDrop />, name: '1000ml', amount: 1000 },
];

export default function BasicSpeedDial({ selectedDate, refreshData }) {
  const handleAddWaterIntake = async (amount) => {
     // Replace with your token logic
    const data = {
      amount,
      date: selectedDate.format('YYYY-MM-DD') // Ensure the date format matches your backend expectations
    };

    try {
      await WaterIntakeService.createWaterDataByDate(data);
      refreshData(); // Call the refresh function to update the data
    } catch (error) {
      console.error("Error adding water intake:", error);
    }
  };

  return (
    <Box sx={{ height: 80, transform: 'translateX(100px)', flexGrow: 1, mt: 2, display: 'flex', justifyContent: 'center' }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
        direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleAddWaterIntake(action.amount)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
