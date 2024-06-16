import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Top_Bar from "../../components/Top_Bar/Top_Bar";
import "./Settings.css";
import SettingsService from "../../services/SettingsService"; // Import your SettingsService
import CustomSnackbar from "../../components/CustomSnackbar"; // Import CustomSnackbar

const Settings = () => {
  const [norms, setNorms] = useState({
    energy: "",
    protein: "",
    fat: "",
    carb: "",
    water: "",
    sleep: "",
  });

  const [currentNorms, setCurrentNorms] = useState({
    energy: "",
    protein: "",
    fat: "",
    carb: "",
    water: "",
    sleep: "",
  });

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [tabValue, setTabValue] = useState("1");

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const settings = await SettingsService.getSettings();
      setCurrentNorms({
        energy: settings.maxEnergy || "",
        protein: settings.maxProtein || "",
        fat: settings.maxFat || "",
        carb: settings.maxCarbs || "",
        water: settings.maxWater || "",
        sleep: settings.minSleep || "",
      });
    } catch (error) {
      console.error("Failed to fetch settings", error);
    }
  };

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

  const handleSubmit = async () => {
    console.log("Norms Set:", norms);
    console.log("User Info:", userInfo);

    try {
      await SettingsService.setSettings({
        maxEnergy: norms.energy,
        maxProtein: norms.protein,
        maxFat: norms.fat,
        maxCarbs: norms.carb,
        maxWater: norms.water,
        minSleep: norms.sleep,
      });
      console.log("Settings updated successfully");
      setSnackbarMessage("Settings updated successfully");
      setSnackbarSeverity("success");
      await fetchSettings(); // Fetch updated settings
    } catch (error) {
      console.error("Failed to update settings", error);
      setSnackbarMessage("Failed to update settings");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const isNormsEmpty = !Object.values(norms).some((value) => value !== "");
  const isUserInfoEmpty = !Object.values(userInfo).some((value) => value !== "");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
                        <Box display="flex" flexDirection="column">
                          <TextField
                              fullWidth
                              name={key}
                              label={`New ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                              value={norms[key]}
                              onChange={handleChange}
                              variant="outlined"
                              sx={{ mb: 1 }}
                          />
                          <Typography variant="body2">
                            Current: {currentNorms[key] || "Not set"}
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
                      disabled={isNormsEmpty}
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
                      disabled={isUserInfoEmpty}
                  >
                    Confirm
                  </Button>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Container>

        <CustomSnackbar
            open={snackbarOpen}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            severity={snackbarSeverity}
        />
      </div>
  );
};

export default Settings;
