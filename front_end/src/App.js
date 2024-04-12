import React from 'react';
import Home from './pages/Home/Home';
import LogReg from './pages/LogReg/LogReg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logreg" element={<LogReg />} />
            </Routes>
        </Router>
    )
}

export default App;
