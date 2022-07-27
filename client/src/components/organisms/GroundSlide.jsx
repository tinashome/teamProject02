import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ModalWrapper from 'components/atoms/AdminModalWrapper';
import ModalDiv from 'components/atoms/AdminModalDiv';

// 처음 mount 될 때는 undefined였다가 부모컴포넌트가 비동기처리를 끝내고 나면 다시 받아온다.

const GroundSlide = ({
  info,
  showImgModal,
  setShowImgModal,
  imgModalCurser,
}) => {
  const [infoState, setInfoState] = useState(info);

  useEffect(() => {
    if (showImgModal) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [showImgModal]);

  useEffect(() => {
    setInfoState(info);
  }, [info]);

  const imgClick = () => {
    setShowImgModal(!showImgModal);
  };

  return (
    <>
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
          <SlideImgs
            key={idx}
            src={data}
            showCurser={imgModalCurser}
            useScroll={showImgModal}
            onClick={imgClick}
          />
        ))}
      </StyleSlider>

      {showImgModal && (
        <ModalWrapper onClick={imgClick}>
          <SlideImgModalDiv>
            <ModalImgs>
              {infoState?.map((data) => (
                <ModalImg key={data} src={data} />
              ))}
            </ModalImgs>
          </SlideImgModalDiv>
        </ModalWrapper>
      )}
    </>
  );
};

const SlideImgModalDiv = styled(ModalDiv)`
  max-height: 100%;
  overflow: auto;
  width: 50rem;
  height: 70%;
  left: 30%;
  top: 30%;
  z-index: 100;
`;

const ModalImgs = styled.div`
  height: 20rem;
  margin: 0.5rem 0 5rem 0;
`;
const ModalImg = styled.img`
  max-height: auto;
  height: 20rem;
  width: 40rem;
  margin: 0 0 0.5rem 0;
`;

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
  cursor: ${(props) => (props.showCurser ? 'pointer' : '')};
  margin: auto;
  width: 100%;
  height: 20rem;
  object-fit: cover;
`;

export default GroundSlide;
