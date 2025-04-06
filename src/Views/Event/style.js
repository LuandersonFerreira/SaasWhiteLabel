import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.5s ease-in-out;
  z-index: -1;
`;

export const CountdownBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
`;

export const EventInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;
