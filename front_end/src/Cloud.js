import clouds_big from './assets/clouds_big.svg';
import med_girl from './assets/meditation_girl.svg';
import gradient_circle from './assets/gradient_circle.svg';
import w_circle from './assets/white_circle.svg';
import './Cloud.css';

function Cloud() {
  return (
    <div className="Cloud">
      <div className='med_girl'>
        <img src={med_girl} alt="girl" />
      </div>
      <div className='w_circle'>
        <img src={w_circle} alt="circle" />
      </div>
      <div className='Meditation_Circle'>
            <div>
                <img src={gradient_circle} alt="gradient_circle" />
            </div>
        </div>
      <div className="Big_cloud">
        <img src={clouds_big} alt="cloud"></img>
        
      </div>
      <div className='cloud_cont'></div>
    </div>
  );
}

export default Cloud;
