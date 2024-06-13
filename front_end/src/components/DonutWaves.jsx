import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from 'react-router-dom';
import WavesCircle from './WavesCircle'; // Ensure correct import path
import "./DonutWaves.css";

Chart.register(ArcElement, Tooltip, DoughnutController);

function DonutWaves({ data, options, width = '400px', height = '400px', text, font_size, link, tooltip = true, anim=true, percent }) {
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

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
        var txt = textRef.current,
          textX = Math.round((width - ctx.measureText(txt).width) / 2),
          textY = height / 2;

        ctx.fillText(txt, textX, textY);
        ctx.save();
      },
    },
  ];

  const updatedOptions = {
    ...options,
    plugins: {
      tooltip: {
        enabled: tooltip,
      },
    },
  };

  return (
    <div className="donut-water-container">
      <Link to={link}>
        <div className="donut" style={{ width: width, height: height, position: 'relative' }}>
          <div className="wave-wrapper">
            <WavesCircle targetWaveHeight={percent}/>
          </div>
          <Doughnut data={data} options={updatedOptions} plugins={plugins} key={text} />
        </div>
      </Link>
    </div>
  );
}

export default DonutWaves;
