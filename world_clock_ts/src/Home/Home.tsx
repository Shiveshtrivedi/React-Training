/* eslint-disable react/react-in-jsx-scope */

import AnalogClock from '../AnalogClock/AnalogClock';
import DigitalClock from '../DigitalClock/DigitalClock';
import { useState, ChangeEvent } from 'react';
import './Home.css';
const Home = () => {
  const [timeZone, setTimeZone] = useState<string>('Asia/Kolkata');
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('India');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTimeZone(e.target.value);
    const timeZoneNames: Record<string, string> = {
      'Asia/Kolkata': 'India',
      'America/New_York': 'U.S.A.',
      'Asia/Tokyo': 'Japan',
      'Europe/London': 'Europe',
    };

    setSelectedTimeZone(timeZoneNames[e.target.value]);
  };
  return (
    <div className="clockContainer">
        <div className="light timezoneClock">
          <div className="dropdownContainer">
            <label htmlFor="timeZoneDropdown">Select a Timezone:</label>
            <select
              name="timeZoneDropdown"
              id="timeZoneDropdown"
              onChange={handleChange}
            >
              <option value="Asia/Kolkata">India</option>
              <option value="America/New_York">U.S.A.</option>
              <option value="Asia/Tokyo">Japan</option>
              <option value="Europe/London">Europe</option>
            </select>
          </div>
          <h3 className="timezoneHeading">{selectedTimeZone}</h3>
          <AnalogClock timeZone={timeZone} />
          <DigitalClock timeZone={timeZone} />
        </div>
      </div>
  );
};
export default Home;
