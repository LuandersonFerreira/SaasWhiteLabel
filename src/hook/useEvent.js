import { useEventStore } from "../store/eventStore";
import { mockEvents } from "../mock/events";

export const useEvents = (useMock = true) => {
  const { events, loading, hasFetched, setEvents, setLoading } =
    useEventStore();

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
