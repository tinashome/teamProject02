import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 처음 mount 될 때는 undefined였다가 부모컴포넌트가 비동기처리를 끝내고 나면 다시 받아온다.

const GroundSlide = ({ info }) => {
  const [infoState, setInfoState] = useState();

  useEffect(() => {
    setInfoState(info);
  }, [info]);

  return (
    <StyleSlider
      dots
      infinite
      autoplay
      speed={500}
      autoplaySpeed={4000}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {infoState?.map((data, idx) => (
        <SlideImgs key={idx} src={data} />
      ))}
    </StyleSlider>
  );
};

const StyleSlider = styled(Slider)`
  width: 100%;
  margin-bottom: 4rem;
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }

  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;

const SlideImgs = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

export default GroundSlide;
