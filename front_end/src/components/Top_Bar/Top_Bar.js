import "./Top_Bar.css";
import logo from "../../assets/images/logo.svg";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { LocalDining, FitnessCenter, Settings, DataUsage, LocalDrink, Hotel, MonitorWeight  } from "@mui/icons-material";


function Top_Bar({pageValue=0}) {
  const [value, setValue] = React.useState(pageValue);

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
            icon={<DataUsage />} 
            aria-label="dashboard" 
            style={{ marginRight: 'auto', left: "50%", transform:" translateX(-50%)" }}
          />
          <Tab 
            icon={<LocalDining />} 
            aria-label="Intake" 
            style={{ right: 0 }}
          />
          <Tab 
            icon={<FitnessCenter />} 
            aria-label="Use" 
            style={{ left: 0 }}
          />
          <Tab 
            icon={<MonitorWeight />} 
            aria-label="Use" 
            style={{ left: 90 }}
          />
          <Tab 
            icon={<LocalDrink />} 
            aria-label="Use" 
            style={{ left: 90 }}
          />
          <Tab 
            icon={<Hotel />} 
            aria-label="Use" 
            style={{ left: 90 }}
          />
          <Tab 
          
            icon={<Settings />} 
            aria-label="settings" 
            style={{ marginLeft: 'auto' }}
          />
        </Tabs>
      </div>
    </div>
  );
}

export default Top_Bar;
