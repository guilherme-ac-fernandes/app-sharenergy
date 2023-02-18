import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Data-testIds
const CAT_INPUT = 'cat-status-code';
const CAT_IMAGE = 'cat-image';

const CAT_ARRAY_ELEMENTS = [
  CAT_INPUT,
  CAT_IMAGE,
];

describe('Testes da tela de Cat', () => {
  it('se a tela é renderizada com os componentes corretos', async () => {
    renderWithRouter(<App />, { route: '/cat' });

    CAT_ARRAY_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('se retorna a imagem referente ao status informado', async () => {
    renderWithRouter(<App />, { route: '/cat' });

    act(() => {
      const catInput = screen.getByTestId(CAT_INPUT);
      const catImage = screen.getByTestId(CAT_IMAGE);

      userEvent.clear(catInput);
      expect(catImage).toHaveAttribute('src', 'https://http.cat/201.jpg');

      userEvent.type(catInput, '500');
      waitFor(() => expect(catImage)
        .toHaveAttribute('src', 'https://http.cat/500.jpg'));

      userEvent.type(catInput, '999');
      waitFor(() => expect(catImage)
        .toHaveAttribute('src', 'https://http.cat/999.jpg'));
    });
  });
});
