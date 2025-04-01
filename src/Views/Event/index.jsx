import { Typography } from "antd";
import {
  Banner,
  Container,
  StyledCard,
  InfoText,
  Section,
  CountdownContainer,
  GradientOverlay,
} from "./style";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractColorsFromImage } from "../../utils/extractColors";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const { Title, Text } = Typography;

export default function Event() {
  const { state: event } = useLocation();
  const [colors, setColors] = useState(["#1890ff", "#52c41a"]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(event.date));
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    if (event.photo) {
      extractColorsFromImage(event.photo).then(setColors);
    }
  }, [event.photo]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeLeft(event.date);
      setTimeLeft(time);
      setEventPassed(time.passed);
    }, 1000);

    return () => clearInterval(interval);
  }, [event.date]);

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

  return (
    <Container colors={colors}>
      <Banner imageUrl={event.photo}>
        <GradientOverlay colors={colors} />
        <CountdownContainer>
          {eventPassed ? (
            <Title level={2} style={{ color: "white" }}>
              Evento encerrado
            </Title>
          ) : (
            <>
              <Title level={2} style={{ color: "white", marginBottom: 0 }}>
                Countdown to Event
              </Title>
              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div key={unit}>
                    <Text strong style={{ fontSize: "2rem", color: "white" }}>
                      {String(timeLeft[unit]).padStart(2, "0")}
                    </Text>
                    <Text style={{ color: "white", display: "block" }}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </Text>
                  </div>
                ))}
              </div>
            </>
          )}
        </CountdownContainer>
      </Banner>
      <StyledCard>
        <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
          {event.name}
        </Title>
        <Section>
          <InfoText>
            <Text strong>Data: </Text>
            <Text>{dayjs(event.date).format("DD/MM/YYYY HH:mm:ss")}</Text>
          </InfoText>
          <InfoText>
            <Text strong>Endereço: </Text>
            <Text>{event.address}</Text>
          </InfoText>
          <InfoText>
            <Text strong>Máximo de convidados: </Text>
            <Text>{event.maxGuests}</Text>
          </InfoText>
        </Section>
      </StyledCard>
    </Container>
  );
}
