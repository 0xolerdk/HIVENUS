import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const actions = [
  { icon: <LocalDiningOutlinedIcon />, name: 'Intake' },
  { icon: <FitnessCenterIcon />, name: 'Activite' },

];

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                direction={"right"}
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
  );
}