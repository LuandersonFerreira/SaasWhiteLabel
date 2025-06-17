import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = dayjs();
    const end = dayjs(targetDate);
    const diff = end.diff(now, "second");

    const duration = dayjs.duration(diff * 1000, "milliseconds");
    return {
      days: Math.max(duration.days(), 0),
      hours: Math.max(duration.hours(), 0),
      minutes: Math.max(duration.minutes(), 0),
      seconds: Math.max(duration.seconds(), 0),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
