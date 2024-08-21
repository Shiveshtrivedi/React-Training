import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  isSignedIn: boolean;
  signOut: () => void; 
}

const Header: React.FC<HeaderProps> = ({ isSignedIn, signOut }) => {
  return (
    <nav className="headerContainer">
      <h1 className="header">World Clock</h1>
      <ul className="unorderedListForHeaderLink">
        {isSignedIn && (
          <>
            <li>
              <Link to="/" className="linksInHeader">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="linksInHeader">
                About
              </Link>
            </li>
            <li>
              <button onClick={signOut} className="linksInHeaderButton">
                SignOut
              </button>
            </li>
          </>
        )}
        {!isSignedIn && (
          <>
            <li>
              <Link to="/signup" className="linksInHeader">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="linksInHeader">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
