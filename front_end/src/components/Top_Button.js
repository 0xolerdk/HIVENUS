import '../components/Top_Button.css';
import LogReg from '../pages/LogReg/LogReg';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Top_Button() {
    return (
            <div className="center"> 
                <Link className="my-button" to="/auth"><span></span>START</Link>
                <Routes>
                    <Route path="/auth" element={<LogReg />} />
                </Routes>
            </div>
    );
}

export default Top_Button;
