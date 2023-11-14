import clouds_big from '../assets/images/clouds_big.svg';
import med_girl from '../assets/images/meditation_girl.svg';
import gradient_circle from '../assets/images/gradient_circle.svg';
import w_circle from '../assets/images/white_circle.svg';
import cloud_small from '../assets/images/cloud_small.svg';
import sun from '../assets/images/sun.svg';
import sun_big from '../assets/images/sun_big.svg';
import news_box from '../assets/images/news_box.svg';
import airplane from '../assets/images/airplane.svg';
import clock from '../assets/images/clock.svg';
import '../components/Top.css';
import Bottom from './Bottom';
import Top_Button from './Top_Button.js';


function Top() {
  return (
    <div className='Top'>
    <div className="back">
      <img className='sun_big' src={sun_big} alt="" />
        <div className='Big_cloud'>
          <img className='gradient_circle' src={gradient_circle} alt="alt" />
          <Top_Button />
          <img className='w_circle' src={w_circle} alt="" />
          <img className='med_girl' src={med_girl} alt="" />
          <img className='cloud_small' src={cloud_small} alt="" />
          <img className='cloud_small_1' src={cloud_small} alt="" />
          <img className='sun' src={sun} alt="" />
          <img className='news_box' src={news_box} alt="" />
          <img className='airplane' src={airplane} alt="" />
          <img className='clock' src={clock} alt="" />
          
          </div>
          
        
          <div className='big_cloud_cont'></div>
    
    <Bottom />
    </div>
    </div>
  );
}

export default Top;
