import React from 'react';
import {
  FaUserFriends, FaCat, FaDog, FaUserPlus,
} from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <a data-testid="footer-random-user" href="/users/random" rel="noreferrer">
        <FaUserFriends />
      </a>
      <a data-testid="footer-cat" href="/cat" rel="noreferrer">
        <FaCat />
      </a>
      <a data-testid="footer-dog" href="/dog" rel="noreferrer">
        <FaDog />
      </a>
      <a data-testid="footer-crud-user" href="/users/crud" rel="noreferrer">
        <FaUserPlus />
      </a>
    </footer>
  );
}

export default Footer;
