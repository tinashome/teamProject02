import React from 'react';
import styled from 'styled-components';

// api결과로 받은 ground의 정보를 표시해주는 모달창
// { success: true, ...result.data } success:통신결과 상태T/F
const GroundInfoModal = ({
  modal,
  goGroundList,
  modalImage,
  setModalImage,
}) => (
  <ModalWrapper
    modal={modal}
    modalImage={modalImage.image}
    onClick={() => {
      if (modal && modal.success) {
        goGroundList();
      } else if (modalImage.image) {
        setModalImage('');
      }
    }}
  >
    {modalImage.image && (
      <ModalImage modalImage={modalImage.image} src={modalImage.url} />
    )}
    {modal && (
      <ModalDiv modal={modal}>
        <TextContainers
          style={{
            fontSize: '28px',
            textAlign: 'center',
            height: '40px',
          }}
        >
          <IsSuccessTitle success={modal.success} style={{ width: '330px' }}>
            등록결과 {modal.success ? '성공' : '실패'}
          </IsSuccessTitle>
        </TextContainers>
        <TextContainers>
          <Title>경기장명</Title> <Text>{modal.groundName} </Text>
        </TextContainers>
        <TextContainers>
          <Title>포인트</Title>
          <Text>{modal.paymentPoint.toLocaleString()} </Text>
        </TextContainers>
        <TextContainers>
          <Title>주소</Title>
          <Text>
            ({modal.groundAddress.postalCode}) {modal.groundAddress.address1}
          </Text>
        </TextContainers>
        <TextContainers>
          <Title /> <Text>{modal.groundAddress.address2} </Text>
        </TextContainers>
        <TextContainers>
          <Title>사진</Title>
          <Text>{modal.groundImg && modal.groundImg.length}장 </Text>
        </TextContainers>
        <ImgBoxContainers>
          <ImgBox>
            {modal.groundImg.map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Img key={i} src={e} alt={`img${i}`} />
            ))}
          </ImgBox>
        </ImgBoxContainers>
        <TextContainers>
          <Title>구장크기</Title> <Text>{modal.groundSize} </Text>
        </TextContainers>
        <TextContainers style={{ height: '50px' }}>
          <Title>기타사항</Title>
          <Text>
            <Texts>
              <div style={{ width: '100px' }}>
                샤워실 {modal.showerPlace ? `O` : `X`}
              </div>
              <div style={{ width: '100px' }}>
                무료주차 {modal.parking ? `O` : `X`}
              </div>
              <div style={{ width: '100px' }}>
                운동복대여 {modal.shoesRental ? `O` : `X`}
              </div>
              <div style={{ width: '100px' }}>
                풋살화대여 {modal.sportswearRental ? `O` : `X`}{' '}
              </div>
            </Texts>
          </Text>
        </TextContainers>
        <TextContainers>
          <Title>가는길</Title> <Text>{modal.wayTo} </Text>
        </TextContainers>
        <TextContainers>
          <Title>주차</Title> <Text>{modal.parkingInfo} </Text>
        </TextContainers>
        <TextContainers>
          <Title>흡연</Title> <Text>{modal.smoking} </Text>
        </TextContainers>
        <TextContainers>
          <Title>풋살화대여</Title> <Text>{modal.shoesRentallInfo} </Text>
        </TextContainers>
        <TextContainers>
          <Title>화장실</Title> <Text>{modal.toilet} </Text>
        </TextContainers>
        <TextContainers>
          <Title>기타</Title>
          <Text>
            {modal.actInfo && modal.actInfo[0]}
            {modal.actInfo[1] && ` . . . 외`}{' '}
          </Text>
        </TextContainers>
        <TextContainers>
          <Title>시작/종료</Title>
          <Text>{`${modal.startTime}부터    ${modal.endTime}까지`}</Text>
        </TextContainers>
        <div
          style={{
            textAlign: 'right',
            fontWeight: '600',
            color: '#3563e9',
            fontSize: '16px',
            paddingTop: '15px',
            marginRight: '-15px',
          }}
        >
          화면을 클릭하시면 목록으로 이동합니다.
        </div>
      </ModalDiv>
    )}
  </ModalWrapper>
);

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal || props.modalImage ? 'flex' : 'none')}};
  display:flex;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 18px;
  justify-content: center;
  align-items: center;
`;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 600px;s
  margin-left: -250px;
  margin-top: -400px;
  padding: 5px 20px;
  border: solid 10px #3563e9;
  border-radius: 5px;
  background-color: #fff;
`;

const TextContainers = styled.div`
  display: flex;
  height: 23px;
  margin: 2px;
`;

const Title = styled.div`
  width: 90px;
  font-weight: 600;
  margin-right: 10px;
  text-align: right;
`;
const Texts = styled.div`
  display: flex;
  width: 200px;
  font-weight: 400;
  flex-wrap: wrap;
  align-self: center;
`;

const Text = styled.div`
  width: 250px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`;
const IsSuccessTitle = styled(Text)`
  color: ${(props) => (props.success ? '#3563e9' : '#dc5d5d')};
  font-weight: 600;
  padding-bottom: 15x;
`;

const ImgBoxContainers = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ImgBox = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 10px;
`;

const Img = styled.img`
  display: flex;
  width: 89px;
  height: 89px;
`;

const ModalImage = styled.img`
  display: ${(props) => (props.modalImage ? 'flex' : 'none')}};
  max-width: 80%;
  max-height: 80%;
  user-select: none;
`;

export default GroundInfoModal;
