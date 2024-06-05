import React from 'react';
import Wave from 'react-wavify';

export default function WavesCircle({ waveHeight = 50 }) {
  // Calculate the appropriate height and position based on waveHeight
  const heightPercentage = waveHeight / 100;
  const circleHeight = 200; // Assuming the SVG viewBox height is 200
  const waveYPosition = circleHeight * (1 - heightPercentage); // The y-coordinate where the wave starts

  // Define keyframes for the animation
  const waveAnimation = {
    animation: `fillWave 1s ease-in-out forwards`,
  };

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
                ...waveAnimation
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
                ...waveAnimation
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
                ...waveAnimation
              }}
            />
          </div>
        </foreignObject>
      </svg>
      <style jsx>{`
        @keyframes fillWave {
          0% {
            bottom: -200px;
          }
          100% {
            bottom: ${-waveYPosition}px;
          }
        }
      `}</style>
    </div>
  );
}
