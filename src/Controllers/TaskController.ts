import { TaskManager } from "../Managers/TaskManager";
import HtmlWriter from "../Services/Writers/HtmlWriter";
import { OutputHandler } from "../Services/OutputHandler";
import { TaskView } from "../Views/TaskView";
import { Task } from "../Models/Task";
import { User } from "../Models/User";

export class TaskController {
  private taskManager: TaskManager;
  private outputHandler: OutputHandler;
  private view: TaskView;

  constructor() {
    this.taskManager = new TaskManager();
    const htmlWriter = new HtmlWriter(this.taskManager);
    this.outputHandler = new OutputHandler(this.taskManager, htmlWriter);
    this.view = new TaskView(htmlWriter);

    this.initialize();
  }

  private initialize(): void {
    this.checkServerStatus();

    document.addEventListener("DOMContentLoaded", () => {
      try {
        this.outputHandler.handle();
      } catch (error) {
        this.view.showError("Nepavyko ikelti uzduociu");
      }
    });
    const createButton = document.getElementById(
      "addButton"
    ) as HTMLButtonElement;
    createButton.addEventListener("click", () => this.createTask());
  }
  private async checkServerStatus(): Promise<void> {
    try {
      const response = await fetch("http://localhost:3000/todo");
      if (!response.ok) {
        throw new Error("Serveris neveikia");
      }
    } catch (error) {
      this.view.showError("Nepavyko prisijungti prie serverio");
      throw new Error("Serveris nepaleistas");
    }
  }

  private async createTask(): Promise<void> {
    try {
      const taskElement = document.getElementById(
        "newTaskInput"
      ) as HTMLInputElement;
      const taskTitle: string = taskElement.value;
      const user = new User("Justinas");

      if (!taskTitle.trim()) {
        this.view.showError("Iveskite uzduoti");
        return;
      }

      const taskItem = new Task(taskTitle, user.getID());
      this.taskManager.create(taskItem).then(() => this.outputHandler.handle());
      taskElement.value = "";
    } catch (error) {
      this.view.showError("Nepavyko sukurti uzduoties");
    }
  }
}
