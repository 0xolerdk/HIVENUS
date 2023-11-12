import clouds_big from '../assets/images/clouds_big.svg';
import med_girl from '../assets/images/meditation_girl.svg';
import gradient_circle from '../assets/images/gradient_circle.svg';
import w_circle from '../assets/images/white_circle.svg';
import cloud_small from '../assets/images/cloud_small.svg';
import sun from '../assets/images/sun.svg';
import sun_big from '../assets/images/sun_big.svg';
import news_box from '../assets/images/news_box.svg';
import bottle from '../assets/images/bottle.svg';
import airplane from '../assets/images/airplane.svg';
import clock from '../assets/images/clock.svg';
import '../components/Top.css';

function Top() {
  return (
    
    <div className="Top">

        <div className='Meditation_Circle'>
          <img  src={gradient_circle} alt="gradient_circle"></img>
        </div>

        <div className='w_circle'>
          <img  src={w_circle} alt="circle" />
        </div>

        <div className='med_girl'>
          < img  src={med_girl} alt="girl" />
        </div>

        <div className='Big_cloud'>
        </div>

        <div className='clock'>
          <img src={clock} alt="clock" />
        </div>

        <div className='sun'>
          <img src={sun} alt="sun" />
        </div>

        <div className='sun_big'>
          <img src={sun_big} alt="sun_big" />
        </div>

        <div className='cloud_small'>
          <img src={cloud_small} alt="cloud_small" />
        </div>

        <div className='news_box'>
          <img src={news_box} alt="news_box" />
        </div>

        <div className='bottle'>
          <img src={bottle} alt="bottle" />
        </div>

        <div className='airplane'>
          <img src={airplane} alt="airplane" />
        </div>

    </div>

  );
}

export default Top;
