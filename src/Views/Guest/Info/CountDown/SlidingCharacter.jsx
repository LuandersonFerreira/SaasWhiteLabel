import styled, { keyframes, css } from "styled-components";

import { Typography } from "antd";
const { Text } = Typography;

const getAnimation = (id) => keyframes`
  0% {
    --id: ${id};
    top: 0%;
  }
`;

export const SlidingCharacter = styled(Text).withConfig({
  shouldForwardProp: (prop) =>
    prop !== "animationId" && prop !== "backgroundImage",
})`
  position: absolute;
  top: -100%;
  ${({ animationId }) =>
    animationId &&
    css`
      animation: ${getAnimation(animationId)} 640ms ease-in-out;
    `}
`;
