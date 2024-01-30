import { create } from "zustand";

interface UserState {
  username: string;
  firstname: string;
  lastname: string;
  setUser: (user: string, firstname: string, lastname: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  username: "",
  firstname: "",
  lastname: "",
  setUser: (username: string, firstname: string, lastname: string) =>
    set({ username, firstname, lastname }),
  clearUser: () => set({ username: "", firstname: "", lastname: "" }),
}));

export default useUserStore;
