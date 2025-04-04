import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractColorsFromImage } from "../../utils/extractColors";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { CountdownBox, EventInfo, StyledContainer } from "./style";
import { Typography } from "antd";
import { useThemeStore } from "../../store/themeStore";

dayjs.extend(duration);

const { Title, Text } = Typography;

export default function EventPage() {
  const { state: event } = useLocation();
  const setGradientColors = useThemeStore((state) => state.setGradientColors);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(event.date));
  const [eventPassed, setEventPassed] = useState(false);

  useEffect(() => {
    if (event.photo) {
      extractColorsFromImage(event.photo).then(setGradientColors);
    }
  }, [event.photo, setGradientColors]);

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
    <StyledContainer>
      <CountdownBox>
        <Title level={2}>{event.name}</Title>
        {eventPassed ? (
          <Text type="danger">O evento já aconteceu!</Text>
        ) : (
          <div className="countdown">
            <Text>{timeLeft.days}d</Text>
            <Text>{timeLeft.hours}h</Text>
            <Text>{timeLeft.minutes}m</Text>
            <Text>{timeLeft.seconds}s</Text>
          </div>
        )}
      </CountdownBox>
      <EventInfo>
        <Text strong>Local:</Text> <Text>{event.address}</Text>
        <br />
        <Text strong>Capacidade:</Text> <Text>{event.maxGuests} pessoas</Text>
      </EventInfo>
    </StyledContainer>
  );
}
