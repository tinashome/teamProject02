import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from 'mockData/image1.jpg';
import image2 from 'mockData/image2.jpg';
import image3 from 'mockData/image3.jpg';

const images = [image1, image2, image3];

const GroundSlide = () => (
  <StyleSlider
    dots
    infinite
    autoplay
    speed={500}
    autoplaySpeed={4000}
    slidesToShow={1}
    slidesToScroll={1}
  >
    {images.map((data, idx) => (
      <SlideImgs src={data} alt={idx} />
    ))}
  </StyleSlider>
);

const StyleSlider = styled(Slider)`
  width: 100%;
  height: 17rem;
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
  height: 17rem;
  object-fit: cover;
`;

export default GroundSlide;
