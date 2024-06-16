import React, { useEffect, useState, useCallback } from "react";
import Donut from "./Donut";
import FCDService from "../services/FCDLogic";
import WaterIntakeService from "../services/WaterIntakeService";
import SleepTrackService from "../services/SleepTrackService";
import UserSettingsService from "../services/SettingsService";

const generateDataForSummaryDonut = (waterData, nutrientData, sleepDuration, userSettings) => {
    const recommendedSleep = userSettings.minSleep * 60; // Convert hours to minutes
    const recommendedWater = userSettings.maxWater;

    const recommendedCalories = userSettings.maxEnergy;
    const recommendedProtein = userSettings.maxProtein;
    const recommendedFat = userSettings.maxFat;
    const recommendedCarbohydrates = userSettings.maxCarbs;

    const calorieAchievement = nutrientData && nutrientData.Energy ? (nutrientData.Energy / recommendedCalories) * 100 : 0;
    const proteinAchievement = nutrientData && nutrientData.Protein ? (nutrientData.Protein / recommendedProtein) * 100 : 0;
    const fatAchievement = nutrientData && nutrientData['Total lipid (fat)'] ? (nutrientData['Total lipid (fat)'] / recommendedFat) * 100 : 0;
    const carbAchievement = nutrientData && nutrientData['Carbohydrate, by difference'] ? (nutrientData['Carbohydrate, by difference'] / recommendedCarbohydrates) * 100 : 0;

    const totalNutrientAchievement = (calorieAchievement + proteinAchievement + fatAchievement + carbAchievement) / 4 || 0;

    const waterConsumed = waterData && waterData.consumed ? waterData.consumed : 0;
    const sleepDurationInMinutes = sleepDuration || 0;

    return {
        labels: ["Water Intake", "Food Intake", "Sleep"],
        datasets: [
            {
                label: "Food Intake",
                data: [
                    Math.min(totalNutrientAchievement, 100),
                    Math.max(100 - totalNutrientAchievement, 0),
                    Math.max(totalNutrientAchievement - 100, 0)
                ],
                backgroundColor: ["#4caf50", "rgba(0, 0, 0, 0.1)", "#f44336"],
                borderWidth: 1,
                borderRadius: 50,
                borderColor: "rgba(0, 0, 0, 0.1)"
            },
            {
                label: "Sleep",
                data: [
                    Math.min(sleepDurationInMinutes, recommendedSleep),
                    Math.max(recommendedSleep - sleepDurationInMinutes, 0),
                    Math.max(sleepDurationInMinutes - recommendedSleep, 0)
                ],
                backgroundColor: ["#9674bc", "rgba(0, 0, 0, 0.1)", "#f44336"],
                borderWidth: 1,
                borderRadius: 50,
                borderColor: "rgba(0, 0, 0, 0.1)"
            },
            {
                label: "Water Intake",
                data: [
                    Math.min(waterConsumed, recommendedWater),
                    Math.max(recommendedWater - waterConsumed, 0),
                    Math.max(waterConsumed - recommendedWater, 0)
                ],
                backgroundColor: ["#00bcd4", "rgba(0, 0, 0, 0.1)", "#f44336"],
                borderWidth: 1,
                borderRadius: 50,
                borderColor: "rgba(0, 0, 0, 0.1)"
            }
        ]
    };
};

const SummaryDonut = ({ date, options, width, height, text }) => {
    const [totalNutrients, setTotalNutrients] = useState({});
    const [waterData, setWaterData] = useState({ consumed: 0, remaining: 2000 });
    const [sleepDuration, setSleepDuration] = useState(0);
    const [userSettings, setUserSettings] = useState({
        maxEnergy: 2000,
        maxProtein: 50,
        maxFat: 70,
        maxCarbs: 300,
        maxWater: 2000,
        minSleep: 8
    });

    useEffect(() => {
        const fetchUserSettings = async () => {
            try {
                const settings = await UserSettingsService.getSettings();
                setUserSettings(settings);
            } catch (error) {
                console.error("Error fetching user settings:", error);
            }
        };

        fetchUserSettings();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const nutrient = await FCDService.calculateDailyNutrients(date.format("YYYY-MM-DD"));
            setTotalNutrients(nutrient);
        } catch (error) {
            console.error("Error fetching daily nutrients:", error);
        }
    }, [date]);

    const fetchWaterData = useCallback(async () => {
        try {
            const response = await WaterIntakeService.getWaterDataByDate(date.format('YYYY-MM-DD'));
            const waterIntakes = response.data;
            const totalIntake = waterIntakes.reduce((sum, intake) => sum + intake.amount, 0);
            const cappedIntake = Math.min(totalIntake, userSettings.maxWater);
            setWaterData({ consumed: cappedIntake, remaining: userSettings.maxWater - cappedIntake });
        } catch (error) {
            console.error("Error fetching water data:", error);
        }
    }, [date, userSettings.maxWater]);

    const fetchSleepData = useCallback(async () => {
        try {
            const response = await SleepTrackService.getSleepDataByDate(date.format('YYYY-MM-DD'));
            const sleepData = response.data;

            if (sleepData) {
                const duration = calculateSleepDuration(sleepData.startTime, sleepData.endTime);
                setSleepDuration(duration);
            } else {
                setSleepDuration(0);
            }
        } catch (error) {
            console.error("Error fetching sleep data:", error);
        }
    }, [date]);

    const calculateSleepDuration = (startMinutes, endMinutes) => {
        if (endMinutes < startMinutes) {
            return (1440 - startMinutes) + endMinutes;
        }
        return endMinutes - startMinutes;
    };

    useEffect(() => {
        fetchData();
        fetchWaterData();
        fetchSleepData();
    }, [date, fetchData, fetchWaterData, fetchSleepData]);

    const summaryData = generateDataForSummaryDonut(waterData, totalNutrients, sleepDuration, userSettings);

    return (
        <div>
            <Donut
                data={summaryData}
                options={options}
                width={width}
                height={height}
                text={text}
            />
        </div>
    );
};

export default SummaryDonut;
