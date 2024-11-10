import IWriter from "./IWriter";
import { Task } from "../../Models/Task";
import { IModel } from "../../Models/Interfaces/IModel";
import { IManager } from "../../Managers/IManager";

export default class HtmlWriter implements IWriter {
  constructor(private manager: IManager) {}

  async write(item: IModel): Promise<void> {
    const tasksList = document.getElementById("tasksList") as HTMLUListElement;
    const taskLiContainer = document.createElement("div");
    const taskLiElementContainer = document.createElement("div");
    const taskLiElement = document.createElement("li");
    const timeElement = document.createElement("p");
    const bttContainer = document.createElement("div");
    const deleteButton = document.createElement("button");
    const statusButton = document.createElement("button");

    taskLiElement.textContent = item.getTitle();
    console.log(item);

    const timestamp = item.getDate();

    const dateFromTimestamp = new Date(timestamp);
    timeElement.textContent = `${dateFromTimestamp}`;
    deleteButton.textContent = "Delete"; //data arba id kaip kuriamas
    deleteButton.setAttribute("element-id", item.getID());

    statusButton.textContent = item.getStatus();

    taskLiContainer.classList.add("task");
    taskLiElementContainer.classList.add("taskLiElemContainer");
    taskLiElement.classList.add();
    timeElement.classList.add("timeContainer");
    bttContainer.classList.add("buttonContainer");

    bttContainer.appendChild(statusButton);
    bttContainer.appendChild(deleteButton);
    taskLiElementContainer.appendChild(taskLiElement);
    taskLiElementContainer.appendChild(timeElement);
    taskLiContainer.appendChild(taskLiElementContainer);
    // taskLiElement.appendChild(timeElement);
    taskLiContainer.appendChild(bttContainer);
    tasksList.appendChild(taskLiContainer);
  }
  clear(): void {
    const taskListElement = document.getElementById(
      "tasksList"
    ) as HTMLUListElement;
    taskListElement.innerHTML = "";
  }
}
