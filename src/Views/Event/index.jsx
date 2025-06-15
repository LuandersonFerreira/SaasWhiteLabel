import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractColorsFromImage } from "../../utils/extractColors";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  StyledContainer,
  Header,
  Overlay,
  CountdownBox,
  EventInfoCard,
  ConfirmGuestsSection,
  FullScreenLoader,
} from "./style";
import { Typography, Button, Spin } from "antd";
import { useThemeStore } from "../../store/themeStore";
import { useEvents } from "../../hook/useEvents";
// import InviteList from "./InviteList";
import GuestList from "./GuestList";

dayjs.extend(duration);

const { Title, Text } = Typography;

export default function EventPage() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const { event, loading } = useEvents(id, false);

  const setGradientColors = useThemeStore((state) => state.setGradientColors);
  const [timeLeft, setTimeLeft] = useState();
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    if (event?.photo) {
      console.log(event, ";event");
      extractColorsFromImage(event?.photo).then(setGradientColors);
    }
  }, [event?.photo, setGradientColors]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeLeft(event?.date);
      setTimeLeft(time);
      setEventPassed(time.passed);
    }, 1000);

    return () => clearInterval(interval);
  }, [event?.date]);

  function getTimeLeft(eventDate) {
    const now = dayjs();
    const eventTime = dayjs(eventDate);
    const diff = eventTime.diff(now);

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    }

    const duration = dayjs.duration(diff);

    return {
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
      passed: false,
    };
  }

  if (loading || !event || !timeLeft) {
    return (
      <FullScreenLoader>
        <Spin size="large" tip="Carregando evento..." />
      </FullScreenLoader>
    );
  }

  return (
    <StyledContainer>
      <Header backgroundImage={event?.photo}>
        <Overlay />
        <CountdownBox>
          <Title style={{ color: "#fff" }} level={2}>
            {event?.title}
          </Title>
          {eventPassed ? (
            <Text type="danger">O evento já aconteceu!</Text>
          ) : (
            <div className="countdown">
              <Text style={{ color: "#fff" }}>{timeLeft.days}d</Text>
              <Text style={{ color: "#fff" }}>{timeLeft.hours}h</Text>
              <Text style={{ color: "#fff" }}>{timeLeft.minutes}m</Text>
              <Text style={{ color: "#fff" }}>{timeLeft.seconds}s</Text>
            </div>
          )}
        </CountdownBox>
      </Header>

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
