import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <nav className='headerContainer'>
      <h1 className="header">World clock</h1>
      <ul className='unorderedListForHeaderLink'>
        <li>
          <Link to="/" className='linksInHeader' >Home</Link>
        </li>
      </ul>
      <ul className='unorderedListForHeaderLink'>
        <li>
          <Link to="/signup" className='linksInHeader'>SignUp</Link>
        </li>
      </ul>
      <ul className='unorderedListForHeaderLink'>
        <li>
          <Link to="/login" className='linksInHeader'>Login</Link>
        </li>
      </ul>
      <ul className='unorderedListForHeaderLink'>
        <li>
          <Link to="/about" className='linksInHeader'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
