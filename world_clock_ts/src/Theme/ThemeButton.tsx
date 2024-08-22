/* eslint-disable react/react-in-jsx-scope */
import useTheme from '../Contexts/Theme';
import './ThemeButton.css';
import { CiDark, CiLight } from 'react-icons/ci';

const ThemeButton = () => {
  const { theme, lightTheme, darkTheme } = useTheme();
  const onChangeBtn = () => {
    if (theme === 'light') {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <button onClick={onChangeBtn} className="themeButton">
      {theme === 'light' ? <CiLight /> : <CiDark />}
    </button>
  );
};
export default ThemeButton;
