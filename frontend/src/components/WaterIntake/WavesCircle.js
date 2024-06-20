import React, { useEffect, useState } from 'react';
import Wave from 'react-wavify';
import { debounce } from 'lodash';

export default function WavesCircle({ targetWaveHeight }) {
    const [waveHeight, setWaveHeight] = useState(0); // Start at 0

    const debouncedSetWaveHeight = debounce((height) => {
        setWaveHeight(height);
    }, 100); // Adjust debounce delay as needed

    useEffect(() => {
        debouncedSetWaveHeight(targetWaveHeight);
    }, [targetWaveHeight]);

    const heightPercentage = waveHeight / 100;
    const circleHeight = 200; // Assuming the SVG viewBox height is 200
    const waveYPosition = circleHeight * (1 - heightPercentage); // The y-coordinate where the wave starts

    return (
        <div className="waves-circle">
            <svg width="100%" height="100%" viewBox="0 0 200 200">
                <defs>
                    <clipPath id="circleClip">
                        <circle cx="100" cy="100" r="100" />
                    </clipPath>
                </defs>
                <foreignObject x="0" y="0" width="200" height="200" clipPath="url(#circleClip)">
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Wave
                            fill="#98C8ED"
                            options={{ height: 20, points: 5, speed: 0.15, amplitude: 20 }}
                            style={{
                                width: '100%',
                                height: `${circleHeight}px`,
                                position: 'absolute',
                                bottom: `${-waveYPosition}px`,
                                left: 0,
                                transition: 'bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1)', // Smooth transition easing
                            }}
                        />
                        <Wave
                            fill="#5aa9e2"
                            options={{ height: 30, points: 4, speed: 0.1, amplitude: 15 }}
                            style={{
                                width: '100%',
                                height: `${circleHeight}px`,
                                position: 'absolute',
                                bottom: `${-waveYPosition}px`,
                                left: 0,
                                transition: 'bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1)', // Smooth transition easing
                            }}
                        />
                        <Wave
                            fill="#7AB9E8"
                            options={{ height: 20, points: 5, speed: 0.3, amplitude: 25 }}
                            style={{
                                width: '100%',
                                height: `${circleHeight}px`,
                                position: 'absolute',
                                bottom: `${-waveYPosition}px`,
                                left: 0,
                                transition: 'bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1)', // Smooth transition easing
                            }}
                        />
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}
