export interface IModel {
  getID(): string;
  getTitle(): string;
  getStatus(): string;
  getDate(): number;
  setTitle(title: string): void;
  setStatus(status: string): void;
  setDate(createdAt: number): void;
}
