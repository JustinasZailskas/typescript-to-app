import { Task } from "./Models/Task";
import { User } from "./Models/User";
import { TaskManager } from "./Managers/TaskManager";
import "./css/sakura.css";
import "./css/style.css";

// const taskItem = new Task("Task1", "created");
addEventListener("DOMContentLoaded", printAllTasks);
const taskManager = new TaskManager();
const kamPriklauso = new User("Justinas");

function createTask(): void {
  //paimam task title is laukelio ir priskiriam kintamajam
  //su tais duomenimis turesime sukurti nauja taskItem'a
  //taskItem'as prideti i taskManager
  const taskElement = document.getElementById(
    "newTaskInput"
  ) as HTMLInputElement;
  const taskTitle = taskElement.value;
  const taskItem = new Task(taskTitle, kamPriklauso.getID());

  taskManager.add(taskItem);
  taskManager.showAll();
}

async function printAllTasks(): Promise<void> {
  const tasks = await fetch("./tasks.json");
  const tasksJson = await tasks.json();

  tasksJson.forEach((taskData: any): void => {
    const taskItem = new Task(taskData.title, kamPriklauso.getID());
    taskManager.add(taskItem);
  });
  taskManager.showAll();
}

const createButton = document.getElementById("addButton") as HTMLButtonElement;
createButton.addEventListener("click", createTask);
