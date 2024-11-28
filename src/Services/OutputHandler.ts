import { IManager } from "../Managers/IManager";
import { IModel } from "../Models/Interfaces/IModel";
import IWriter from "./Writers/IWriter";

export class OutputHandler {
  constructor(
    private manager: IManager,
    private writer: IWriter // private writeFunction: (item: IModel) => void
  ) {
    this.handle = this.handle.bind(this);
  }
  async handle(): Promise<void> {
    this.writer.clear();
    const models: IModel[] = await this.manager.getAll();
    models.forEach((model: IModel): void => {
      this.writer.write(model);
    });
  }
  // async handleBySearch(title: string): Promise<void> {
  //   this.writer.clear();
  //   const models: IModel[] = await this.manager.getAll();
  //   models.filter((model: IModel): void => {
  //     if (model.getTitle().toLowerCase() == title.toLocaleLowerCase()) {
  //       this.writer.write(model);
  //     } else if (model.getTitle() === "") {
  //       this.writer.write(model);
  //     }
  //   });
  // }
}
