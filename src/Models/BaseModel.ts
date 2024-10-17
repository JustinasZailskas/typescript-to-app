import { IModel } from "./IModel";

export class BaseModel implements IModel {
  private id: string;
  private status: string;
  private createdAt: number;
  constructor(private title: string) {
    this.id = crypto.randomUUID();
    this.status = "created";
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
  setID(id: string) {
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
