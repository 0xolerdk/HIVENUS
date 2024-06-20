import React from 'react';
import Home from './pages/Home/Home';
import LogReg from './pages/Auth/LogReg/LogReg';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Statistic from './pages/Statistic/Statistic';
import CaloriesIntake from './pages/CaloriesIntake/CaloriesIntake';
import SleepTrack from './pages/SleepTrack/SleepTrack';
import WaterIntake from './pages/WaterIntake/WaterIntake';
import Reg from './pages/Auth/Reg/Reg';
import Login from './pages/Auth/Login/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProtectedComponent from './utils/ProtectedRoute';
import Settings from './pages/Settings/Settings';
import setupAxiosInterceptors from './services/axiosConfig';

const AxiosInterceptorSetup = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return null;
};

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      h4: {
        color: '#ffffff',
      },
      body1: {
        color: '#ffffff',
      },
      body2: {
        color: '#aaaaaa',
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <AxiosInterceptorSetup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<LogReg />} />
          <Route path="/auth/reg" element={<Reg />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/main" element={
            <ProtectedComponent>
              <Statistic />
            </ProtectedComponent>
          } />
          <Route path="/main/calories_intake" element={
            <ProtectedComponent>
              <CaloriesIntake />
            </ProtectedComponent>
          } />
          <Route path="/main/sleep_track" element={
            <ProtectedComponent>
              <SleepTrack />
            </ProtectedComponent>
          } />
          <Route path="/main/water_intake" element={
            <ProtectedComponent>
              <WaterIntake />
            </ProtectedComponent>
          } />
          <Route path="/main/settings" element={
            <ProtectedComponent>
              <Settings />
            </ProtectedComponent>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
