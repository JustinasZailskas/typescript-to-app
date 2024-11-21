import { Task } from "../Models/Task";
import { BaseManager } from "./BaseManager";
import { User } from "../Models/User";
import { IManager } from "./IManager";
import { IModel } from "../Models/Interfaces/IModel";

export class TaskManager extends BaseManager implements IManager {
  async remove(id: string): Promise<void> {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  update(model: IModel): void {
    throw new Error("update Method not implemented.");
  }
  async getAll(): Promise<Task[]> {
    let tasks: Task[] = [];
    const response = await fetch("http://localhost:3000/todo");
    const modelsJson = await response.json();

    modelsJson.forEach((taskData: any): void => {
      const taskItem = new Task(taskData.title, taskData.status);
      taskItem.setID(taskData._id);
      taskItem.setDate(taskData.createdAt);
      taskItem.setStatus(taskData.status);
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
}
