import dayjs from "dayjs";
import { Flex, Typography } from "antd";
import PropTypes from "prop-types";
import { Countdown } from "./CountDown";
import React from "react";

const { Text, Paragraph } = Typography;

export default function Info(props) {
  const { event } = props;

  const eventDate = dayjs(event?.date);
  const endsAt = React.useMemo(() => eventDate, [eventDate]);

  return (
    <Flex vertical>
      <Flex justify="center" gap={20} style={{ marginBottom: 20 }}>
        <Countdown endsAt={endsAt} />
      </Flex>

      <Paragraph>
        <Text strong>Nome do Evento: </Text>
        <Text>{event?.title}</Text>
      </Paragraph>

      <Paragraph>
        <Text strong>Data do Evento: </Text>
        <Text>
          {eventDate.isValid()
            ? eventDate.format("DD/MM/YYYY HH:mm")
            : "Data inválida"}
        </Text>
      </Paragraph>

      <Paragraph>
        <Text strong>Local: </Text>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            event?.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1677ff" }}
        >
          {event?.address}
        </a>
      </Paragraph>

      <Paragraph>
        <Text strong>Descrição: </Text>
        <Text>{event?.description || "Sem descrição"}</Text>
      </Paragraph>
    </Flex>
  );
}

Info.propTypes = {
  event: PropTypes.shape({
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
