import { IModel } from "./Interfaces/IModel";

export class BaseModel implements IModel {
  private _id: string = "";
  private status: string;
  private createdAt: Date;
  constructor(private title: string) {
    this.status = "created";
    this.createdAt = new Date("1970-01-01T00:00:00.000Z");
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
  setDate(createdAt: Date): void {
    this.createdAt = createdAt;
  }
}
