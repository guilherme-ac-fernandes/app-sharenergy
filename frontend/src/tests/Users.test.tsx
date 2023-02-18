import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import { apiCrudUsers } from '../requests';
import {
  crudUsers,
  newCrudUsers,
  updateCrudUser,
  updatecrudUsers,
} from './mocks/crudUsers';

import App from '../App';

// Data-testIds - USERS CRUD
const USER_CRUD_PAGE_TITLE = 'title-crud-user';
const OPEN_MODAL_BUTTON = 'open-modal_button-crud-user';
const USER_CRUD_NAME_INPUT = 'user-crud-name';
const USER_CRUD_EMAIL_INPUT = 'user-crud-email';
const USER_CRUD_PHONE_NUMBER_INPUT = 'user-crud-phoneNumber';
const USER_CRUD_ADDRESS_INPUT = 'user-crud-address';
const USER_CRUD_CPF_INPUT = 'user-crud-cpf';
const USER_CRUD_CREATE_BUTTON = 'user-crud-create';
const USER_CRUD_EDIT_BUTTON = 'user-crud-edit';
const USER_CRUD_NOT_FOUND_USERS = 'not-found-crud-user-message';
const SPINNER_LOADING = 'spinner';

const USER_CRUD_CARD = 'crud-user-card-';
const USER_CRUD_NAME = 'crud-user-name-';
const USER_CRUD_EMAIL = 'crud-user-email-';
const USER_CRUD_PHONE_NUMBER = 'crud-user-phoneNumber-';
const USER_CRUD_ADDRESS = 'crud-user-address-';
const USER_CRUD_CDF = 'crud-user-cpf-';
const USER_CRUD_CARD_EDIT_BUTTON = 'crud-user-update-user-';
const USER_CRUD_CARD_DELETE_BUTTON = 'crud-user-remove-user-';

const USER_CRUD_ARRAY_ELEMENTS = [
  USER_CRUD_PAGE_TITLE,
  OPEN_MODAL_BUTTON,
  USER_CRUD_NAME_INPUT,
  USER_CRUD_EMAIL_INPUT,
  USER_CRUD_PHONE_NUMBER_INPUT,
  USER_CRUD_ADDRESS_INPUT,
  USER_CRUD_CPF_INPUT,
  USER_CRUD_CREATE_BUTTON,
];

