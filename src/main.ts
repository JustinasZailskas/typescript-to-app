import "./css/sakura.css";
import "./css/style.css";
import { TaskController } from "./Controllers/TaskController";
import { UserController } from "./Controllers/UserController";

// Start with UserController (registration form)
new UserController();

// Initialize TaskController only after user is registered
document.addEventListener("userRegistered", () => {
  new TaskController();
});
document.addEventListener("userLoggedIn", () => {
  new TaskController();
});
