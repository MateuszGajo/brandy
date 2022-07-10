import { useContext, createContext } from "react";
import CommonStore from "../stores/CommonStore";
import AuthenticationStore from "../stores/AuthenticationStore";
import ActivityStore from "../stores/ActivityStore";

interface IStore {
  commonStore: CommonStore;
  authenticationStore: AuthenticationStore;
  activityStore: ActivityStore;
}

export const store: IStore = {
  commonStore: new CommonStore(),
  authenticationStore: new AuthenticationStore(),
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);

export function useStore(): IStore {
  return useContext(StoreContext);
}

export function useAuthenticationStore() {
  const { authenticationStore } = useStore();
  return authenticationStore;
}

export function useActivityStore() {
  const { activityStore } = useStore();
  return activityStore;
}
