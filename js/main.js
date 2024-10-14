"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_js_1 = require("./Models/Task.js");
const User_js_1 = require("./Models/User.js");
const TaskManager_js_1 = require("./Managers/TaskManager.js");
// const taskItem = new Task("Task1", "created");
const taskManager = new TaskManager_js_1.TaskManager();
function createTask() {
    //paimam task title is laukelio ir priskiriam kintamajam
    //su tais duomenimis turesime sukurti nauja taskItem'a
    //taskItem'as prideti i taskManager
    const taskElement = document.getElementById("newTaskInput");
    const taskTitle = taskElement.value;
    const kamPriklauso = new User_js_1.User("Justinas");
    const taskItem = new Task_js_1.Task(taskTitle, kamPriklauso.getID());
    taskManager.add(taskItem);
    taskManager.showAll();
}
const createButton = document.getElementById("addButton");
createButton.addEventListener("click", createTask);
