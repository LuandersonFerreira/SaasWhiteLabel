import { useEvents } from "../../../hook/useEvent";
import CarouselHighlight from "./Carousel";

export default function Highlight() {
  const { events } = useEvents(true);

  return <CarouselHighlight events={events} />;
}
