import { useRhythmicRerender } from "../../../../utils/useRhythmicRerender";
import { Flex, Typography } from "antd";

const { Text } = Typography;

import { CountdownPart } from "./CoundownPart";

const characters = {
  days: "Dias",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
};
const countdownUnits = ["days", "hours", "minutes", "seconds"];
const msInUnit = {
  days: 86400000,
  hours: 3600000,
  minutes: 60000,
  seconds: 1000,
};

const formatDuration = (durationInMs, units) => {
  const duration = {};

  units.reduce((msLeft, unit, index) => {
    const msInCurrentUnit = msInUnit[unit];
    const isLast = index === units.length - 1;
    const roundFunction = isLast ? Math.round : Math.floor;
    const period = roundFunction(msLeft / msInCurrentUnit);
    duration[unit] = period;

    return msLeft - period * msInCurrentUnit;
  }, durationInMs);

  return duration;
};

// eslint-disable-next-line react/prop-types
export const Countdown = ({ endsAt, precision = "seconds" }) => {
  useRhythmicRerender();

  const now = Date.now();

  const unitsToShow = countdownUnits.slice(
    0,
    countdownUnits.indexOf(precision) + 1
  );

  const duration = formatDuration(Math.max(endsAt - now, 0), unitsToShow);

  return (
    <>
      {unitsToShow.map((unit) => {
        return (
          <Flex align="center" vertical key={unit}>
            <CountdownPart value={duration[unit] || 0} />
            <Text style={{ fontSize: 18 }}>{characters[unit]}</Text>
          </Flex>
        );
      })}
    </>
  );
};
