import { useContext, createContext } from "react";
import CommonStore from "../stores/CommonStore";
import AuthenticationStore from "../stores/AuthenticationStore";

interface IStore {
  commonStore: CommonStore;
  authenticationStore: AuthenticationStore;
}

export const store: IStore = {
  commonStore: new CommonStore(),
  authenticationStore: new AuthenticationStore(),
};

export const StoreContext = createContext(store);

export function useStore(): IStore {
  return useContext(StoreContext);
}

export function useAuthenticationStore() {
  const { authenticationStore } = useStore();
  return authenticationStore;
}
