import { apiCrudUsers } from '.';
import { ICrudUser } from '../interfaces/ICrudUser';

export const createCrudUser = async ({
  name, email, phoneNumber, address, cpf,
}: ICrudUser) => {
  const data = await apiCrudUsers
    .post('/', {
      name, email, phoneNumber, address, cpf: Number(cpf),
    })
    .then((response) => response.data);
  return data;
};

export const getCrudUsers = async () => {
  const data = await apiCrudUsers
    .get('/')
    .then((response) => response.data);
  return data;
};

export const updateCrudUser = async ({
  _id, name, email, phoneNumber, address, cpf,
}: ICrudUser) => {
  const data = await apiCrudUsers
    .put(`/${_id}`, {
      name, email, phoneNumber, address, cpf: Number(cpf),
    })
    .then((response) => response.data);
  return data;
};

export const deleteCrudUser = async (_id: string) => {
  const data = await apiCrudUsers
    .delete(`/${_id}`)
    .then((response) => response.data);
  return data;
};
