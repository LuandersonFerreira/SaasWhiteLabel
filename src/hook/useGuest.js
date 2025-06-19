import { useState, useEffect, useCallback } from "react";
import { mockInvites } from "../mock/invites";
import api from "./api";

export const useGuest = (eventId, useMock = false) => {
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  const fetchGuestList = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      const response = useMock
        ? mockInvites[0]
        : await api.get(`/event/guest/list?eventId=${eventId}`);
      setGuestList(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Erro ao buscar convite");
    } finally {
      setLoading(false);
    }
  }, [eventId, useMock]);

  const createGuest = useCallback(
    async (data) => {
      if (!eventId) return null;

      try {
        setCreating(true);
        setCreateError(null);

        const response = await api.post(
          `/event/guest?eventId=${eventId}`,
          data
        );

        const guestId = response.data.guestId;
        const guestLink = `${window.location.origin}/Convite/${guestId}`;

        await fetchGuestList();

        return guestLink;
      } catch (err) {
        setCreateError(err.message || "Erro ao criar guest");
        return null;
      } finally {
        setCreating(false);
      }
    },
    [eventId, fetchGuestList]
  );

  useEffect(() => {
    fetchGuestList();
  }, [fetchGuestList]);

  return {
    guestList,
    loading,
    error,
    refresh: fetchGuestList,
    createGuest,
    creating,
    createError,
  };
};
