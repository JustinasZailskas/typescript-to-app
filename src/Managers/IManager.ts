import { IModel } from "../Models/Interfaces/IModel";

export interface IManager {
  create(model: IModel): void;
  remove(id: string): void;
  update(model: IModel): void;
  getAll(): Promise<IModel[]>;
  getById(id: string): Promise<IModel | null>;
}
