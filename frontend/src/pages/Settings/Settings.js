import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Tab,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import TopBar from "../../components/TopBar/TopBar";
import "./Settings.css";
import SettingsService from "../../services/SettingsService";
import CustomSnackbar from "../../components/CustomSnackbar";

const Settings = () => {
  const [norms, setNorms] = useState({
    energy: { value: "", unit: "kcal" },
    protein: { value: "", unit: "g" },
    fat: { value: "", unit: "g" },
    carb: { value: "", unit: "g" },
    water: { value: "", unit: "ml" },
    sleep: { value: "", unit: "h" },
  });

  const [currentNorms, setCurrentNorms] = useState({
    energy: { value: "", unit: "kcal" },
    protein: { value: "", unit: "g" },
    fat: { value: "", unit: "g" },
    carb: { value: "", unit: "g" },
    water: { value: "", unit: "ml" },
    sleep: { value: "", unit: "h" },
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
        energy: { value: settings.maxEnergy || "", unit: "kcal" },
        protein: { value: settings.maxProtein || "", unit: "g" },
        fat: { value: settings.maxFat || "", unit: "g" },
        carb: { value: settings.maxCarbs || "", unit: "g" },
        water: { value: settings.maxWater || "", unit: "ml" },
        sleep: { value: settings.minSleep || "", unit: "h" },
      });
    } catch (error) {
      console.error("Failed to fetch settings", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (norms[name]) {
      setNorms((prevNorms) => ({
        ...prevNorms,
        [name]: { ...prevNorms[name], value },
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
        maxEnergy: norms.energy.value,
        maxProtein: norms.protein.value,
        maxFat: norms.fat.value,
        maxCarbs: norms.carb.value,
        maxWater: norms.water.value,
        minSleep: norms.sleep.value,
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

  const isNormsEmpty = !Object.values(norms).some((norm) => norm.value !== "");
  const isUserInfoEmpty = !Object.values(userInfo).some((value) => value !== "");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
      <div>
        <TopBar />

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
                              label={`${key.charAt(0).toUpperCase() + key.slice(1)} (${norms[key].unit})`}
                              value={norms[key].value}
                              onChange={handleChange}
                              variant="outlined"
                              sx={{ mb: 1 }}
                          />
                          <Typography variant="body2">
                            Current: {currentNorms[key].value || "Not set"} {currentNorms[key].unit}
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
                        disabled={true}
                        onChange={handleChange}
                        variant="outlined"
                        type="email"
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Current: {userInfo.email || " "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        value={userInfo.password}
                        disabled={true}
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
