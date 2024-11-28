import { UserManager } from "../Managers/UserManager";
import { RegisterView } from "../Views/RegisterView";
import { LoginView } from "../Views/LoginView";
import { User } from "../Models/User";

export class UserController {
  private userManager: UserManager;
  private registerView: RegisterView;
  private loginView: LoginView;
  private mainContainer: HTMLElement | null;

  constructor() {
    this.userManager = new UserManager();
    this.registerView = new RegisterView();
    this.loginView = new LoginView();
    this.mainContainer = document.getElementById("app");
    this.initialize();
  }

  private initialize(): void {
    if (!this.mainContainer) {
      console.error("Main container not found");
      return;
    }

    // Pradžioje rodome login formą
    this.showLoginForm();

    // Login formos submit handler
    this.loginView.onSubmit(async (data) => {
      try {
        const success = await this.userManager.login(data.email, data.password);
        if (success) {
          console.log("Login successful");
          this.mainContainer!.innerHTML = "";
          document.dispatchEvent(new Event("userLoggedIn"));
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    });

    // Register formos submit handler
    this.registerView.onSubmit(async (data) => {
      try {
        const user = new User(data.username, data.email, data.password);
        const registeredUser = await this.userManager.register(user);
        if (registeredUser) {
          console.log("Registration successful");
          this.showLoginForm(); // Po sėkmingos registracijos grįžtame į login
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    });

    // Pridedame formos perjungimo handler'ius
    this.loginView.onSwitchToRegister(() => {
      this.showRegisterForm();
    });

    this.registerView.onSwitchToLogin(() => {
      this.showLoginForm();
    });
  }

  private showLoginForm(): void {
    if (!this.mainContainer) return;
    this.mainContainer.innerHTML = "";
    this.loginView.render(this.mainContainer);
  }

  private showRegisterForm(): void {
    if (!this.mainContainer) return;
    this.mainContainer.innerHTML = "";
    this.registerView.render(this.mainContainer);
  }
}
