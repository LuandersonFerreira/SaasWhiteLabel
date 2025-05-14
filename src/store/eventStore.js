import { create } from "zustand";

export const useEventStore = create((set) => ({
  events: [],
  loading: false,
  hasFetched: false,
  setEvents: (events) => set({ events, hasFetched: true }),
  setLoading: (loading) => set({ loading }),
}));
