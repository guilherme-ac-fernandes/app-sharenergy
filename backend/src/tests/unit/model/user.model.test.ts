import { expect } from 'chai';
import sinon from 'sinon';
import { ErrorTypes } from '../../../errors/catalog';
import UserModel from '../../../models/UserModel';
import { Model } from 'mongoose';
import {
  userMock,
  userMockWithId,
  userMockForUpdate,
  userMockUpdated,
} from '../../mocks/userMock';

describe('User Model', () => {
  const userModel = new UserModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(userMockWithId);
    sinon.stub(Model, 'findOne').resolves(userMockWithId);
    sinon.stub(Model, 'find').resolves([userMockWithId]);
    sinon.stub(Model, 'findByIdAndDelete').resolves(userMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(userMockUpdated);
  });

  after(() => sinon.restore());

  describe('creating a new user', () => {
    it('successfully created', async () => {
      const newUser = await userModel.create(userMock);
      expect(newUser).to.be.deep.equal(userMockWithId);
    });
  });

  describe('searching a user', () => {
    it('successfully found', async () => {
      const userFound = await userModel.readOne(userMockWithId._id);
      expect(userFound).to.be.deep.equal(userMockWithId);
    });

    it('_id not found', async () => {
      try {
        await userModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('searching all users', () => {
    it('successfully found', async () => {
      const usersFound = await userModel.read();
      expect(usersFound).to.be.deep.equal([userMockWithId]);
    });
  });

  describe('deleteting a user', () => {
    it('successfully delete', async () => {
      const userDelete = await userModel.delete(userMockWithId._id);
      expect(userDelete).to.be.deep.equal(userMockWithId);
    });

    it('_id not found', async () => {
      try {
        await userModel.delete('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });

  describe('updating a user', () => {
    it('successfully update', async () => {
      const userUpdate = await userModel.update(
        userMockWithId._id,
        userMockForUpdate
      );
      expect(userUpdate).to.be.deep.equal(userMockUpdated);
    });

    it('_id not found', async () => {
      try {
        await userModel.update('123ERRADO', userMock);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  });
});
