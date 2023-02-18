import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import MongoModel from './MongoModel';

const userMongooseSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    phoneNumber: String,
    address: String,
    cpf: Number,
  },
  { versionKey: false },
);

export default class UserModel extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }
}
