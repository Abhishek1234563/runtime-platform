import { create } from "zustand";

interface AuthStore {

  token: string;

  setToken: (
    token: string
  ) => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({

    token:
      localStorage.getItem("token")
      || "",

    setToken: (token) => {

      localStorage.setItem(
        "token",
        token
      );

      set({ token });
    },
  }));