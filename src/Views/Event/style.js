import styled from "styled-components";

export const FullScreenLoader = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Header = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CountdownBox = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;

  .countdown {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 10px;
  }

  span {
    font-size: 18px;
  }
`;

export const EventInfoCard = styled.div`
  background: #fff;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ConfirmGuestsSection = styled.div`
  display: flex;
  gap: 10px;
`;
