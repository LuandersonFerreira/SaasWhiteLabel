import { create } from "zustand";

const useThemeStore = create((set) => ({
  primaryColor: "#1890ff",
  secondaryColor: "#ff4d4f",
  backgroundColor: "#ffffff",
  setTheme: (theme) => set((state) => ({ ...state, ...theme })),
}));

export default useThemeStore;
