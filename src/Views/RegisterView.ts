export class RegisterView {
  private formElement: HTMLFormElement;

  constructor() {
    this.formElement = document.createElement("form");
    this.initializeForm();
  }

  private initializeForm() {
    this.formElement.innerHTML = `
            <label>
                Username: <input type="text" id="username" required />
            </label>
            <label>
                Email: <input type="email" id="email" required />
            </label>
            <label>
                Password: <input type="password" id="password" required />
            </label>
            <button type="submit">Register</button>
        `;
  }

  public render(container: HTMLElement) {
    container.appendChild(this.formElement);
  }

  public onSubmit(
    callback: (data: {
      username: string;
      email: string;
      password: string;
    }) => void
  ) {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = (document.getElementById("username") as HTMLInputElement)
        .value;
      const email = (document.getElementById("email") as HTMLInputElement)
        .value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;

      callback({ username, email, password });
    });
  }
}
