import styled from "styled-components";

import { Typography, Flex } from "antd";
const { Text } = Typography;

import { SlidingCharacter } from "./SlidingCharacter";
import { useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const padWithZero = (value, length = 2) => {
  return String(value).padStart(length, "0");
};

const CharacterContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
`;

// eslint-disable-next-line react/prop-types
export const CountdownPart = ({ value }) => {
  const previousValue = usePrevious(value);
  const [currentString, previousString] = [value, previousValue || value].map(
    (number) => padWithZero(number)
  );

  return (
    <>
      <Flex align="center" justify="center" style={{ height: "100%" }}>
        <Flex>
          {currentString.split("").map((character, index) => {
            const previousCharacter = previousString[index];
            const animationId =
              previousCharacter !== character
                ? `${previousCharacter}${character}`
                : undefined;

            return (
              <CharacterContainer key={index}>
                <Text style={{ visibility: "hidden", fontSize: 30 }}>
                  {character}
                </Text>
                <SlidingCharacter animationId={animationId}>
                  <Text style={{ fontSize: 30 }}>{previousCharacter}</Text>
                  <Text style={{ fontSize: 30 }}>{character}</Text>
                </SlidingCharacter>
              </CharacterContainer>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};
