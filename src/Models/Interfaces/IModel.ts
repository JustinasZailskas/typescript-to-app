export interface IModel {
  getID(): string;
  getTitle(): string;
  getStatus(): string;
  getDate(): Date;
  setTitle(title: string): void;
  setStatus(status: string): void;
  setDate(createdAt: Date): void;
}
