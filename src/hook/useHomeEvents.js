import { useCallback } from "react";
import { useHomeEventsStore } from "../store/homeEventsStore";
import { mockEvents } from "../mock/events";
import api from "./api";

export const useHomeEvents = (useMock = true) => {
  const { events, loading, hasFetched, setEvents, setLoading } =
    useHomeEventsStore();

  const fetchEvents = useCallback(async () => {
    if (hasFetched) return;

    setLoading(true);

    try {
      let data;

      if (useMock) {
        data = mockEvents;
      } else {
        const response = await api.get("/event/list");
        data = response.data;
      }

      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  }, [useMock, hasFetched, setEvents, setLoading]);

  return { events, loading, fetchEvents };
};
