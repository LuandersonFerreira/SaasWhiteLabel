import PropTypes from "prop-types";
import {
  CarouselWrapper,
  EventCardContainer,
  EventImage,
  EventContent,
  EventTitle,
  EventText,
} from "./styles";

const CarouselHighlight = ({ events = [] }) => (
  <CarouselWrapper
    arrows
    dotPosition="left"
    infinite
    autoplay={{ dotDuration: true }}
    autoplaySpeed={5000}
  >
    {events?.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </CarouselWrapper>
);

CarouselHighlight.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      banner: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ),
};

export default CarouselHighlight;

const EventCard = ({ event }) => {
  return (
    <EventCardContainer>
      <EventImage src={event?.banner} alt={event.name} />
      <EventContent>
        <EventTitle>{event.name}</EventTitle>
        <EventText>📅 {event.date}</EventText>
        <EventText>📍 {event.address}</EventText>
      </EventContent>
    </EventCardContainer>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    banner: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};
