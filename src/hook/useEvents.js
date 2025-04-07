import { useEffect, useState } from "react";
import { mockEvents } from "../mock/events";
import { unslugify } from "../utils/slugify";
import { normalizeString } from "../utils/normalizeString";
// import api from "../services/api"; // descomente se estiver usando API real

export const useEvents = (eventNameSlug, useMock = true) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      setLoading(true);

      if (useMock) {
        const eventName = unslugify(eventNameSlug);
        const found = mockEvents.find(
          (e) => normalizeString(e.name) === normalizeString(eventName)
        );
        console.log(normalizeString(mockEvents[4].name), "found");
        setEvent(found || null);
      } else {
        // const response = await api.get(`/events/slug/${slug}`);
        // setEvent(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventNameSlug) fetchEvent();
  }, [eventNameSlug, useMock]);

  return { event, loading };
};
