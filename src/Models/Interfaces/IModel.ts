export interface IModel {
  getID(): string;
  getDate(): Date;
  setDate(createdAt: number): void;
}
