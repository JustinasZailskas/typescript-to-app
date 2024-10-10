"use strict";
class Task {
    constructor(id, title, status) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.createdAt = Date.now();
    }
    getID() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getStatus() {
        return this.status;
    }
    getDate() {
        return this.createdAt;
    }
    setID(id) {
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setStatus(status) {
        this.status = status;
    }
    setDate(createdAt) {
        this.createdAt = createdAt;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    add(model) {
        this.tasks.push(model);
    }
    remove(id) {
        const index = this.tasks.findIndex((task) => task.getID() === id);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }
    update(model) {
        const index = this.tasks.findIndex((task) => task.getID() === model.getID());
        if (index > -1) {
            this.tasks[index] = model;
        }
    }
    complete(model) {
        model.setStatus("completed");
    }
    showAll() {
        const tasksList = document.getElementById("tasksList");
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
const taskItem = new Task(0, "Task1", "created");
const taskManager = new TaskManager();
function createTask() {
    //paimam task title is laukelio ir priskiriam kintamajam
    //su tais duomenimis turesime sukurti nauja taskItem'a
    //taskItem'as prideti i taskManager
    const taskElement = document.getElementById("newTaskInput");
    const taskTitle = taskElement.value;
    const taskItem = new Task(1, taskTitle, "created");
    taskManager.add(taskItem);
    taskManager.showAll();
}
const createButton = document.getElementById("addButton");
createButton.addEventListener("click", createTask);
