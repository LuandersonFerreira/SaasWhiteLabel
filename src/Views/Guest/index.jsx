import { useEffect, useState } from "react";
import { Form, Spin } from "antd";
import { useParams } from "react-router-dom";
import api from "../../hook/api";
import GuestForm from "./Form";

export default function GuestHome() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const response = await api.get(`/guest?guestId=${guestId}`);
        setGuest(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Erro ao carregar convidado:", error);
      }
    };

    if (guestId) {
      fetchGuest();
    }
  }, [guestId]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(
          `/guest/event/${guest.eventId}?guestId=${guestId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Erro ao carregar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    if (guest?.eventId) {
      fetchEvent();
    }
  }, [guest?.eventId]);

  const handleSubmit = async (values) => {
    try {
      await api.put(`/guest`, { ...values, uuid: guestId });
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    }
  };

  if (loading) return <Spin />;

  return (
    <GuestForm
      guest={guest}
      form={form}
      event={event}
      handleSubmit={handleSubmit}
    />
  );
}
