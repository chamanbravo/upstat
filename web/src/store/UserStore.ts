import { create } from "zustand";

interface UserState {
  username: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  setUser: (user: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: undefined,
  firstname: undefined,
  lastname: undefined,
  setUser: (username: string) => set({ username }),
  clearUser: () =>
    set({ username: undefined, firstname: undefined, lastname: undefined }),
}));

export default useUserStore;
