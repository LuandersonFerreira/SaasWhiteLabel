import { useEffect, useState } from "react";
import { mockEvents } from "../mock/events";
import api from "./api";
// import api from "../services/api"; // descomente se estiver usando API real

export const useEvents = (id, useMock = true) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      if (useMock) {
        const found = mockEvents.find((e) => e.id === id);
        setEvent(found || null);
      } else {
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (newEvent) => {
    try {
      setLoading(true);

      if (useMock) {
        mockEvents.push(newEvent);
        setEvent(newEvent);
        return newEvent;
      } else {
        const response = await api.post("/api/events", newEvent);
        setEvent(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect", id);
    if (id) fetchEvent();
  }, [id, useMock]);

  return { event, loading, createEvent };
};
