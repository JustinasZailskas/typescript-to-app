import { Task } from "./Models/Task";
import { User } from "./Models/User";
import { TaskManager } from "./Managers/TaskManager";
import { OutputHandler } from "./Services/OutputHandler";
import HtmlWriter from "./Services/Writers/HtmlWriter";
import "./css/sakura.css";
import "./css/style.css";
import { IModel } from "./Models/Interfaces/IModel";

// const taskItem = new Task("Task1", "created");
const taskManager = new TaskManager();
const htmlWriter = new HtmlWriter(taskManager);

const taskPrinter: OutputHandler = new OutputHandler(taskManager, htmlWriter);

function createTask(): void {
  //paimam task title is laukelio ir priskiriam kintamajam
  //su tais duomenimis turesime sukurti nauja taskItem'a
  //taskItem'as prideti i taskManager
  const kamPriklauso = new User("Justinas");
  const taskElement = document.getElementById(
    "newTaskInput"
  ) as HTMLInputElement;
  const taskTitle = taskElement.value;
  const taskItem = new Task(taskTitle, kamPriklauso.getID());

  taskManager.create(taskItem).then(() => taskPrinter.handle());
  // taskPrinter.handle();
}

const createButton = document.getElementById("addButton") as HTMLButtonElement;
createButton.addEventListener("click", createTask);
addEventListener("DOMContentLoaded", taskPrinter.handle);
