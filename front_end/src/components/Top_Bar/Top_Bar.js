import './Top_Bar.css';
import logo from "../../assets/images/logo.svg";
import Add from './Add';

function Top_Bar() {
    return (
        <div className="bar"> 
            
            <div className="menu">
                <img className='logo' src={logo} alt="" />
                <button className="menu-button">Statistic</button>

                <button className="menu-button">Settings</button>
                <Add/>
                
                
            </div>
            
        </div>
    );
}

export default Top_Bar;