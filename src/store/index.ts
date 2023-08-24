import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser, IUserProfile } from "../api/types";

type Store = {
  authEmail: string | undefined;
  authUser: IUser | null;
  userProfile: IUserProfile | null;
  requestLoading: boolean;
  authToken: string;
  tempId: string;
  setAuthEmail: (email: string) => void;
  setAuthUser: (user: IUser | null) => void;
  setUserProfile: (profile: IUserProfile | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  setAuthToken: (token: string) => void;
  setTempId: (tempId: string) => void;
};

const useStore = create(
  persist<Store>(
    (set, get) => ({
      authEmail: "",
      authUser: null,
      userProfile: null,
      requestLoading: false,
      authToken: "",
      tempId: "",
      setAuthEmail: (email) => set((state) => ({ ...state, authEmail: email })),
      setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
      setUserProfile: (profile) =>
        set((state) => ({ ...state, userProfile: profile })),
      setRequestLoading: (isLoading) =>
        set((state) => ({ ...state, requestLoading: isLoading })),
      setAuthToken: (token) => set((state) => ({ ...state, authToken: token })),
      setTempId: (tempId) => set((state) => ({ ...state, tempId: tempId })),
    }),
    {
      name: "store", // Set a name for your persisted store
      getStorage: () => sessionStorage, // Choose your preferred storage mechanism
    }
  )
);
interface ITab {
  defaultTab: string;
  setTab: (value: string) => void;
}
export const useTabStore = create<ITab>()((set) => ({
  defaultTab: "depositMoney",
  setTab: (value) => set({ defaultTab: value }),
}));
export default useStore;
