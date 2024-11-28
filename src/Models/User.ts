import { IModel } from "./Interfaces/IModel";

export class User implements IModel {
  private _id: string = "";
  private role: string;
  private createdAt: Date;
  constructor(
    private username: string,
    private email: string,
    private password: string
  ) {
    this.role = "user";
    this.createdAt = new Date();
  }
  getID(): string {
    return this._id;
  }
  getUsername(): string {
    return this.username;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getRole(): string {
    return this.role;
  }
  getDate(): Date {
    return this.createdAt;
  }
  setId(userId: string): void {
    this._id = userId;
  }
  setUsername(username: string): void {
    this.username = username;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setPassword(password: string): void {
    this.password = password;
  }
  setRole(role: string): void {
    this.role = role;
  }
  setDate(createdAt: number): void {
    this.createdAt = new Date(createdAt);
  }
}
