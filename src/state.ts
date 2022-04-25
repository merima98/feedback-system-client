import create, { SetState } from "zustand";

type Auth = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean, userId: string, token?: string) => void;
  setLoggedOut: (value: boolean) => void;
};
type Theme = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

const useDarkMode = create<Theme>((set: SetState<Theme>) => ({
  isDarkMode: window.localStorage.getItem("darkMode") === "dark" ? true : false,
  setIsDarkMode: (value: boolean) => {
    window.localStorage.setItem("darkMode", value === true ? "dark" : "light");
    return set({ isDarkMode: value });
  },
}));

const useAuth = create<Auth>((set: SetState<Auth>) => ({
  isLoggedIn: Boolean(window.localStorage.getItem("token")) || false,
  setIsLoggedIn: (value: boolean, userId: string, token?: string) => {
    if (value && token) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", userId.toString());
      return set({ isLoggedIn: value });
    }
    window.localStorage.removeItem("token");
    return set({ isLoggedIn: value });
  },
  setLoggedOut(value: boolean) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    return set({ isLoggedIn: value });
  },
}));

export { useAuth, useDarkMode };
