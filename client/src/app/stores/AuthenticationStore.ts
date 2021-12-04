import { makeAutoObservable } from "mobx";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
  }

  logout = () => {
    console.log("logout");
  };
}
