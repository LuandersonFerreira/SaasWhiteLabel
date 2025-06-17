import { Card } from "antd";
import styled from "styled-components";

export const PageBackground = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})`
  width: 100vw;
  height: 100vh;

  background-image: ${({ backgroundImage }) =>
    backgroundImage ? `url(${backgroundImage})` : "none"};

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px;
  min-height: 100vh;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const StyledCard = styled(Card)`
  flex: 1;
  border-radius: 16px !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  min-width: 50%;
`;
