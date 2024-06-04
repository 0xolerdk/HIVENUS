import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import "./Settings.css";

const Settings = () => {
  const [norms, setNorms] = useState({
    energy: "",
    protein: "",
    fat: "",
    carb: "",
    water: "",
    sleep: "",
    activity: "",
    weight: "",
  });

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [tabValue, setTabValue] = useState("1");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name in norms) {
      setNorms((prevNorms) => ({
        ...prevNorms,
        [name]: value,
      }));
    } else {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
      }));
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    console.log("Norms Set:", norms);
    console.log("User Info:", userInfo);
    // Add your logic to save norms and user info
  };

  return (
    <div>
      <Top_Bar />

      <Container className="container">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="settings tabs">
              <Tab icon={<FitnessCenterIcon />} label="Norms" value="1" />
              <Tab icon={<AccountCircleIcon />} label="Profile" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {Object.keys(norms).map((key) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        fullWidth
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={norms[key]}
                        onChange={handleChange}
                        variant="outlined"
                      />
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        Current: {norms[key] || "Not set"}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={userInfo.email}
                    onChange={handleChange}
                    variant="outlined"
                    type="email"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Current: {userInfo.email || "Not set"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    value={userInfo.password}
                    onChange={handleChange}
                    variant="outlined"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
};

export default Settings;
