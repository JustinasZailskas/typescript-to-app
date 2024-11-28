export class RegisterView {
  private formElement: HTMLFormElement;

  constructor() {
    this.formElement = document.createElement("form");
    this.initializeForm();
  }

  private initializeForm() {
    this.formElement.innerHTML = `
            <label>
                Username: <input type="text" id="username" name="username" placeholder="Iveskite varda" required />
            </label>
            <label>
                Email: <input type="email" id="email" name="email" placeholder="Iveskite el. pašta" required />
            </label>
            <label>
                Password: <input type="password" id="password" name="password" placeholder="Iveskite slaptažodi" required />
            </label>
            <button type="submit" class="buttonLogReg">Register</button>
            <p class="switch-form">Jau turite paskyrą? <a href="#" id="switchToLogin">Prisijunkite čia</a></p>
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

  public onSwitchToLogin(callback: () => void) {
    const switchLink = this.formElement.querySelector("#switchToLogin");
    if (switchLink) {
      switchLink.addEventListener("click", (event) => {
        event.preventDefault();
        callback();
      });
    }
  }
}
