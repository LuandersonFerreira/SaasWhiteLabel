import styled from "styled-components";
import { Carousel, Typography } from "antd";

export const CarouselWrapper = styled(Carousel)`
  width: 100%;
  margin: 0 auto;
  height: auto;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const EventCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  background: #000;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const EventImage = styled.img`
  width: 50%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

export const EventContent = styled.div`
  flex: 1;
  padding: 10px;
  color: #fff;
`;

export const EventTitle = styled(Typography.Title).attrs({ level: 4 })`
  && {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
  }
`;

export const EventText = styled(Typography.Text)`
  && {
    font-size: 1.2rem;
    color: #ddd;
    display: block;

    @media (max-width: 600px) {
      display: inline;
    }
  }
`;
