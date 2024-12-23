import { User } from "../Models/User";
import {
  AuthError,
  ServerError,
  UndefinedError,
} from "../Services/ErrorHandler";

export class UserManager {
  async login(email: string, password: string): Promise<boolean> {
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
      if (response.status === 401) {
        throw new AuthError("Invalid credentials");
      }
      if (response.status >= 500) {
        throw new ServerError();
      }
      throw new UndefinedError();
    }

    const responseData = await response.json();
    console.log(responseData);
    // Store token in localStorage
    localStorage.setItem("token", responseData.token);
    return true;
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
}
