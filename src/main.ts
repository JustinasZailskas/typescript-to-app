import { Task } from "./Models/Task.js";
import { User } from "./Models/User.js";
import { TaskManager } from "./Managers/TaskManager.js";

// const taskItem = new Task("Task1", "created");

const taskManager = new TaskManager();

function createTask(): void {
  //paimam task title is laukelio ir priskiriam kintamajam
  //su tais duomenimis turesime sukurti nauja taskItem'a
  //taskItem'as prideti i taskManager
  const taskElement = document.getElementById(
    "newTaskInput"
  ) as HTMLInputElement;
  const taskTitle = taskElement.value;
  const kamPriklauso = new User("Justinas");
  const taskItem = new Task(taskTitle, kamPriklauso.getID());

  taskManager.add(taskItem);
  taskManager.showAll();
}

const createButton = document.getElementById("addButton") as HTMLButtonElement;
createButton.addEventListener("click", createTask);
