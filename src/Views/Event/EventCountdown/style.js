import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  height: 600px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    border-radius: 24px;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

export const CountdownBox = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  display: inline-block;
  min-width: 300px;
`;
export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
`;

export const TimeUnit = styled.div`
  background-color: #333;
  padding: 16px 0; /* mais padding vertical */
  border-radius: 8px;
  color: #fff;
  font-size: 24px; /* maior font */
  width: 70px; /* largura fixa igual para todos */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.span`
  font-size: 12px;
  color: #bbb;
  margin-top: 6px;
`;
