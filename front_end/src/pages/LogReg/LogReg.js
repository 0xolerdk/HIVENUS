import Bottom from '../../components/Bottom.js';
import './LogReg.css';


function LogReg() {
    return (
      <div className="LogReg">
        <div className="top">
          <h1>Welcome to Our Website!</h1>
          <p>Please sign in or sign up to continue.</p>
          <div className="buttons">
            <button className="sign-in">Sign In</button>
            <button className="sign-up">Sign Up</button>
          </div>
        </div>
            <Bottom />

      </div>
    );
  }
  
  export default LogReg;