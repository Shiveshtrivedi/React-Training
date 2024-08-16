/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-comment-textnodes */
import './App.css';
import AnalogClock from './AnalogClock';
import DigitalClock from './DigitalClock';
import { useState, ChangeEvent } from 'react';
import Header from './Header';

const App: React.FC = () => {
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
    <>
      <Header />
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
    </>
  );
};

export default App;
