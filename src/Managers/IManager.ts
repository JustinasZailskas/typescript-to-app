import { IModel } from "../Models/IModel";

export interface IManager {
  add(model: IModel): void;
  remove(id: string): void;
  update(model: IModel): void;
}
