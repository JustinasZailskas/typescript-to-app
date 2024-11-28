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
    try {
      let tasks: Task[] = [];
      const response = await fetch("http://localhost:3000/todo");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const modelsJson = await response.json();

      if (!modelsJson) {
        console.log("No tasks");
        return [];
      }

      modelsJson.forEach((taskData: any): void => {
        const taskItem = new Task(taskData.title);
        taskItem.setID(taskData._id);
        taskItem.setDate(taskData.createdAt);
        taskItem.setStatus(taskData.status);
        tasks.push(taskItem);
      });

      return tasks;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw new Error("Authentication failed or server error occurred");
    }
  }
  getById(id: string): Promise<IModel | null> {
    throw new Error("getByID Method not implemented.");
  }
  async create(model: Task): Promise<void> {
    // const user = new User();
    // user.setId("Justinas");
    // model.setUserId(user.getID());
    // await fetch("http://localhost:3000/todo", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(model),
    // });
  }
}
