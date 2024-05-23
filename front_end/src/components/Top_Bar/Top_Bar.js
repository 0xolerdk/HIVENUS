import "./Top_Bar.css";
import logo from "../../assets/images/logo.svg";
import Add from "./Add";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SettingsIcon from '@mui/icons-material/Settings';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const TabsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  width: '100%',
  alignItems: 'center',
});

const CenteredTab = styled(Tab)({
  gridColumn: '2 / 3',
  justifySelf: 'center',
});

const RightAlignedTab = styled(Tab)({
  gridColumn: '3 / 4',
  justifySelf: 'end',
});


function Top_Bar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="bar">
      <div className="tabs">
      <img className="logo" src={logo} alt="" />
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon tabs example"
      style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
    >
      <Tab 
        icon={<DataUsageIcon />} 
        aria-label="dashboard" 
        style={{  marginRight: 'auto', left: "50%",
        transform:" translateX(-50%)"}}
      />
      <Tab 
        icon={<SettingsIcon  />} 
        aria-label="settings" 
        style={{ marginLeft: 'auto' }}
      />
    </Tabs>
      </div>
    </div>
  );
}

export default Top_Bar;
