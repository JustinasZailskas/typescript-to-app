import { User } from "../Models/User";

export class UserManager {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const token = await response.json();

      // Store token in localStorage
      localStorage.setItem("token", token.token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  async register(model: User): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:3000/register", {
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
