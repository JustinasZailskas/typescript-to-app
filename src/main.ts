interface IModel {
  getTitle(): string;
  getStatus(): string;
  getDate(): number;
}

interface IManager {
  add(model: IModel): void;
  remove(id: number): void;
  update(model: IModel): void;
}
class Task implements IModel {
  private createdAt: number;
  constructor(
    private id: number,
    private title: string,
    private status: string
  ) {
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
  setID(id: number) {
    this.id = id;
  }
  setTitle(title: string) {
    this.title = title;
  }
  setStatus(status: string) {
    this.status = status;
  }
  setDate(createdAt: number) {
    this.createdAt = createdAt;
  }

  //   completeTask() {
  //     this.status = "completed";
  //   }
}

class TaskManager implements IManager {
  private tasks: Task[] = [];
  add(model: Task) {
    this.tasks.push(model);
  }
  remove(id: number) {
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

const taskItem = new Task(0, "Task1", "created");

const taskManager = new TaskManager();

function createTask(): void {
  //paimam task title is laukelio ir priskiriam kintamajam
  //su tais duomenimis turesime sukurti nauja taskItem'a
  //taskItem'as prideti i taskManager
  const taskElement = document.getElementById(
    "newTaskInput"
  ) as HTMLInputElement;
  const taskTitle = taskElement.value;
  const taskItem = new Task(1, taskTitle, "created");
  taskManager.add(taskItem);
  taskManager.showAll();
}

const createButton = document.getElementById("addButton") as HTMLButtonElement;
createButton.addEventListener("click", createTask);
