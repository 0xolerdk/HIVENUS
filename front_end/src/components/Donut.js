import { Chart, ArcElement, DoughnutController } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Donut.css";
import { text } from "d3";
import { BrowserRouter as Route, Routes, Link } from 'react-router-dom';


Chart.register(ArcElement, DoughnutController);

function Donut({ data, options, width, height, text, font_size, link }) {
  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;

        ctx.restore();
        var fontSize = (height / 100).toFixed(2);
        if (typeof font_size !== "undefined") {
          fontSize = font_size;
        }

        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        var txt = text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(txt, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <div>
       <Link to={link}> <div
      className="donut"
      style={{ width: width, height: height }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >

      <Doughnut data={data} options={options} plugins={plugins} />
    </div></Link>
     
    </div>
    
    
  );
}

export default Donut;
