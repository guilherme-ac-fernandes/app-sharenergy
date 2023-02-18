import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header/Header';
import App from '../App';

// Data-testIds
const HEADER_LOGO = 'header-logo';
const HEADER_BUTTON_SIGN_OUT = 'header-sign-out';

const HEADER_ARRAY_ELEMENTS = [
  HEADER_LOGO,
  HEADER_BUTTON_SIGN_OUT,
];

describe('Testes da do componente Header', () => {
  it('se a tela é renderizada com os componentes corretos', async () => {
    renderWithRouter(<Header />);

    HEADER_ARRAY_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('avalia se ao clicar de sign out e enviado para login', async () => {
    const { history } = renderWithRouter(<App />, { route: '/cat' });

    const signOutButton = screen.getByTestId(HEADER_BUTTON_SIGN_OUT);
    userEvent.click(signOutButton);
    waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
