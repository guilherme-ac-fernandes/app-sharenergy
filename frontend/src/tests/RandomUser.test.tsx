import React from 'react';
import {
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { apiRandomUsers } from '../requests';
import { randomUsers } from './mocks/randomUsers';
import App from '../App';

// Data-testIds
const SEARCH_INPUT = 'search-user-input';
const SEARCH_BUTTON = 'search-user-button';
const RESET_SEARCH = 'reset-random-users';
const NEXT_USER_BUTTON = 'next-user';
const PARAGRAPH_SHOW_INDEX = 'show-index';
const PREVIOUS_USER_BUTTON = 'previous-user';
const SPINNER_LOADING = 'spinner';

const RANDOM_USER_CARD = 'random-user-card-';
const RANDOM_USER_IMAGE = 'random-user-img-';
const RANDOM_USER_FULLNAME = 'random-user-fullname-';
const RANDOM_USER_USERNAME = 'random-user-username-';
const RANDOM_USER_EMAIL = 'random-user-email-';
const RANDOM_USER_AGE = 'random-user-age-';

const RANDOM_USER_ARRAY_ELEMENTS = [
  SEARCH_INPUT,
  SEARCH_BUTTON,
  RESET_SEARCH,
  NEXT_USER_BUTTON,
  PARAGRAPH_SHOW_INDEX,
  PREVIOUS_USER_BUTTON,
];

const RANDOM_USER_DATA_TEST = [
  RANDOM_USER_CARD,
  RANDOM_USER_IMAGE,
  RANDOM_USER_FULLNAME,
  RANDOM_USER_USERNAME,
  RANDOM_USER_EMAIL,
  RANDOM_USER_AGE,
];

describe('Testes da tela de RandomUser', () => {
  it('se a tela é renderizada com os componentes corretos', async () => {
    jest.spyOn(apiRandomUsers, 'get').mockResolvedValue({
      data: randomUsers,
    });
    renderWithRouter(<App />, { route: '/users/random' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    RANDOM_USER_ARRAY_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });

    RANDOM_USER_DATA_TEST.forEach((dataTestId) => {
      expect(screen.getByTestId(`${dataTestId}0`)).toBeInTheDocument();
    });
  });

  it('realiza a filtragem dos usuários', async () => {
    jest.spyOn(apiRandomUsers, 'get').mockResolvedValue({
      data: randomUsers,
    });
    renderWithRouter(<App />, { route: '/users/random' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'Fitan');
    userEvent.click(searchButton);

    expect(screen.getByTestId(PARAGRAPH_SHOW_INDEX).innerHTML).toBe('1/1');
    expect(screen.getByTestId(NEXT_USER_BUTTON)).toBeDisabled();
  });

  it('mostra um alert quando não encontra usuários', async () => {
    jest.spyOn(apiRandomUsers, 'get').mockResolvedValue({
      data: randomUsers,
    });
    jest.spyOn(window, 'alert').mockImplementation();
    renderWithRouter(<App />, { route: '/users/random' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);

    userEvent.type(searchInput, 'xxxxxx');
    userEvent.click(searchButton);

    expect(window.alert).toBeCalled();
  });

  it('retorna os usuários após a filtragem', async () => {
    jest.spyOn(apiRandomUsers, 'get').mockResolvedValue({
      data: randomUsers,
    });
    renderWithRouter(<App />, { route: '/users/random' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const searchButton = screen.getByTestId(SEARCH_BUTTON);
    const resetButton = screen.getByTestId(RESET_SEARCH);

    userEvent.type(searchInput, 'Fitan');
    userEvent.click(searchButton);
    userEvent.click(resetButton);

    expect(screen.getByTestId(PARAGRAPH_SHOW_INDEX).innerHTML)
      .toBe(`1/${randomUsers.results.length}`);
  });

  it('avalia a paginação dos usuários', async () => {
    jest.spyOn(apiRandomUsers, 'get').mockResolvedValue({
      data: randomUsers,
    });
    renderWithRouter(<App />, { route: '/users/random' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const nextButton = screen.getByTestId(NEXT_USER_BUTTON);
    userEvent.click(nextButton);

    RANDOM_USER_DATA_TEST.forEach((dataTestId) => {
      expect(screen.getByTestId(`${dataTestId}1`)).toBeInTheDocument();
    });

    const previousButton = screen.getByTestId(PREVIOUS_USER_BUTTON);
    userEvent.click(previousButton);

    RANDOM_USER_DATA_TEST.forEach((dataTestId) => {
      expect(screen.getByTestId(`${dataTestId}0`)).toBeInTheDocument();
    });
  });
});
