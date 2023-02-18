import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/sharenergy_white.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img data-testid="header-logo" src={logo} alt="Logo" />
      <a href="/" data-testid="header-sign-out">
        <FaSignOutAlt />
      </a>
    </header>
  );
}

export default Header;
