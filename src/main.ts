import "./css/sakura.css";
import "./css/style.css";
import { TaskController } from "./Controllers/TaskController";
import { UserController } from "./Controllers/UserController";

// Start with UserController (registration form)
if (!localStorage.getItem("token")) {
  new UserController();
}

// Initialize TaskController only after user is registered
document.addEventListener("userRegistered", () => {
  new TaskController();
});
document.addEventListener("userLoggedIn", () => {
  new TaskController();
});
if (localStorage.getItem("token")) {
  document.dispatchEvent(new Event("userLoggedIn"));
}
