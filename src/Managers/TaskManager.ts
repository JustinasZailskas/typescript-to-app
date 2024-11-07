import { Task } from "../Models/Task";
import { BaseManager } from "./BaseManager";
import { User } from "../Models/User";
import { IManager } from "./IManager";
import { IModel } from "../Models/Interfaces/IModel";

export class TaskManager extends BaseManager implements IManager {
  remove(id: string): void {
    throw new Error(" remove Method not implemented.");
  }
  update(model: IModel): void {
    throw new Error("update Method not implemented.");
  }
  async getAll(): Promise<Task[]> {
    let tasks: Task[] = [];
    const response = await fetch("http://localhost:3000/todo");
    const modelsJson = await response.json();

    modelsJson.forEach((taskData: any): void => {
      const taskItem = new Task(taskData.title, taskData.description);
      taskItem.setID(taskData._id);
      tasks.push(taskItem);
    });

    return tasks;
  }
  getById(id: string): Promise<IModel | null> {
    throw new Error("getByID Method not implemented.");
  }
  async create(model: Task): Promise<void> {
    const user = new User("Justinas");
    user.setID("Justinas");
    model.setAuthor(user);
    await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });
  }
  async printAllTasks(): Promise<void> {
    const tasks = await fetch("http://localhost:3000/todo");
    const tasksJson = await tasks.json();

    tasksJson.forEach((taskData: any): void => {
      const taskItem = new Task(taskData.title, taskData.author);

      // this.add(taskItem);
    });
    // this.showAll();
  }

  // add(model: Task) {
  //   this.tasks.push(model);
  // }
  // remove(id: string) {
  //   const index = this.tasks.findIndex((task: Task) => task.getID() === id);
  //   if (index > -1) {
  //     this.tasks.splice(index, 1);
  //   }
  // }

  // update(model: Task) {
  //   const index = this.tasks.findIndex(
  //     (task: Task) => task.getID() === model.getID()
  //   );
  //   if (index > -1) {
  //     this.tasks[index] = model;
  //   }
  // }
  // complete(model: Task) {
  //   model.setStatus("completed");
  // }
  // clearList() {
  //   this.tasks = [];
  // }
  // showAll() {
  //   const tasksList = document.getElementById("tasksList") as HTMLUListElement;
  //   tasksList.innerHTML = "";
  //   this.tasks.forEach((task) => {
  //     const taskLiContainer = document.createElement("div");
  //     const taskLiElementContainer = document.createElement("div");
  //     const taskLiElement = document.createElement("li");
  //     const timeElement = document.createElement("p");
  //     const bttContainer = document.createElement("div");
  //     const deleteButton = document.createElement("button");
  //     const statusButton = document.createElement("button");

  //     taskLiElement.textContent = task.getTitle();
  //     timeElement.textContent = task.getDate().toString();
  //     deleteButton.textContent = "Delete";
  //     statusButton.textContent = task.getStatus();

  //     taskLiContainer.classList.add("task");
  //     taskLiElementContainer.classList.add("taskLiElemContainer");
  //     taskLiElement.classList.add();
  //     timeElement.classList.add("timeContainer");
  //     bttContainer.classList.add("buttonContainer");

  //     bttContainer.appendChild(deleteButton);
  //     taskLiElementContainer.appendChild(taskLiElement);
  //     taskLiElementContainer.appendChild(timeElement);
  //     taskLiContainer.appendChild(taskLiElementContainer);
  //     // taskLiElement.appendChild(timeElement);
  //     taskLiContainer.appendChild(bttContainer);

  //     if (tasksList !== null) {
  //       tasksList.appendChild(taskLiContainer);
  //     }
  //   });
  // }
}
