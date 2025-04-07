import { useHomeEventsStore } from "../store/homeEventsStore";
import { mockEvents } from "../mock/events";

export const useHomeEvents = (useMock = true) => {
  const { events, loading, hasFetched, setEvents, setLoading } =
    useHomeEventsStore();

  const fetchEvents = async () => {
    if (hasFetched) return;

    setLoading(true);

    try {
      const data = useMock ? mockEvents : null; //(await api.get("/events")).data;
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, fetchEvents };
};
