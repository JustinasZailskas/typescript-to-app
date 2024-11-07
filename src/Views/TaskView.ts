import { IModel } from "../Models/Interfaces/IModel";
import IWriter from "../Services/Writers/IWriter";

export class TaskView {
  private writer: IWriter;
  constructor(writer: IWriter) {
    this.writer = writer;
  }

  renderTasks(models: IModel[]): void {
    this.writer.clear();
    models.forEach((model: IModel) => {
      this.writer.write(model);
    });
  }
  showError(message: string): void {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = `Klaida: ${message}`;
    document.body.prepend(errorElement);
  }
}
