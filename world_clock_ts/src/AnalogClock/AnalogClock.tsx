import { useState, useEffect, useCallback, useMemo } from 'react';
import './AnalogClock.css';
import { IClockProps } from '../Utils/Interface/Interface';

const AnalogClock: React.FC<IClockProps> = ({ timeZone }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const updateDate = () => {
      const newDate = new Date();
      setDate(newDate);
    };

    updateDate();
    const timerID = setInterval(updateDate, 1000);

    return () => clearInterval(timerID);
  }, [timeZone]);

  const getTimeInTimeZone = useCallback((): Date => {
    return new Date(date.toLocaleString('en-US', { timeZone }));
  }, [date, timeZone]);

  // Only include getTimeInTimeZone in the dependency array
  const currentTime = useMemo(() => getTimeInTimeZone(), [getTimeInTimeZone]);
  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const analogHandsOfClock = useCallback(() => {
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;
    return { secondDegrees, minuteDegrees, hourDegrees };
  }, [seconds, minutes, hours]);

  const analogNeedle = useMemo(
    () => analogHandsOfClock(),
    [analogHandsOfClock]
  );

  const { secondDegrees, minuteDegrees, hourDegrees } = analogNeedle;

  const renderNumbers = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const numberValue = i + 1;
      const angle = ((numberValue * 30 - 90) * Math.PI) / 180;
      const x = 100 + 70 * Math.cos(angle);
      const y = 100 + 70 * Math.sin(angle);
      return (
        <text
          x={x}
          y={y}
          className="number"
          key={numberValue}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {numberValue}
        </text>
      );
    });
  };

  return (
    <div className="clock">
      <div className="analogClock">
        <svg width="200" height="200">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#fefefe"
            strokeWidth="2"
            fill="#ece917"
            className="analogCircle"
          />
          {renderNumbers()}
        </svg>
        <div
          className="hand hour"
          style={{ transform: `rotate(${hourDegrees}deg)` }}
        ></div>
        <div
          className="hand minute"
          style={{ transform: `rotate(${minuteDegrees}deg)` }}
        ></div>
        <div
          className="hand second"
          style={{ transform: `rotate(${secondDegrees}deg)` }}
        ></div>
        <div className="center"></div>
      </div>
    </div>
  );
};

export default AnalogClock;
