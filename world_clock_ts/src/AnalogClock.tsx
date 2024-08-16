/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect, useCallback, useMemo } from 'react';
import './AnalogClock.css';

interface AnalogClockProps {
  timeZone: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ timeZone }) => {
  const [date, setDate] = useState<Date>(new Date());

  const options = useCallback(
    () => ({ timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    [timeZone]
  );

  useEffect(() => {
    const updateDate = () => {
      const newDate = new Date();
      setDate(newDate);
    };

    updateDate();
    const timerID = setInterval(updateDate, 1000);

    return () => clearInterval(timerID);
  }, [options]);

  const getTimeInTimeZone = (): Date => {
    return new Date(date.toLocaleString('en-US', { timeZone }));
  };

  const seconds = getTimeInTimeZone().getSeconds();
  const minutes = getTimeInTimeZone().getMinutes();
  const hours = getTimeInTimeZone().getHours();

  const analogHandsOfClock = () => {
    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;
    return { secondDegrees, minuteDegrees, hourDegrees };
  };

  const analogNeedle = useMemo(
    () => analogHandsOfClock(),
    [analogHandsOfClock]
  );

  const { secondDegrees, minuteDegrees, hourDegrees } = analogNeedle;

  const renderNumbers = () => {
    const numbers: JSX.Element[] = [];
    for (let numberValue = 1; numberValue <= 12; numberValue++) {
      const angle = ((numberValue * 30 - 90) * Math.PI) / 180;
      const x = 100 + 70 * Math.cos(angle);
      const y = 100 + 70 * Math.sin(angle);
      numbers.push(
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
    }
    return numbers;
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
