import React from 'react';
import './Loading.css';

// Componente de carregamento proveniente site Contactmentor
// source: https://contactmentor.com/how-to-add-loading-spinner-react-js/
export default function Loading() {
  return (
    <div data-testid="spinner" className="spinner-container">
      <div className="loading-spinner" />
    </div>
  );
}
