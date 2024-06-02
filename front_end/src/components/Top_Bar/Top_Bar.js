import "./Top_Bar.css";
import logo from "../../assets/images/logo.svg";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LocalDining, FitnessCenter, Settings, DataUsage, LocalDrink, Hotel, MonitorWeight } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserService from "../../service/logRegLogic"; // Assuming UserService is in this path

function Top_Bar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Function to determine the current tab based on the path
  const getTabValue = () => {
    switch (location.pathname) {
      case "/main":
        return 0;
      case "/main/calories_intake":
        return 1;
      case "/main/activity":
        return 2;
      case "/main/weight":
        return 3;
      case "/main/water_intake":
        return 4;
      case "/main/sleep_track":
        return 5;
      case "/main/settings":
        return 6;
      default:
        return 0;
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    UserService.logout();
    handleMenuClose();
    window.location.href = "/auth"; // Redirect to login page after logout
  };

  return (
    <div className="bar">
      <div className="tabs">
        <img className="logo" src={logo} alt="" />
        <Tabs
          value={getTabValue()}
          aria-label="icon tabs example"
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        >
          <Tab
            icon={<DataUsage />}
            aria-label="dashboard"
            style={{ marginRight: 'auto', left: "50%", transform: " translateX(-50%)" }}
            component={Link}
            to="/main"
          />
          <Tab
            icon={<LocalDining />}
            aria-label="Intake"
            style={{ right: 0 }}
            component={Link}
            to="/main/calories_intake"
          />
          <Tab
            icon={<FitnessCenter />}
            aria-label="Use"
            style={{ left: 0 }}
            component={Link}
            to="/main/activity"
          />
          <Tab
            icon={<MonitorWeight />}
            aria-label="Weight"
            style={{ left: 90 }}
            component={Link}
            to="/main/weight"
          />
          <Tab
            icon={<LocalDrink />}
            aria-label="Water"
            style={{ left: 90 }}
            component={Link}
            to="/main/water_intake"
          />
          <Tab
            icon={<Hotel />}
            aria-label="Sleep"
            style={{ left: 90 }}
            component={Link}
            to="/main/sleep_track"
          />
          <Tab
            icon={<Settings />}
            aria-label="settings"
            style={{ marginLeft: 'auto' }}
            onClick={handleMenuOpen}
            to="/main/settings"
          />
        </Tabs>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/main/settings">Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Top_Bar;
