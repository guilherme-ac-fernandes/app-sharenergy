import { Request, Response } from 'express';
import { ErrorTypes } from '../errors/catalog';
import { IService } from '../interfaces/IService';
import { IUser } from '../interfaces/IUser';

export default class UserController {
  constructor(private _service: IService<IUser>) {}

  public async create(req: Request, res: Response<IUser>) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(_req: Request, res: Response<IUser[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<IUser>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IUser>) {
    const { cpf }: IUser = req.body;

    if (String(cpf).length !== 11) {
      throw new Error(ErrorTypes.CpfInvalidLength);
    }
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IUser>) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}
