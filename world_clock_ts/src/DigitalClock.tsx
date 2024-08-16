/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useCallback, useState, useEffect } from 'react';
import './DigitalClock.css';

interface DigitalClockProps {
  timeZone: string;
}

interface FormattedTime {
  dateValue: string;
  timeValue: string;
  hourResult: string;
  meridian?: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ timeZone }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [format, setFormat] = useState<'12hr' | '24hr'>('12hr');

  const getOptions = useCallback((): Intl.DateTimeFormatOptions => {
    return {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: format === '12hr',
    };
  }, [timeZone, format]);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getFormattedTime = useCallback((): FormattedTime => {
    const formatter = new Intl.DateTimeFormat('en-US', getOptions());
    const formattedTime = formatter.format(date);

    const [hourResult, ...rest] = formattedTime.split(' ');
    const meridian = format === '12hr' ? rest.pop() : '';

    return {
      dateValue: formatDate(date),
      timeValue: formattedTime,
      hourResult,
      meridian,
    };
  }, [date, getOptions, format]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, [timeZone]);

  const { hourResult, meridian, dateValue } = getFormattedTime();

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
