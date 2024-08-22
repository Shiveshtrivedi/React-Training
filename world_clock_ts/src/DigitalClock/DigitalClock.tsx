import { useCallback, useState, useEffect, useMemo } from 'react';
import moment from 'moment-timezone';
import './DigitalClock.css';
import { IClockProps, IFormattedTime } from '../Utils/Interface/Interface';

const DigitalClock: React.FC<IClockProps> = ({ timeZone }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [format, setFormat] = useState<'12hr' | '24hr'>('12hr');

  const getFormattedTime = useCallback((): IFormattedTime => {
    const momentDate = moment.tz(date, timeZone);
    const dateValue = momentDate.format('DD/MMM/YYYY');
    const timeValue = momentDate.format(
      format === '12hr' ? 'hh:mm:ss A' : 'HH:mm:ss'
    );

    const [hourResult, ...rest] = timeValue.split(' ');
    const meridian = format === '12hr' ? rest.pop() : '';

    return {
      dateValue,
      timeValue,
      hourResult,
      meridian,
    };
  }, [date, timeZone, format]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, [timeZone]);

  const { hourResult, meridian, dateValue } = useMemo(
    () => getFormattedTime(),
    [getFormattedTime]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormat(e.target.value as '12hr' | '24hr');
  };

  return (
    <div className="digitalClock">
      <div className="dateValue">{dateValue}</div>
      <div
        className={
          format === '12hr' ? 'digitalValues' : 'noMeridianDigitalValue'
        }
      >
        {hourResult}
        {format === '12hr' ? ` ${meridian}` : ''}
      </div>
      <div className="meridianValue">
        <input
          type="radio"
          id="12hr"
          name="format"
          value="12hr"
          checked={format === '12hr'}
          onChange={handleChange}
        />
        <label htmlFor="12hr">12 hour</label>
        <input
          type="radio"
          id="24hr"
          name="format"
          value="24hr"
          checked={format === '24hr'}
          onChange={handleChange}
        />
        <label htmlFor="24hr">24 hour</label>
      </div>
    </div>
  );
};

export default DigitalClock;
