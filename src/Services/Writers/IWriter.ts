import { IModel } from "../../Models/Interfaces/IModel";

export default interface IWriter {
  write(item: IModel): void;
  clear(): void;
}
