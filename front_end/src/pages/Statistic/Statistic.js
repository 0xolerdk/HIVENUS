import React from 'react';
import "../Statistic/Statistic.css"
import Top_Bar from '../../components/Top_Bar';
import Donut from '../../components/Donut';
import Calendar from '../../components/Calendar';
import Statistics from "../../components/Statistics"



function Statistic() {
    return (<div className=''>

    <div className="center"> 
                <Top_Bar />
                <Calendar />
                
        </div>
        <div>
        <Statistics />
        <Statistics />
        </div>
        
    
        
    </div>
        
        
);

}

export default Statistic;
