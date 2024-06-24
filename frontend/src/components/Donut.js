import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./Donut.css";
import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

Chart.register(ArcElement, Tooltip, DoughnutController);

function Donut({ data, options, width, height, text, font_size, link, tooltip = false, anim=true }) {
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
    <div>
      <Link to={link}>
        {anim ? (
          <div
            className="donut"
            style={{ width: width, height: height }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Doughnut data={data} options={updatedOptions} plugins={plugins} key={text} />
          </div>
        ) : (
          <div className="donut" style={{ width: width, height: height }}>
            <Doughnut data={data} options={updatedOptions} plugins={plugins} key={text} />
          </div>
        )}
      </Link>
    </div>
  );
}

export default Donut;
