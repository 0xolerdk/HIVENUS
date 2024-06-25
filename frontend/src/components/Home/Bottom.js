import './Bottom.css';
import bowl from '../../assets/images/bowl.svg';
import bowl_1 from '../../assets/images/bowl_1.svg';
import dumb_bell from '../../assets/images/dumb-bell.svg';
import bottle from '../../assets/images/bottle.svg';
function Bottom() {
    return(
        
        <div className="Bottom">
            
            <div className='table'></div>
            <img className='bowl' src={bowl} alt="" />
            <img className='bowl_1' src={bowl_1} alt="" />
            <img className='dumb_bell' src={dumb_bell} alt="" />
            <img className='bottle' src={bottle} alt="" />
        </div>

    );
}

export default Bottom;