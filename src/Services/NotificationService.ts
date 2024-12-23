export class NotificationService {
  private static instance: NotificationService;
  private container: HTMLDivElement;

  private constructor() {
    this.container = document.createElement("div");
    this.container.id = "notification-container";
    document.body.appendChild(this.container);
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public show(
    message: string,
    type: "success" | "error" | "warning" | "info"
  ): void {
    console.log("veikia");
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    this.container.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  public success(message: string): void {
    this.show(message, "success");
  }

  public error(message: string): void {
    this.show(message, "error");
  }

  public info(message: string): void {
    this.show(message, "info");
  }

  public warning(message: string): void {
    this.show(message, "warning");
  }
}
