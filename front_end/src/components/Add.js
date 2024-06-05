import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { LocalDrink, Opacity, WaterDrop } from '@mui/icons-material';
const actions = [
  { icon: <LocalDrink />, name: '200ml' },
  { icon: <Opacity />, name: '500ml' },
  { icon: <WaterDrop />, name: '1000ml' },


];

export default function BasicSpeedDial() {
  return (
    <div>
    <Box sx={{ height: "20px", transform: 'translateZ(0px)', flexGrow: 1, mt: 2 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                direction={"down"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            
          />
        ))}
      </SpeedDial>
    </Box>
    </div>
  );
}