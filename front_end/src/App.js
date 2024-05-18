import React from 'react';
import Home from './pages/Home/Home';
import LogReg from './pages/LogReg/LogReg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Statistic from './pages/Statistic/Statistic';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logreg" element={<LogReg />} />
                <Route path="/statistic" element={<Statistic />} />
            </Routes>
        </Router>
    )
}

export default App;
