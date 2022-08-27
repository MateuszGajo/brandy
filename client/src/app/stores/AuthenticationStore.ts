import agent from "app/api/agent";
import { ICreds, INewUser } from "app/models/Authentication";
import { IUser } from "app/models/User";
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
  isLoading = true;
  user: IUser | null = null;

  logout = async () => {
    try {
      await agent.Auth.logout();
      this.user = null;
    } catch (err) {
      console.log("problem with logout" + err);
    }
  };

  verify = async () => {
    try {
      const { data } = await agent.Auth.verify();
      const { user } = data;
      runInAction(() => {
        this.user = user;
      });
    } catch (err) {
      console.log("Invalid token");
    } finally {
      this.isLoading = false;
    }
  };

  login = async (creds: ICreds) => {
    this.loginError = "";
    this.isSubmitting = true;
    try {
      const { data } = await agent.Auth.login(creds);
      const { user } = data;

      runInAction(() => {
        this.user = user;
        this.isSubmitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.user = null;
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
      const { data } = await agent.Auth.register(creds);
      const { user } = data;

      runInAction(() => {
        this.user = user;
        this.isSubmitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.user = null;
      });
      if (!axios.isAxiosError(error)) return;
      const code = error.response?.status;
      const message = error.response?.data;

      if (code === 409 && message === authError.userAlreadyExists)
        this.registerError = "Użytkownik już istnieje";
    }
  };
}
