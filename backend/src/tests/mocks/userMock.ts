import { IUser } from '../../interfaces/IUser';

const userMock: IUser = {
  name: 'Guilherme',
  email: 'guilherme@email.com',
  phoneNumber: '31 98765-4321',
  address: 'Rua Dois, 4, Bairro Eldorado',
  cpf: 11111111111,
};

const userMockWithId: IUser & { _id: string } = {
  _id: '63be4e15131e3da72e8abd30',
  name: 'Guilherme',
  email: 'guilherme@email.com',
  phoneNumber: '31 98765-4321',
  address: 'Rua Dois, 4, Bairro Eldorado',
  cpf: 11111111111,
};

const userMockForUpdate: IUser = {
  name: 'Guilherme Fernandes',
  email: 'guilherme@email.com',
  phoneNumber: '31 98765-4321',
  address: 'Rua Dois, 4, Bairro Eldorado',
  cpf: 11111131111,
};

const userMockWrongInfo: unknown = {
  name: 'Al',
  email: 'errado',
};

const userMockUpdated: IUser & { _id: string } = {
  _id: '63be4e15131e3da72e8abd30',
  name: 'Guilherme Fernandes',
  email: 'guilherme@email.com',
  phoneNumber: '31 98765-4321',
  address: 'Rua Dois, 4, Bairro Eldorado',
  cpf: 11111131111,
};

export {
  userMock,
  userMockWithId,
  userMockForUpdate,
  userMockWrongInfo,
  userMockUpdated,
};
