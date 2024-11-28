export class LoginView {
  private formElement: HTMLFormElement;

  constructor() {
    this.formElement = document.createElement("form");
    this.initializeForm();
  }

  private initializeForm() {
    this.formElement.innerHTML = `
            <label>
                Email: <input type="email" id="loginEmail" name="email" placeholder="Įveskite el. paštą" required />
            </label>
            <label>
                Password: <input type="password" id="loginPassword" name="password" placeholder="Įveskite slaptažodį" required />
            </label>
            <button type="submit" class="buttonLogReg">Prisijungti</button>
            <p class="switch-form">Neturite paskyros? <a href="#" id="switchToRegister">Registruokitės čia</a></p>
        `;
  }

  public render(container: HTMLElement) {
    container.appendChild(this.formElement);
  }

  public onSubmit(
    callback: (data: { email: string; password: string }) => void
  ) {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.getElementById(
        "loginEmail"
      ) as HTMLInputElement;
      const passwordInput = document.getElementById(
        "loginPassword"
      ) as HTMLInputElement;

      callback({
        email: emailInput.value,
        password: passwordInput.value,
      });
    });
  }

  public onSwitchToRegister(callback: () => void) {
    const switchLink = this.formElement.querySelector("#switchToRegister");
    if (switchLink) {
      switchLink.addEventListener("click", (event) => {
        event.preventDefault();
        callback();
      });
    }
  }
}
