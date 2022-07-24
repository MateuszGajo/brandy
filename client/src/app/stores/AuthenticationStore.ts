import agent from "app/api/agent";
import { ICreds, INewUser } from "app/models/Authentication";
import { authError } from "app/utils/ErrorResponses";
import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
  }

  loginError = "";
  registerError = "";
  isSubmitting = false;
  isAuthenticated = false;

  logout = () => {
    console.log("logout");
  };

  verify = async () => {
    try {
      await agent.Auth.verify();
      runInAction(() => {
        this.isAuthenticated = true;
      });
    } catch (err) {
      console.log("Invalid token");
    }
  };

  login = async (creds: ICreds) => {
    this.loginError = "";
    this.isSubmitting = true;
    try {
      await agent.Auth.login(creds);
      runInAction(() => {
        this.isSubmitting = false;
        this.isAuthenticated = true;
      });
    } catch (error) {
      runInAction(() => {
        this.isSubmitting = false;
      });
      if (!axios.isAxiosError(error)) return console.log("erorr?");
      const code = error.response?.status;
      const message = error.response?.data;

      if (code === 404 && message === authError.userDoesntExist)
        this.loginError = "Podany użytkownik nie istnieje";
      if (code === 401 && message === authError.incorrectPassword)
        this.loginError = "Niepoprawne hasło";
    }
  };

  register = async (creds: INewUser) => {
    this.isSubmitting = true;
    this.loginError = "";
    try {
      await agent.Auth.register(creds);
      runInAction(() => {
        this.isSubmitting = false;
        this.isAuthenticated = true;
      });
    } catch (error) {
      runInAction(() => {
        this.isSubmitting = false;
      });
      if (!axios.isAxiosError(error)) return;
      const code = error.response?.status;
      const message = error.response?.data;

      if (code === 409 && message === authError.userAlreadyExists)
        this.registerError = "Użytkownik już istnieje";
    }
  };
}
