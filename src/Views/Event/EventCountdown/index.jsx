import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Typography } from "antd";
import {
  CountdownBox,
  CountdownContainer,
  Header,
  Label,
  TimeUnit,
} from "./style";
import PropTypes from "prop-types";
import { useCountdown } from "../../../utils/countdown";

dayjs.extend(duration);

const { Title, Text } = Typography;

export default function EventCountdown(props) {
  const { event } = props;

  const [eventPassed, setEventPassed] = useState(false);

  const { days, hours, minutes, seconds } = useCountdown(event?.date);

  useEffect(() => {
    const now = dayjs();
    const eventTime = dayjs(event?.date);
    const diff = eventTime.diff(now);

    setEventPassed(diff <= 0);
  }, [event?.date]);

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <Header backgroundImage={event?.photo}>
      <CountdownBox>
        <Title style={{ color: "#fff", marginBottom: 16 }} level={2}>
          {event?.title}
        </Title>

        {eventPassed ? (
          <div>
            <Text type="danger">O evento já aconteceu!</Text>
          </div>
        ) : (
          <CountdownContainer>
            <TimeUnit>
              {formatTime(days)}
              <Label>dias</Label>
            </TimeUnit>
            <TimeUnit>
              {formatTime(hours)}

              <Label>horas</Label>
            </TimeUnit>
            <TimeUnit>
              {formatTime(minutes)}

              <Label>minutos</Label>
            </TimeUnit>
            <TimeUnit>
              {formatTime(seconds)}

              <Label>segundos</Label>
            </TimeUnit>
          </CountdownContainer>
        )}
        {event?.date && (
          <Text style={{ color: "#ccc", fontSize: 16 }}>
            Data: {dayjs(event.date).format("D [de] MMMM [às] HH:mm")}
          </Text>
        )}
      </CountdownBox>
    </Header>
  );
}

EventCountdown.propTypes = {
  event: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    photo: PropTypes.string,
    address: PropTypes.string,
    date: PropTypes.string.isRequired,
    maxGuests: PropTypes.number,
    userId: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};
