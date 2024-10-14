import { BaseModel } from "./BaseModel";

export class Task extends BaseModel {
  private userId: string;
  constructor(title: string, userId: string) {
    super(title);
    this.userId = userId;
  }
}
