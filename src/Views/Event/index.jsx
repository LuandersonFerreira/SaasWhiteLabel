import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { extractColorsFromImage } from "../../utils/extractColors";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  StyledContainer,
  EventInfoCard,
  ConfirmGuestsSection,
  FullScreenLoader,
} from "./style";
import { Typography, Button, Spin } from "antd";
import { useThemeStore } from "../../store/themeStore";
import { useEvents } from "../../hook/useEvents";
// import InviteList from "./InviteList";
import GuestList from "./GuestList";
import EventCountdown from "./EventCountdown";

dayjs.extend(duration);

const { Text } = Typography;

export default function EventPage() {
  const { id } = useParams();

  const { event, loading } = useEvents(id, false);

  const setGradientColors = useThemeStore((state) => state.setGradientColors);

  useEffect(() => {
    if (event?.photo) {
      extractColorsFromImage(event?.photo).then(setGradientColors);
    }
  }, [event?.photo, setGradientColors]);

  if (loading || !event) {
    return (
      <FullScreenLoader>
        <Spin size="large" tip="Carregando evento..." />
      </FullScreenLoader>
    );
  }

  return (
    <StyledContainer>
      <EventCountdown event={event} />

      <EventInfoCard>
        {event?.description && (
          <>
            <Text strong style={{ fontSize: "18px" }}>
              Descrição:{" "}
            </Text>
            <Text style={{ fontSize: "18px" }}>{event?.description}</Text>
          </>
        )}
        <br />

        <Text strong style={{ fontSize: "20px" }}>
          Local:{" "}
        </Text>
        <Text style={{ fontSize: "20px" }}>{event?.address}</Text>
        <br />

        {event?.maxGuests && (
          <>
            <Text strong style={{ fontSize: "18px" }}>
              Capacidade:{" "}
            </Text>
            <Text style={{ fontSize: "18px" }}>{event?.maxGuests}</Text>
          </>
        )}
      </EventInfoCard>

      <ConfirmGuestsSection>
        {/* <InviteList>
          {(handleClick) => (
            <Button ghost onClick={handleClick}>
              Lista de convites
            </Button>
          )}
        </InviteList> */}
        <GuestList eventId={id}>
          {(handleClick) => (
            <Button ghost onClick={handleClick}>
              Lista de convidados
            </Button>
          )}
        </GuestList>
      </ConfirmGuestsSection>
    </StyledContainer>
  );
}
