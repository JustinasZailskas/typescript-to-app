import { IManager } from "./IManager";
import { Task } from "../Models/Task";

export class BaseManager implements IManager {
  private tasks: Task[] = [];
  add(model: Task) {
    this.tasks.push(model);
  }
  remove(id: string) {
    const index = this.tasks.findIndex((task: Task) => task.getID() === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  update(model: Task) {
    const index = this.tasks.findIndex(
      (task: Task) => task.getID() === model.getID()
    );
    if (index > -1) {
      this.tasks[index] = model;
    }
  }
  complete(model: Task) {
    model.setStatus("completed");
  }

  showAll() {
    const tasksList = document.getElementById("tasksList") as HTMLUListElement;
    tasksList.innerHTML = "";
    this.tasks.forEach((task) => {
      console.log(task);
      const taskLiContainer = document.createElement("div");
      const taskLiElementContainer = document.createElement("div");
      const taskLiElement = document.createElement("li");
      const timeElement = document.createElement("p");
      const bttContainer = document.createElement("div");
      const deleteButton = document.createElement("button");
      const statusButton = document.createElement("button");

      taskLiElement.textContent = task.getTitle();
      timeElement.textContent = task.getDate().toString();
      deleteButton.textContent = "Delete";
      statusButton.textContent = task.getStatus();

      taskLiContainer.classList.add("task");
      taskLiElementContainer.classList.add("taskLiElemContainer");
      taskLiElement.classList.add();
      timeElement.classList.add("timeContainer");
      bttContainer.classList.add("buttonContainer");

      bttContainer.appendChild(deleteButton);
      taskLiElementContainer.appendChild(taskLiElement);
      taskLiElementContainer.appendChild(timeElement);
      taskLiContainer.appendChild(taskLiElementContainer);
      // taskLiElement.appendChild(timeElement);
      taskLiContainer.appendChild(bttContainer);

      if (tasksList !== null) {
        tasksList.appendChild(taskLiContainer);
      }
    });
  }
}
