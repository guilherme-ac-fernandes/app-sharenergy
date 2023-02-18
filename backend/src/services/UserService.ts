import { IService } from '../interfaces/IService';
import { UserZodSchema, IUser } from '../interfaces/IUser';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

export default class UserService implements IService<IUser> {
  private _user: IModel<IUser>;

  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async create(obj: unknown): Promise<IUser> {
    const parsed = UserZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._user.create(parsed.data);
  }

  public async read(): Promise<IUser[]> {
    const users = await this._user.read();
    return users;
  }

  public async readOne(_id: string): Promise<IUser> {
    const user = await this._user.readOne(_id);
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }

  public async update(_id: string, obj: unknown): Promise<IUser> {
    const parsed = UserZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const userUpdate = await this._user.update(_id, parsed.data);
    if (!userUpdate) throw new Error(ErrorTypes.EntityNotFound);
    return userUpdate;
  }

  public async delete(_id: string): Promise<IUser> {
    const user = await this._user.delete(_id);
    if (!user) throw new Error(ErrorTypes.EntityNotFound);
    return user;
  }
}
