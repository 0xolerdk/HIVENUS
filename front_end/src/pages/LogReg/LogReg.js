import Bottom from '../../components/Bottom.js';
import Statistic from '../Statistic/Statistic.js';
import './LogReg.css';
import { BrowserRouter as Route, Routes, Link } from 'react-router-dom';




function LogReg() {
    return (
      <div className="LogReg">
        <div className="top">
          <div className="buttons">
            
            {/* <Link className="back_button" to="/"><a href="">
            <img  src={back_button} alt="" />
            </a></Link> */}
            <button className="sign-in">Sign In</button>
            <button className="sign-up">Sign Up</button>
            <div className="center">  
            <Link className="my-button" to="/statistic"><span></span>Statistic</Link>
                {/* <Routes>
                    <Route path="/statistic" element={<Statistic />} />
                </Routes> */}
                </div>
          </div>
        </div>
            <Bottom />
      </div>
    );
  }
  
  export default LogReg;