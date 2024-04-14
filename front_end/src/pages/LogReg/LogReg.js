import Bottom from '../../components/Bottom.js';
import back_button from '../../assets/images/back_button.svg'
import Home from '../Home/Home.js'
import './LogReg.css';
import { BrowserRouter as Link } from 'react-router-dom';



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
          </div>
        </div>
            <Bottom />
      </div>
    );
  }
  
  export default LogReg;