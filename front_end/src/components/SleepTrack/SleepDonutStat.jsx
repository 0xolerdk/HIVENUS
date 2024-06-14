import React from "react";
import Donut from "../Donut"; // Assuming you have a Donut component
import PropTypes from 'prop-types';

const calculateRemaining = (duration, recommended) => {
    return duration > recommended ? 0 : recommended - duration;
};

const calculateExcess = (duration, recommended) => {
    return duration > recommended ? duration - recommended : 0;
};

const generateDataForSleepCircle = (duration) => {
    const recommendedSleep = 480; // 8 hours in minutes
    const sleepData = [
        duration > recommendedSleep ? recommendedSleep : duration, // Consumed
        calculateRemaining(duration, recommendedSleep), // Left
        calculateExcess(duration, recommendedSleep), // Excess
    ];

    return {
        labels: ["Consumed", "Left", "Excess"],
        datasets: [
            {
                label: "Sleep Data",
                data: sleepData,
                backgroundColor: ["#e91e63", "rgba(0, 0, 0, 0.1)", "#ff0000"],
                borderWidth: 5,
                borderColor: "#333333",
                borderRadius: 50,
            },
        ],
    };
};

const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
};

const SleepDonut = ({ duration, options, width, height }) => {
    const circleData = generateDataForSleepCircle(duration);
    const formattedDuration = formatDuration(duration);

    return (
        <div>
            <Donut
                data={circleData}
                options={options}
                width={width}
                font_size={2}
                height={height}
                text={`Sleep Track`
                }
            />
        </div>
    );
};

SleepDonut.propTypes = {
    duration: PropTypes.number.isRequired,
    options: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
};

SleepDonut.defaultProps = {
    options: {},
    width: 400,
    height: 400,
};

export default SleepDonut;
