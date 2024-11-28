import { IModel } from "./Interfaces/IModel";

export class Task implements IModel {
  private userId: string = "";
  private _id: string = "";
  private status: string;
  private createdAt: Date;
  constructor(private title: string) {
    this.status = "Created";
    this.createdAt = new Date();
  }
  getID(): string {
    return this._id;
  }
  getTitle(): string {
    return this.title;
  }
  getStatus(): string {
    return this.status;
  }
  getDate(): Date {
    return this.createdAt;
  }
  setID(id: string): void {
    this._id = id;
  }
  setTitle(title: string): void {
    this.title = title;
  }
  setStatus(status: string): void {
    this.status = status;
  }
  setDate(createdAt: number): void {
    this.createdAt = new Date(createdAt);
  }

  setUserId(user: string): void {
    this.userId = user;
  }
  getUserId(): string {
    return this.userId;
  }
}
