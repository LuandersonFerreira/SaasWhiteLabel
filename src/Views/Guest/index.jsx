import { useEffect, useState } from "react";
import { Form, Spin } from "antd";
import { useParams } from "react-router-dom";
import api from "../../hook/api";
import GuestForm from "./Form";
import { Container, PageBackground, StyledCard } from "./style";
import Info from "./Info";

export default function GuestHome() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [updatingGuest, setUpdatingGuest] = useState(false);

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
        const formattedEvent = {
          ...response.data,
          banner: `data:image/jpeg;base64,${response.data.banner}`,
        };

        setEvent(formattedEvent);
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
    setUpdatingGuest(true);

    try {
      await api.put(`/guest`, { ...values, uuid: guestId });
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    } finally {
      setUpdatingGuest(false);
    }
  };

  if (loading) return <Spin />;

  return (
    <>
      <PageBackground backgroundImage={event?.banner} />

      <Container>
        <StyledCard title="Informações do Evento">
          <Info event={event} />
        </StyledCard>

        <StyledCard title="Responder Convite">
          <GuestForm
            guest={guest}
            form={form}
            event={event}
            handleSubmit={handleSubmit}
            loading={updatingGuest}
          />
        </StyledCard>
      </Container>
    </>
  );
}
