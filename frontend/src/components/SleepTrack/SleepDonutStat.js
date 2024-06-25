// noinspection DuplicatedCode

import React, { useState, useEffect } from "react";
import Donut from "../Donut";
import PropTypes from 'prop-types';
import SettingsService from "../../services/SettingsService";

const calculateRemaining = (duration, recommended) => {
    return duration > recommended ? 0 : recommended - duration;
};

const calculateExcess = (duration, recommended) => {
    return duration > recommended ? duration - recommended : 0;
};

const generateDataForSleepCircle = (duration, recommendedSleep) => {
    const sleepData = [
        duration > recommendedSleep ? recommendedSleep : duration,
        calculateRemaining(duration, recommendedSleep),
        calculateExcess(duration, recommendedSleep),
    ];

    return {
        labels: ["Consumed", "Left", "Excess"],
        datasets: [
            {
                label: "Sleep Data",
                data: sleepData,
                backgroundColor: ["#9674bc", "rgba(0, 0, 0, 0.1)", "#f44336"],
                borderWidth: 5,
                borderColor: "rgba(0, 0, 0, 0.1)",
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

const SleepDonut = ({ duration, options, width, height, link }) => {
    const [recommendedSleep, setRecommendedSleep] = useState(480);

    useEffect(() => {
        const fetchUserSettings = async () => {
            try {
                const settings = await SettingsService.getSettings();
                setRecommendedSleep(settings.minSleep * 60);
            } catch (error) {
                console.error("Error fetching user settings:", error);
            }
        };

        fetchUserSettings();
    }, []);

    const circleData = generateDataForSleepCircle(duration, recommendedSleep);
    const formattedDuration = formatDuration(duration);

    return (
        <div>
            <Donut
                data={circleData}
                options={options}
                width={width}
                font_size={2}
                height={height}
                text={`Sleep Track`}
                link={link}
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
