import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "./Donut.css"

Chart.register(ArcElement);





function Donut({data, options, width, height}) {
  return (
    <div className='donut' style={{ width: width, height: height }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Donut;
