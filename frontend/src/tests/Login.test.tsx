import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { getItem, setItem } from '../helpers/localStorage';

import App from '../App';

// Data-testIds
const LOGIN_USERNAME = 'login-username';
const LOGIN_PASSWORD = 'login-password';
const LOGIN_CHECKBOX = 'login-remember-me';
const LOGIN_BUTTON = 'login-sign-in';

const LOGIN_ARRAY_ELEMENTS = [
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  LOGIN_CHECKBOX,
  LOGIN_BUTTON,
];

const VALID_LOGIN = {
  username: 'desafiosharenergy',
  password: 'sh@r3n3rgy',
};

describe('Testes da tela de Login', () => {
  it('se a tela de login é renderizada na rota esperada', async () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
    LOGIN_ARRAY_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });
  });

  it('se o login é realizado com os dados válidos', async () => {
    const { history } = renderWithRouter(<App />);

    const inputUsername = screen.getByTestId(LOGIN_USERNAME);
    const inputPassword = screen.getByTestId(LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(inputUsername, VALID_LOGIN.username);
    userEvent.type(inputPassword, VALID_LOGIN.password);

    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/users/random');
  });

  it('se o login é realizado com a opção de "lembra de mim"', async () => {
    const { history } = renderWithRouter(<App />);

    const inputUsername = screen.getByTestId(LOGIN_USERNAME);
    const inputPassword = screen.getByTestId(LOGIN_PASSWORD);
    const checkbokRemember = screen.getByTestId(LOGIN_CHECKBOX);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(inputUsername, VALID_LOGIN.username);
    userEvent.type(inputPassword, VALID_LOGIN.password);
    userEvent.click(checkbokRemember);
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/users/random');
    expect(getItem('user')).toEqual(VALID_LOGIN);
  });

  it('se tiver localStorage, mostrar os dados do usuário', async () => {
    setItem('user', VALID_LOGIN);
    renderWithRouter(<App />);

    const inputUsername = screen.getByTestId(LOGIN_USERNAME);
    const inputPassword = screen.getByTestId(LOGIN_PASSWORD);

    expect(inputUsername).toHaveValue(VALID_LOGIN.username);
    expect(inputPassword).toHaveValue(VALID_LOGIN.password);
  });

  it('o login não é realizado com os dados inválidos', async () => {
    jest.spyOn(window, 'alert').mockImplementation();
    const { history } = renderWithRouter(<App />);

    const inputUsername = screen.getByTestId(LOGIN_USERNAME);
    const inputPassword = screen.getByTestId(LOGIN_PASSWORD);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(inputUsername, 'invalid_user');
    userEvent.type(inputPassword, '1234567890');

    userEvent.click(loginButton);

    expect(window.alert).toBeCalled();

    expect(history.location.pathname).toBe('/');
  });
});
