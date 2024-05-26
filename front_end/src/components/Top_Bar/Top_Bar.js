import "./Top_Bar.css";
import Statistic from "../../pages/Statistic/Statistic";
import logo from "../../assets/images/logo.svg";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LocalDining, FitnessCenter, Settings, DataUsage, LocalDrink, Hotel, MonitorWeight  } from "@mui/icons-material";
import { Link } from "react-router-dom";


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
            component={Link} 
            to="/statistic"
          />
          <Tab 
            icon={<LocalDining />} 
            aria-label="Intake" 
            style={{ right: 0 }}
            component={Link} 
            to="/calories_intake"
          />
          <Tab 
            icon={<FitnessCenter />} 
            aria-label="Use" 
            style={{ left: 0 }}
            component={Link} 
            to="/activity"
          />
          <Tab 
            icon={<MonitorWeight />} 
            aria-label="Use" 
            style={{ left: 90 }}
            component={Link} 
            to="/weight"
          />
          <Tab 
            icon={<LocalDrink />} 
            aria-label="Use" 
            style={{ left: 90 }}
            component={Link} 
            to="/water_intake"
          />
          <Tab 
            icon={<Hotel />} 
            aria-label="Use" 
            style={{ left: 90 }}
            component={Link} 
            to="/sleep_track"
          />
          <Tab 
          
            icon={<Settings />} 
            aria-label="settings" 
            style={{ marginLeft: 'auto' }}
            component={Link} 
            to="/settings"
          />
        </Tabs>
      </div>
    </div>
  );
}

export default Top_Bar;
