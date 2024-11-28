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
  private searchByTitleValue: string;

  constructor() {
    this.taskManager = new TaskManager();
    const htmlWriter = new HtmlWriter(this.taskManager);
    this.outputHandler = new OutputHandler(this.taskManager, htmlWriter);
    this.view = new TaskView(htmlWriter);
    this.searchByTitleValue = "";
    this.initialize();
  }

  private initialize(): void {
    this.checkServerStatus();

    document.addEventListener("DOMContentLoaded", () => {
      try {
        this.outputHandler.handle();
      } catch (error) {
        this.view.showError("Nepavyko įkelti užduočių");
      }
    });
    const createButton = document.getElementById(
      "addButton"
    ) as HTMLButtonElement;

    createButton.addEventListener("click", () => this.createTask());

    const tasksList = document.getElementById("tasksList") as HTMLUListElement;
    tasksList.addEventListener("click", (event) => this.deleteTask(event));

    const filterInput = document.getElementById(
      "filterByTitle"
    ) as HTMLInputElement;
    filterInput.addEventListener("input", (event) => {
      this.searchByTitleValue = (event.target as HTMLInputElement).value;
    });

    const searchByTitleButton = document.getElementById(
      "searchButton"
    ) as HTMLButtonElement;

    // searchByTitleButton.addEventListener("click", () => this.searchByTitle());
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
      const user = "justinas";

      if (!taskTitle.trim()) {
        this.view.showError("Įveskite užduotį");
        return;
      }

      const taskItem = new Task(taskTitle);
      this.taskManager.create(taskItem).then(() => this.outputHandler.handle());
      taskElement.value = "";
    } catch (error) {
      this.view.showError("Nepavyko sukurti užduoties");
    }
  }
  private async deleteTask(event: Event): Promise<void> {
    const target = event.target as HTMLElement;
    const elementId = target.getAttribute("element-id");
    if (elementId) {
      try {
        this.taskManager
          .remove(elementId)
          .then(() => this.outputHandler.handle());
      } catch (error) {
        this.view.showError("Nepavyko ištrinti užduoties");
      }
    }
  }
  // private async searchByTitle(): Promise<void> {
  //   try {
  //     if (!this.searchByTitleValue.trim()) {
  //       this.view.showError("Įveskite užduoties pavadinimą");
  //       return;
  //     }
  //     this.outputHandler.handleBySearch(this.searchByTitleValue);
  //     const filterInput = document.getElementById(
  //       "filterByTitle"
  //     ) as HTMLInputElement;
  //     filterInput.value = "";
  //   } catch (error) {
  //     this.view.showError("Nepavyko rasti užduočių");
  //   }
  // }
}
