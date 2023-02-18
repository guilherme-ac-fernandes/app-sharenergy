import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer/Footer';
import App from '../App';
import { apiCrudUsers, apiDog, apiRandomUsers } from '../requests';
import { randomUsers } from './mocks/randomUsers';
import { dog } from './mocks/dog';
import { crudUsers } from './mocks/crudUsers';

// Data-testIds
const FOOTER_LINK_RANDOM_USER = 'footer-random-user';
const FOOTER_LINK_CAT = 'footer-cat';
const FOOTER_LINK_DOG = 'footer-dog';
const FOOTER_LINK_CRUD_USER = 'footer-crud-user';

const FOOTER_ARRAY_ELEMENTS = [
  FOOTER_LINK_RANDOM_USER,
  FOOTER_LINK_CAT,
  FOOTER_LINK_DOG,
  FOOTER_LINK_CRUD_USER,
];

describe('Testes da do componente Footer', () => {
  it('se a tela é renderizada com os componentes corretos', async () => {
    renderWithRouter(<Footer />);

    FOOTER_ARRAY_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('avalia a mudança da rota atráves dos links', async () => {
    jest.spyOn(apiRandomUsers, 'get').mockResolvedValue({
      data: randomUsers,
    });
    jest.spyOn(apiDog, 'get').mockResolvedValue({
      data: dog,
    });
    jest.spyOn(apiCrudUsers, 'get').mockResolvedValue({
      data: crudUsers,
    });

    const { history } = renderWithRouter(<App />, { route: '/users/random' });

    const randomUserButton = screen.getByTestId(FOOTER_LINK_RANDOM_USER);
    const catButton = screen.getByTestId(FOOTER_LINK_CAT);
    const dogButton = screen.getByTestId(FOOTER_LINK_DOG);
    const crudUserButton = screen.getByTestId(FOOTER_LINK_CRUD_USER);

    userEvent.click(catButton);
    waitFor(() => expect(history.location.pathname).toBe('/cat'));

    userEvent.click(dogButton);
    waitFor(() => expect(history.location.pathname).toBe('/dog'));

    userEvent.click(crudUserButton);
    waitFor(() => expect(history.location.pathname).toBe('/users/crud'));

    userEvent.click(randomUserButton);
    waitFor(() => expect(history.location.pathname).toBe('/users/random'));
  });
});
