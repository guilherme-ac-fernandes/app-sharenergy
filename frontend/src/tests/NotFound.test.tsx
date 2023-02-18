import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Data-testIds
const NOT_FOUND_IMAGE = 'not-found-image';

describe('Testes da tela de NotFound', () => {
  it('se a tela é renderizada em uma rota não existente', async () => {
    renderWithRouter(<App />, { route: '/errado' });

    const notFoundImage = screen.getByTestId(NOT_FOUND_IMAGE);
    expect(notFoundImage).toBeInTheDocument();
  });
});
