import { useContext, createContext } from "react";
import CommonStore from "../stores/CommonStore";

interface IStore {
  commonStore: CommonStore;
}
export const store: IStore = {
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore(): IStore {
  return useContext(StoreContext);
}
