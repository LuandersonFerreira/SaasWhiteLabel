import { useState, useEffect } from "react";
import axios from "axios";
import { mockInvite } from "../mock/invite";

export const useInvite = (inviteId, useMock = false) => {
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!inviteId) return;

    const fetchInvite = async () => {
      try {
        setLoading(true);
        const response = useMock
          ? mockInvite
          : await axios.get(`/api/invites/${inviteId}`);
        setInvite(response.data);
      } catch (err) {
        setError(err.message || "Erro ao buscar convite");
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, [inviteId]);

  return { invite, loading, error };
};
