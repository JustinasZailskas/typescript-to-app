import { IModel } from "./Interfaces/IModel";

export class BaseModel implements IModel {
  private _id: string = "";
  private status: string;
  private createdAt: number;
  constructor(private title: string) {
    this.status = "Created";
    this.createdAt = Date.now();
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
  getDate(): number {
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
    this.createdAt = createdAt;
  }
}
