import styled from "styled-components";
import { Card } from "antd";

export const Container = styled(Card)`
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: ${({ colors }) =>
    `linear-gradient(135deg, ${colors[0] || "#fff"} 0%, ${
      colors[1] || "#fff"
    } 100%)`};
  background-attachment: fixed;
  font-size: 1.2em;
`;

export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const CountdownContainer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
`;

export const StyledCard = styled(Card)`
  width: 100%;
  text-align: left;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0;
`;

export const InfoText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
