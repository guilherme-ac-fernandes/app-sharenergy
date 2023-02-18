import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import UserModel from '../../../models/UserModel';
import UserService from '../../../services/UserService';
import {
  userMock,
  userMockWithId,
  userMockForUpdate,
  userMockWrongInfo,
  userMockUpdated,
} from '../../mocks/userMock';

describe('User Service', () => {
  const userModel = new UserModel();
  const userService = new UserService(userModel);

  before(() => {
    sinon.stub(userModel, 'create').resolves(userMockWithId);
    sinon
      .stub(userModel, 'readOne')
      .onCall(0)
      .resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
    sinon.stub(userModel, 'read').resolves([userMockWithId]);
    sinon
      .stub(userModel, 'delete')
      .onCall(0)
      .resolves(userMockWithId)
      .onCall(1)
      .resolves(null);
    sinon
      .stub(userModel, 'update')
      .onCall(0)
      .resolves(userMockUpdated)
      .onCall(1)
      .resolves(null)
      .onCall(2)
      .resolves(null);
  });

  after(() => sinon.restore());

  describe('Create User', () => {
    it('Success', async () => {
      const userCreated = await userService.create(userMock);
      expect(userCreated).to.be.deep.equal(userMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await userService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('ReadOne User', () => {
    it('Success', async () => {
      const userCreated = await userService.readOne(userMockWithId._id);
      expect(userCreated).to.be.deep.equal(userMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await userService.readOne(userMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Read Users', () => {
    it('Success', async () => {
      const usersArray = await userService.read();
      expect(usersArray).to.be.deep.equal([userMockWithId]);
    });
  });

  describe('Delete User', () => {
    it('Success', async () => {
      const userDelete = await userService.delete(userMockWithId._id);
      expect(userDelete).to.be.deep.equal(userMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await userService.delete(userMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('Update User', () => {
    it('Success', async () => {
      const user = await userService.update(
        userMockWithId._id,
        userMockForUpdate
      );
      expect(user).to.be.deep.equal(userMockUpdated);
    });

    it('Failure: id invalid', async () => {
      let error;
      try {
        await userService.update('123ERRADO', userMockForUpdate);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });

    it('Failure: user invalid', async () => {
      let error;
      try {
        await userService.update(userMockWithId._id, userMockWrongInfo);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });
});