import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import notFound from '../../assets/not-found.png';
import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found-container">
      <Header />
      <img
        className="not-found-image"
        data-testid="not-found-image"
        src={notFound}
        alt="Logo"
      />
      <Footer />
    </section>
  );
}

export default NotFound;