describe('Testes da tela de Users (CRUD)', () => {
  it('se a tela é renderizada com os componentes corretos', async () => {
    jest.spyOn(apiCrudUsers, 'get').mockResolvedValue({
      data: crudUsers,
    });
    act(() => renderWithRouter(<App />, { route: '/users/crud' }));

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    USER_CRUD_ARRAY_ELEMENTS.forEach((dataTestId) => {
      expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
    });

    const userEditButton = screen.queryByTestId(USER_CRUD_EDIT_BUTTON);

    expect(userEditButton).not.toBeInTheDocument();
  });

  it('renderiza os usuários retornados pela api na modal', async () => {
    jest.spyOn(apiCrudUsers, 'get').mockResolvedValue({
      data: crudUsers,
    });
    renderWithRouter(<App />, { route: '/users/crud' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const usersModalButton = screen.getByTestId(OPEN_MODAL_BUTTON);
    userEvent.click(usersModalButton);

    crudUsers.forEach((user) => {
      expect(screen.getByTestId(`${USER_CRUD_CARD}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_NAME}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_EMAIL}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_PHONE_NUMBER}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_ADDRESS}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_CDF}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_CARD_EDIT_BUTTON}${user._id}`))
        .toBeInTheDocument();
      expect(screen.getByTestId(`${USER_CRUD_CARD_DELETE_BUTTON}${user._id}`))
        .toBeInTheDocument();

      expect(screen.getByTestId(`${USER_CRUD_NAME}${user._id}`).innerHTML)
        .toBe(user.name);
    });
  });

  it('renderiza a mensagem no modal quando não retorna usuários', async () => {
    jest.spyOn(apiCrudUsers, 'get').mockResolvedValue({
      data: [],
    });
    renderWithRouter(<App />, { route: '/users/crud' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const usersModalButton = screen.getByTestId(OPEN_MODAL_BUTTON);

    userEvent.click(usersModalButton);

    const notFoundUsersMessage = screen.getByTestId(USER_CRUD_NOT_FOUND_USERS);
    expect(notFoundUsersMessage).toBeInTheDocument();
  });

  it('se é possível criar um novo usuário', async () => {
    jest.spyOn(apiCrudUsers, 'get')
      .mockResolvedValueOnce({
        data: crudUsers,
      }).mockResolvedValueOnce({
        data: [...crudUsers, newCrudUsers],
      });

    const postAxios = jest.spyOn(apiCrudUsers, 'post').mockResolvedValue({
      data: newCrudUsers,
    });

    renderWithRouter(<App />, { route: '/users/crud' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const userNameInput = screen.getByTestId(USER_CRUD_NAME_INPUT);
    const userEmailInput = screen.getByTestId(USER_CRUD_EMAIL_INPUT);
    const userPhoneNumberInput = screen
      .getByTestId(USER_CRUD_PHONE_NUMBER_INPUT);
    const userAddressInput = screen.getByTestId(USER_CRUD_ADDRESS_INPUT);
    const userCpfInput = screen.getByTestId(USER_CRUD_CPF_INPUT);
    const userCreateButton = screen.getByTestId(USER_CRUD_CREATE_BUTTON);

    expect(userCreateButton).toBeDisabled();

    act(() => {
      userEvent.type(userNameInput, newCrudUsers.name);
      userEvent.type(userEmailInput, newCrudUsers.email);
      userEvent.type(userPhoneNumberInput, newCrudUsers.phoneNumber);
      userEvent.type(userAddressInput, newCrudUsers.address);
      userEvent.type(userCpfInput, String(newCrudUsers.cpf));
    });

    expect(userCreateButton).not.toBeDisabled();
    userEvent.click(userCreateButton);
    expect(postAxios).toHaveBeenCalled();
  });

  it('se é possível editar um usuário', async () => {
    jest.spyOn(apiCrudUsers, 'get')
      .mockResolvedValueOnce({
        data: crudUsers,
      }).mockResolvedValueOnce({
        data: updatecrudUsers,
      });

    const putAxios = jest.spyOn(apiCrudUsers, 'put').mockResolvedValue({
      data: updateCrudUser,
    });

    renderWithRouter(<App />, { route: '/users/crud' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const usersModalButton = screen.getByTestId(OPEN_MODAL_BUTTON);
    userEvent.click(usersModalButton);

    const firstUserEditButton = screen
      .getByTestId(`${USER_CRUD_CARD_EDIT_BUTTON}${crudUsers[0]._id}`);
    userEvent.click(firstUserEditButton);

    const userNameInput = screen.getByTestId(USER_CRUD_NAME_INPUT);
    const userFormEditButton = screen.getByTestId(USER_CRUD_EDIT_BUTTON);

    userEvent.type(userNameInput, updateCrudUser.name);
    userEvent.click(userFormEditButton);
    expect(putAxios).toHaveBeenCalled();
  });

  it('se é possível deletar um usuário', async () => {
    jest.spyOn(apiCrudUsers, 'get')
      .mockResolvedValueOnce({
        data: crudUsers,
      }).mockResolvedValueOnce({
        data: [crudUsers[1], crudUsers[2]],
      });

    const deleteAxios = jest.spyOn(apiCrudUsers, 'delete').mockResolvedValue({
      data: {},
    });

    renderWithRouter(<App />, { route: '/users/crud' });

    await waitForElementToBeRemoved(() => screen.getByTestId(SPINNER_LOADING));

    const usersModalButton = screen.getByTestId(OPEN_MODAL_BUTTON);
    userEvent.click(usersModalButton);

    const firstUserDeleteButton = screen
      .getByTestId(`${USER_CRUD_CARD_DELETE_BUTTON}${crudUsers[0]._id}`);
    userEvent.click(firstUserDeleteButton);

    expect(deleteAxios).toHaveBeenCalled();
  });
});
