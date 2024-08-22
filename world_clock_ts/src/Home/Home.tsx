/* eslint-disable react/react-in-jsx-scope */

import AnalogClock from '../AnalogClock/AnalogClock';
import DigitalClock from '../DigitalClock/DigitalClock';
import { useState, ChangeEvent, useEffect } from 'react';
import './Home.css';
import { ThemeProvider } from '../Contexts/Theme';
import ThemeButton from '../Theme/ThemeButton';

const Home = () => {
  const [timeZone, setTimeZone] = useState<string>('Asia/Kolkata');
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>('India');

  const timeZoneNames: Record<string, string> = {
    'Asia/Kolkata': 'India',
    'America/New_York': 'U.S.A.',
    'Asia/Tokyo': 'Japan',
    'Europe/London': 'Europe',
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTimeZone(e.target.value);
    setSelectedTimeZone(timeZoneNames[e.target.value]);
  };

  const [themeMode, setThemeMode] = useState<string>('light');
  const lightTheme = () => {
    setThemeMode('light');
  };
  const darkTheme = () => {
    setThemeMode('dark');
  };

  useEffect(() => {
    const clockElement = document.querySelector('.timezoneClock');
    if (clockElement) {
      clockElement.classList.remove('light', 'dark');
      clockElement.classList.add(themeMode);
    }
  }, [themeMode]);

  return (
    <ThemeProvider value={{ theme: themeMode, lightTheme, darkTheme }}>
      <div className="clockContainer">
        <div className="timezoneClock">
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
          <ThemeButton />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Home;
