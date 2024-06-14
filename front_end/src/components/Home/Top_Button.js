import './Top_Button.css';

import { Route, Routes, Link } from 'react-router-dom';
import Statistic from '../../pages/Statistic/Statistic';

function Top_Button() {
    return (
            <div className="center"> 
                <Link className="my-button" to="/main"><span></span>START</Link>
                <Routes>
                    <Route path="/main" element={<Statistic />} />
                </Routes>
            </div>
    );
}

export default Top_Button;
