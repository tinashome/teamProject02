// 관리자페이지 메뉴4 경기장 상세조회 구현 AdminGroundInfo

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import * as Api from 'api/api';
// eslint-disable-next-line import/no-cycle
import AdminGroundList from './AdminGroundList';
// eslint-disable-next-line import/no-cycle
import AdminGroundEdit from './AdminGroundEdit';

const AdminGroundInfo = ({ groundId }) => {
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  const [ground, setGround] = useState([]);
  const [postCode, setPostCode] = useState([]);
  const [actInfo, setActInfo] = useState([]);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');
  const [modalImage, setModalImage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [actInfoRows, setActInfoRows] = useState(1);

  const getGround = async () => {
    // 경기장조회 api요청
    try {
      const result = await Api.get(`grounds/${groundId}`);
      const resultData = result.data;
      setGround({
        ...resultData,
        paymentPoint: resultData.paymentPoint.toLocaleString(),
        actInfo: resultData.actInfo.join('\n'),
      });
      setActInfo(resultData.actInfo);
      setActInfoRows(resultData.actInfo.length + 3);
      setPostCode([
        resultData.groundAddress.postalCode,
        resultData.groundAddress.address1,
      ]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getGround();
  }, []);

  const handleEdit = async () => {
    setContent([
      '경기장 등록정보 수정',
      <AdminGroundEdit groundId={groundId} />,
    ]);
  };

  const handleClickImage = async (event) => {
    setModalImage({ image: true, url: event.target.src });
  };

  const handleDelete = async () => {
    const { groundName } = ground;
    // eslint-disable-next-line no-alert
    const deleteConfirm = window.confirm(
      `${groundName}의 경기장 정보를 정말 삭제 하시겠습니까?`,
    );
    if (deleteConfirm) {
      try {
        await Api.delete(`grounds/${groundId}`);
        setModal({ success: true, groundName, time: 5 });
        setTimeout(() => {
          setModal(null);
        }, 5000);
        return;
      } catch (err) {
        setModal({ success: false, groundName, time: 5 });
        setTimeout(() => {
          setModal(null);
        }, 5000);
      }
    }
  };

  return (
    ground && (
      <Wrapper>
        <ModalWrapper
          modal={modal}
          modalImage={modalImage.image}
          onClick={() => {
            if (modal && modal.success) {
              setContent(['경기장 목록 조회', <AdminGroundList />]);
              setModal('');
            } else if (modalImage.image) {
              setModalImage('');
            }
          }}
        >
          {modalImage.image && (
            <ModalImage modalImage={modalImage.image} src={modalImage.url} />
          )}
          <ModalDiv modal={modal}>
            {modal.success &&
              `${modal.groundName}\n\n삭제에 ${
                modal.success ? '성공' : '실패'
              } 하였습니다.\n\n이 메세지는 ${modal.time}초후에 사라집니다.`}

            <ModalButton
              style={{ width: '100%' }}
              onClick={() => {
                setContent(['경기장 목록 조회', <AdminGroundList />]);
                setModal(null);
              }}
            >
              목록으로 돌아가기
            </ModalButton>
          </ModalDiv>
        </ModalWrapper>
        <TitleRow style={{ borderTop: 'none' }}>필수 정보</TitleRow>
        <Row>
          <Text>경기장 이름</Text>

          <Div>
            <StyledP> {ground.groundName} </StyledP>
          </Div>
        </Row>
        <Row>
          <Text>결제 포인트</Text>

          <Div>
            <StyledP>
              {ground.paymentPoint && ground.paymentPoint.toLocaleString()}
            </StyledP>
          </Div>
        </Row>
        <Row>
          <Text>경기장 주소</Text>

          <Div>
            <StyledP>
              {postCode[0] || ''}
              {postCode[1] || ''}
            </StyledP>
          </Div>
        </Row>
        <Row>
          <Text />

          <Div>
            <StyledP> {ground.groundAddress&&ground.groundAddress.address2} </StyledP>
          </Div>
        </Row>

        <TitleRow>경기장 이미지</TitleRow>

        <Row>
          <ImgBoxContainers>
            <ImgBox>
              {ground.groundImg &&
                ground.groundImg.map((e, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Img
                    key={i}
                    src={e}
                    alt={`img${i}`}
                    onClick={handleClickImage}
                  />
                ))}
            </ImgBox>
          </ImgBoxContainers>
        </Row>

        <TitleRow>경기장 정보</TitleRow>
        <Row>
          <Text>경기장 크기</Text>
          <Div>
            <StyledP>{ground.groundSize}</StyledP>
          </Div>
        </Row>
        <Row>
          <Text>기타정보</Text>
          <Div>
            <StyledP>샤워실사용 {ground.showerPlace ? `O` : `X`}</StyledP>
            <StyledP>무료주차 {ground.parking ? `O` : `X`}</StyledP>
            <StyledP>운동복대여 {ground.sportswearRental ? `O` : `X`}</StyledP>
            <StyledP>풋살화대여 {ground.shoesRental ? `O` : `X`}</StyledP>
          </Div>
        </Row>

        <TitleRow>경기장 특이사항</TitleRow>

        <Row>
          <Text>풋살장 가는 길</Text>
          <Div>
            <StyledP>{ground.wayTo}</StyledP>
          </Div>
        </Row>

        <Row>
          <Text>주차장</Text>
          <Div>
            <StyledP>{ground.parkingInfo}</StyledP>
          </Div>
        </Row>

        <Row>
          <Text>흡연</Text>
          <Div>
            <StyledP>{ground.smoking}</StyledP>
          </Div>
        </Row>

        <Row>
          <Text>풋살화대여</Text>
          <Div>
            <StyledP>{ground.shoesRentallInfo}</StyledP>
          </Div>
        </Row>

        <Row>
          <Text>화장실</Text>
          <Div>
            <StyledP>{ground.toilet}</StyledP>
          </Div>
        </Row>

        <Row>
          <Text>기타</Text>

          <Div style={{ flexDirection: 'column' }}>
            {actInfo && actInfo.map((e, i) => <StyledP key={i}>{e}</StyledP>)}
          </Div>
        </Row>

        <Row>
          <Text>시작/종료시간</Text>
          <Div>
            <StyledP style={{ width: 'auto', whiteSpace: 'nowrap' }}>
              {ground.startTime} 부터
            </StyledP>
            <StyledP>{ground.endTime} 까지</StyledP>
          </Div>
        </Row>

        <Row style={{ justifyContent: 'center' }}>
          <ButtonWrap>
            <Button
              type='button'
              onClick={() => {
                setContent(['경기장 목록 조회', <AdminGroundList />]);
              }}
            >
              목록으로
            </Button>
            <Button type='button' onClick={handleEdit}>
              수정하기
            </Button>
            <Button type='button' onClick={handleDelete}>
              삭제하기
            </Button>
          </ButtonWrap>
        </Row>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  margin-bottom: 50px;
  font-size: 18px;
  letter-spacing: -1px;
  gap: 5px;
`;

const TitleRow = styled.div`
  font-weight: 600;
  padding: 10px;
  margin-top: 20px;
  border-bottom: 1px solid #919191;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: flex-start;
`;

const Text = styled.div`
  display: flex;
  align-self: center;
  padding: 0 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 450px;
`;

const StyledP = styled.p`
  display: flex;
  width: ${(props) => props.width || '100%'};
  padding: 5px;
  font-size: 18px;
`;
const ButtonWrap = styled.div`
  display: flex;
  width:100%
  flex-direction: row;
  padding:50px 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -1px;
  align-items: center;
  background-color:;
`;

const Button = styled.button`
  display: flex;
  padding: 10px;
  margin: 0 10px;
  border-radius: 5px;
  background: #3563e9;
  color: white;
  font-size: 20px;
  font-weight: 400;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const ImgBoxContainers = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
`;

const ImgBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Img = styled.img`
  display: flex;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal || props.modalImage ? 'flex' : 'none')}};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -2px;
  justify-content: center;
  align-items: center;
`;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal.success ? 'flex' : 'none')}};
  flex-direction: column;
  position:absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 300px;
  margin-left: -200px;
  margin-top: -150px;
  padding: 30px 10px;
  border: solid 10px #3563e9;
  border-radius: 5px;
  background-color:#fff;
  font-size:24px;
  text-align: center;
  white-space: pre-wrap;
`;

const ModalImage = styled.img`
  display: ${(props) => (props.modalImage ? 'flex' : 'none')}};
  max-width: 80%;
  max-height: 80%;
  user-select: none;
`;

const ModalButton = styled.button`
  width: 80px;
  height: 50px;
  padding: 5px 10px;
  margin-top: 20px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  text-align: center;
  font-size: 25px;
`;

export default AdminGroundInfo;
