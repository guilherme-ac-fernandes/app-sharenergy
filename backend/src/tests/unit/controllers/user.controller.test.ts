import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import UserModel from '../../../models/UserModel';
import UserService from '../../../services/UserService';
import UserController from '../../../controllers/UserController';
import {
  userMock,
  userMockWithId,
  userMockForUpdate,
  userMockUpdated,
} from '../../mocks/userMock';

describe('User Controller', () => {
  const userModel = new UserModel();
  const userService = new UserService(userModel);
  const userController = new UserController(userService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(userService, 'create').resolves(userMockWithId);
    sinon.stub(userService, 'readOne').resolves(userMockWithId);
    sinon.stub(userService, 'read').resolves([userMockWithId]);
    sinon.stub(userService, 'delete').resolves(userMockWithId);
    sinon.stub(userService, 'update').resolves(userMockUpdated);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => sinon.restore());

  describe('Create User', () => {
    it('Success', async () => {
      req.body = userMock;
      await userController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMockWithId)).to.be
        .true;
    });
  });

  describe('ReadOne User', () => {
    it('Success', async () => {
      req.params = { id: userMockWithId._id };
      await userController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMockWithId)).to.be
        .true;
    });
  });

  describe('Read Users', () => {
    it('Success', async () => {
      await userController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([userMockWithId])).to.be
        .true;
    });
  });

  describe('Delete User', () => {
    it('Success', async () => {
      req.params = { id: userMockWithId._id };
      await userController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(userMockWithId)).to.be
        .true;
    });
  });

  describe('Update User', () => {
    it('Success', async () => {
      req.params = { id: userMockWithId._id };
      req.body = { ...userMockForUpdate };
      await userController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;     
      expect((res.json as sinon.SinonStub).calledWith(userMockUpdated)).to.be
        .true;
    });
  });
});
