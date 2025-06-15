import { create } from "zustand";

export const useThemeStore = create((set) => ({
  primaryColor: "#1890ff",
  secondaryColor: "#ff4d4f",
  backgroundColor: "#ffffff",
  gradientColors: ["#1a1a1a", "#333333", " #666666"],
  setGradientColors: (colors) => set({ gradientColors: colors }),
  setTheme: (theme) => set((state) => ({ ...state, ...theme })),
}));
