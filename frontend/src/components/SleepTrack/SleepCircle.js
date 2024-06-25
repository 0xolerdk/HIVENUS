// noinspection DuplicatedCode

import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./SleepCircle.css";
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import FoxCircle from "./FoxCircle";

Chart.register(ArcElement, Tooltip, DoughnutController);

function SleepCircle({ data, options, width, height, text, font_size, link, tooltip = false, anim=true }) {
  const textRef = useRef(text);

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

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
        var txt = textRef.current, // Use the current value of the ref here
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
    <div className="donut-container">
      <Link to={link}>
        <div className="donut" style={{ width: width, height: height, position: 'relative' }}>
          <div className="fox-wrapper">
            <FoxCircle isChecked={isChecked} handleToggle={handleToggle}/>
          </div>
          <Doughnut data={data} options={updatedOptions} plugins={plugins} key={text} />
        </div>
      </Link>
      {/*<div className="switch-container">*/}
      {/*  <ToggleSwitch isChecked={isChecked} handleToggle={handleToggle} />*/}
      {/*</div>*/}
    </div>
  );
}

export default SleepCircle;
