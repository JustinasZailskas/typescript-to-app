import { User } from "../Models/User";

export class UserManager {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userData = await response.json();
      const user = new User(userData.username, userData.email, password);
      user.setId(userData._id);

      // Store user ID in localStorage
      localStorage.setItem("currentUserId", user.getID());

      return user;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  }

  async register(model: User): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const userData = await response.json();
      model.setId(userData._id);
      return model;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem("currentUserId");
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem("currentUserId");
  }

  // IManager interface implementation
}
