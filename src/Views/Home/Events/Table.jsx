import { Button } from "antd";
import { useEvents } from "../../../hook/useEvent";
import { useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRef, useState } from "react";

export default function CarouselEvents() {
  const { events, loading } = useEvents(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Função para rolar o carrossel manualmente com as setas
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Pixels a rolar
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Iniciar arraste
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Finalizar arraste
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mover durante o arraste
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = (e.pageX - startX) * 1.5; // Multiplicador para suavizar
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Container>
      {events.length === 0 && !loading ? (
        <EmptyState>
          <p>Nenhum evento encontrado.</p>
          <Button type="primary" onClick={() => console.log("Criar Evento")}>
            Criar Evento
          </Button>
        </EmptyState>
      ) : (
        <>
          <Controls>
            <ArrowButton onClick={() => scroll("left")}>
              <LeftOutlined />
            </ArrowButton>
            <ArrowButton onClick={() => scroll("right")}>
              <RightOutlined />
            </ArrowButton>
          </Controls>

          <ScrollContainer
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {[...events, ...events].map((event) => (
              <EventCard key={event.id} background={event.photo}>
                <EventContent>
                  <h1>{event.name}</h1>
                  <h4>{event.address}</h4>
                  <h4>Data: {event.date}</h4>
                  <h4>Máx. Convidados: {event.maxGuests}</h4>
                  <Button
                    ghost
                    onClick={() =>
                      navigate(`/Event/${event.id}`, { state: event })
                    }
                  >
                    Detalhes
                  </Button>
                </EventContent>
              </EventCard>
            ))}
          </ScrollContainer>
        </>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
  white-space: nowrap;
  cursor: grab;
  user-select: none;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Esconde scrollbar no Firefox */

  &::-webkit-scrollbar {
    display: none; /* Esconde scrollbar no Chrome */
  }
`;

const EventCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 300px;
  max-width: 320px;
  height: 350px;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
`;

const EventContent = styled.div`
  padding: 15px;
  color: #fff;
  text-align: left;
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 18px;
  }

  h4 {
    margin: 5px 0;
    font-size: 14px;
  }

  button {
    margin-top: 10px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -50px;
  width: 100%;
`;

const ArrowButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 16px;
  z-index: 3;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

/* Degradê lateral para sumir suavemente */
const GradientLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px; /* Aumenta a largura para um efeito mais suave */
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
`;

const GradientRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px; /* Aumenta a largura para um efeito mais suave */
  height: 100%;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
`;
