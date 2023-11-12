import './Meditation_Circle.css';
import med_girl from './assets/meditation_girl.svg';
import gradient_circle from './assets/gradient_circle.svg';
import w_circle from './assets/white_circle.svg';

function Meditation_Circle(){
    return(
        <div className='Meditation_Circle'>
            <div>
                <img src={gradient_circle} alt="gradient_circle" />
            </div>

        </div>
    )
}

export default Meditation_Circle;