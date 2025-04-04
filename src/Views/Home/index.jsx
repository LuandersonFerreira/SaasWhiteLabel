import Highlight from "./Highlight";
import Events from "./Events";
import { useEvents } from "../../hook/useEvent";
import { useEffect } from "react";

export default function Home() {
  const { fetchEvents, events } = useEvents(true);

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
