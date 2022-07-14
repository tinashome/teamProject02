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
  <Wraps>
    <Slider
      dots
      infinite
      autoplay
      speed={500}
      autoplaySpeed={4000}
      slidesToShow={1}
      slidesToScroll={1}
    >
      {images.map((data, idx) => (
        <Contents>
          <SlideImgs src={data} alt={idx} />
        </Contents>
      ))}
    </Slider>
  </Wraps>
);

const Wraps = styled.div`
  margin: 3% auto;
  width: 100%;

  .slick-prev:before {
    float:left;
    width:400px;
    height:400px;
    color: black;
  }
  .slick-next:before {
    float:right;
    width:400px;
    height:400px;  
    color: black;
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 800px;
  margin: 5px auto;
`;

const SlideImgs = styled.img`
  display: block;
  margin: 0px auto;
  width: 30%;
  height: 50%;
`;

export default GroundSlide;
