import { User } from "../User";

export default interface HasAuthor {
  setAuthor(user: User): void;
  getAuthor(): User;
}
