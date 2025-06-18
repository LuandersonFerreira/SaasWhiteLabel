import { useHomeEvents } from "../../../hook/useHomeEvents";
import { Button, Flex, Typography } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const HighlightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StyledCard = styled.div`
  width: 100%;
  height: 500px;
  background: url(${({ $bgImage }) => $bgImage}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

const InfoOverlay = styled(Flex)`
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 16px;
  z-index: 1;
  gap: 10px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 30%,
      rgba(0, 0, 0, 0.7) 60%,
      rgba(0, 0, 0, 0.85) 85%
    );
    z-index: -1;
  }
`;

const Title = styled(Text)`
  font-size: 50px;
  color: #fff;
  font-weight: bold;
`;

const Description = styled(Text)`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

export default function Highlight() {
  const { events } = useHomeEvents(false);
  const navigate = useNavigate();

  const upcomingEvent = events
    ?.filter((event) => dayjs(event.date).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0];

  if (!upcomingEvent) {
    return <Text>Nenhum evento próximo</Text>;
  }

  // const slug = slugify(upcomingEvent.name);

  return (
    <HighlightWrapper>
      <StyledCard $bgImage={upcomingEvent?.banner}>
        <InfoOverlay>
          <Title>{upcomingEvent.name}</Title>
          <Description>
            {dayjs(upcomingEvent.date)
              .subtract(3, "hour")
              .format("DD/MM/YYYY HH:mm")}
          </Description>
          <Description>{upcomingEvent.address}</Description>
          <Button
            ghost
            size="large"
            style={{
              alignSelf: "center",
            }}
            onClick={() => navigate(`/${upcomingEvent.uuid}`)}
          >
            Mais Informações
          </Button>
        </InfoOverlay>
      </StyledCard>
    </HighlightWrapper>
  );
}
