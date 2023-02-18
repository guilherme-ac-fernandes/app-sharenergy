import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import { apiDog } from '../requests';
import { dog, newDog } from './mocks/dog';

import App from '../App';

// Data-testIds
const DOG_BUTTON = 'fetch-new-dog';
const DOG_IMAGE = 'dog-image';

const DOG_ARRAY_ELEMENTS = [
  DOG_BUTTON,
  DOG_IMAGE,
];

describe('Testes da tela de Dog', () => {
  it('se a tela é renderizada com os componentes corretos', async () => {
    jest.spyOn(apiDog, 'get').mockResolvedValue({
      data: dog,
    });
    await act(async () => renderWithRouter(<App />, { route: '/dog' }));

    act(() => {
      DOG_ARRAY_ELEMENTS.forEach((dataTestId) => {
        expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
      });
    });
  });

  it('se ao clicar no botão "Novo cão", realiza nova requisição', async () => {
    const dogAxios = jest.spyOn(apiDog, 'get').mockResolvedValueOnce({
      data: dog,
    }).mockResolvedValueOnce({
      data: newDog,
    });
    await act(async () => renderWithRouter(<App />, { route: '/dog' }));

    const newDogButton = screen.getByTestId(DOG_BUTTON);
    const dogImage = screen.getByTestId(DOG_IMAGE);

    expect(dogImage).toHaveAttribute('src', dog.url);
    userEvent.click(newDogButton);
    expect(dogAxios).toBeCalled();

    waitFor(() => expect(dogImage).toHaveAttribute('src', newDog.url));
  });
});
