import React from 'react';
import Home from './pages/Home/Home';
import LogReg from './pages/LogReg/LogReg';
import { BrowserRouter as Router, Routes} from 'react-router-dom';
import { Route } from 'react-router-dom';
import Statistic from './pages/Statistic/Statistic';
import CaloriesIntake from './pages/CaloriesIntake/CaloriesIntake';
import CaloriesUse from './pages/CaloriesUse/CaloriesUse';
import SleepTrack from './pages/SleepTrack/SleepTrack';
import Weight from './pages/Weight/Weight';
import WaterIntake from './pages/WaterIntake/WaterIntake';
import Activity from './pages/Activity/Activity';
import Reg from './pages/Reg/Reg';
import Login from './pages/Login/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProtectedComponent  from './service/ProtectedRoute'; // Import ProtectedRoute

function App() {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    return(




        <ThemeProvider theme={darkTheme}>
      <Router>
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
          <Route path="/main/calories_intake" element={<ProtectedComponent>
            <CaloriesIntake />
            </ProtectedComponent>} /> // Use ProtectedRoute
                <Route path="/main/weight" element={<ProtectedComponent>
                    <Weight />
            </ProtectedComponent>} /> // Use ProtectedRoute
                <Route path="/main/calories_use" element={<ProtectedComponent>
                    <CaloriesUse />
            </ProtectedComponent>} /> // Use ProtectedRoute
                <Route path="/main/sleep_track" element={<ProtectedComponent>
                    <SleepTrack />
            </ProtectedComponent>} /> // Use ProtectedRoute
                <Route path="/main/activity" element={<ProtectedComponent>
                    <Activity />
            </ProtectedComponent>} /> // Use ProtectedRoute
                <Route path="/main/water_intake" element={<ProtectedComponent>
                    <WaterIntake />
            </ProtectedComponent>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}


export default App;
