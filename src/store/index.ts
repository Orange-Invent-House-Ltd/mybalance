import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../api/types';

type Store = {
  authEmail: string;
  authUser: IUser | null;
  requestLoading: boolean;
  authToken: string;
  setAuthEmail:(email:string) => void;
  setAuthUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  setToken:(token:string) => void;
};

const useStore = create(
  persist<Store>(
    (set, get) =>({
    authEmail: "",
    authUser: null,
    requestLoading: false,
    authToken: "",
    setAuthEmail: (email) => set((state) => ({ ...state, authEmail: email })),
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setRequestLoading: (isLoading) => set((state) => ({ ...state, requestLoading: isLoading })),
    setToken: (token) => set((state) => ({ ...state, authToken: token })),
    }),
    {
      name: 'store', // Set a name for your persisted store
      getStorage: () => sessionStorage, // Choose your preferred storage mechanism
    }
  )
);

export default useStore;