import { create } from "zustand";

interface UserState {
  username: string | undefined;
  setUser: (user: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  username: undefined,
  setUser: (username: string) => set({ username }),
}));

export default useUserStore;
