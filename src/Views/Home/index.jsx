import Highlight from "./Highlight";
import Events from "./Events";
import { useHomeEvents } from "../../hook/useHomeEvents";
import { useEffect } from "react";

export default function Home() {
  const { fetchEvents, events } = useHomeEvents(true);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <div>{events.length > 0 && <Highlight />}</div>
      <Events />
    </div>
  );
}
