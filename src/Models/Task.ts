import { BaseModel } from "./BaseModel";
import { User } from "./User";

export class Task extends BaseModel {
  private author: string;
  constructor(title: string, userId: string) {
    super(title);
    this.author = userId;
  }

  setAuthor(user: User): void {
    this.author = user.getID();
  }
  getAuthor(): User {
    return new User(this.author);
  }
}
