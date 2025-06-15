import { create } from "zustand";

export const useHomeEventsStore = create((set) => ({
  events: [],
  loading: false,
  hasFetched: false,
  setEvents: (events) => set({ events, hasFetched: true }),
  setLoading: (loading) => set({ loading }),
}));
