import React from 'react';
import Home from './pages/Home/Home';
import LogReg from './pages/LogReg/LogReg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
                <Route path="/logreg" element={<LogReg />} />
                <Route path="/statistic" element={<Statistic />} />
                <Route path="/calories_intake" element={<CaloriesIntake />} />
                <Route path="/reg" element={<Reg />} />
                <Route path="/login" element={<Login />} />
                <Route path="/weight" element={<Weight />} />
                <Route path="/calories_use" element={<CaloriesUse />} />
                <Route path="/sleep_track" element={<SleepTrack />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/water_intake" element={<WaterIntake />} />


            </Routes>
        </Router>
        </ThemeProvider>
    )
}

export default App;
