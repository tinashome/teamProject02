// 관리자페이지 메뉴4 경기장 상세조회 구현 AdminGroundInfo

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import * as Api from 'api/api';
// eslint-disable-next-line import/no-cycle
import AdminGroundList from './AdminGroundList';
// eslint-disable-next-line import/no-cycle
import AdminGroundEdit from './AdminGroundEdit';

const AdminGroundInfo = ({ groundId }) => {
  // eslint-disable-next-line no-unused-vars
  const setContent = useSetRecoilState(adminContentState);
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
          <ModalInputContainer modal={modal}>
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
          </ModalInputContainer>
        </ModalWrapper>

        <PageWrapper>
          <Wrapper>
            <TitleRow>필수 정보</TitleRow>
            <Row>
              <TextContainer>
                <Text>경기장 이름</Text>
              </TextContainer>
              <InputContainer>
                <Text> {ground.groundName} </Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>결제 포인트</Text>
              </TextContainer>

              <InputContainer>
                <Text>
                  {ground.paymentPoint && ground.paymentPoint.toLocaleString()}
                </Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>경기장 주소</Text>
              </TextContainer>
              <InputContainer>
                <Text>
                  ({postCode[0] || ''}){postCode[1] || ''}
                </Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer />
              <InputContainer>
                <Text>
                  {ground.groundAddress && ground.groundAddress.address2}{' '}
                </Text>
              </InputContainer>
            </Row>
          </Wrapper>

          <Wrapper>
            <TitleRow>예약가능 시간</TitleRow>
            <Row>
              <TextContainer>
                <Text>시작/종료시간</Text>
              </TextContainer>
              <InputContainer>
                <Text style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                  {ground.startTime} 부터
                </Text>
                <Text>{ground.endTime} 까지</Text>
              </InputContainer>
            </Row>

            <TitleRow>경기장 정보</TitleRow>
            <Row>
              <TextContainer>
                <Text>경기장 크기</Text>
              </TextContainer>
              <InputContainer>
                <Text>{ground.groundSize}</Text>
              </InputContainer>
            </Row>
            <Row>
              <TextContainer>
                <Text>기타정보</Text>
              </TextContainer>
              <ChechkboxContainer>
                <Label>
                  <Text>샤워실 {ground.showerPlace ? `O` : `X`}</Text>
                </Label>
                <Label>
                  <Text>무료주차 {ground.parking ? `O` : `X`}</Text>
                </Label>
              </ChechkboxContainer>
            </Row>
            <Row>
              <TextContainer>
                <Text />
              </TextContainer>
              <ChechkboxContainer>
                <Label>
                  <Text>운동복대여 {ground.sportswearRental ? `O` : `X`}</Text>
                </Label>
                <Label>
                  <Text>풋살화대여 {ground.shoesRental ? `O` : `X`}</Text>
                </Label>
              </ChechkboxContainer>
            </Row>
          </Wrapper>
        </PageWrapper>

        <PageWrapper>
          <Wrapper>
            <TitleRow>경기장 특이사항</TitleRow>

            <Row>
              <TextContainer>
                <Text>풋살장 가는 길</Text>
              </TextContainer>
              <InputContainer>
                <Text>{ground.wayTo}</Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>주차장</Text>
              </TextContainer>
              <InputContainer>
                <Text>{ground.parkingInfo}</Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>흡연</Text>
              </TextContainer>
              <InputContainer>
                <Text>{ground.smoking}</Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>풋살화대여</Text>
              </TextContainer>
              <InputContainer>
                <Text>{ground.shoesRentallInfo}</Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>화장실</Text>
              </TextContainer>
              <InputContainer>
                <Text>{ground.toilet}</Text>
              </InputContainer>
            </Row>

            <Row>
              <TextContainer>
                <Text>기타</Text>
              </TextContainer>

              <InputContainer style={{ flexDirection: 'column' }}>
                {actInfo && actInfo.map((e, i) => <Text key={i}>{e}</Text>)}
              </InputContainer>
            </Row>
          </Wrapper>

          <Wrapper>
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
          </Wrapper>
        </PageWrapper>

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
const PageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 20px 40px;
  font-size: 14px;
  letter-spacing: -1px;
  gap: 10px;
`;

const TitleRow = styled.div`
  display: flex;
  height: 30px;
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #adb5bd;
  align-items: flex-end;
`;

const Row = styled.div`
  display: flex;
`;

const Text = styled.p`
  display: flex;
  // align-self: center;
  white-space: wrap;
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
  padding: 5px 20px;
  margin: 30px 20px;
  border-radius: 5px;
  background: #3563e9;
  color: white;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const ImgBoxContainers = styled.div`
  display: flex;
  position: relative;
  width: 300px;
  height: 115px;
  overflow-y: hidden;
  background-image: url(${(props) => props.imgbox});
  background-size: 100px;
  background-repeat: no-repeat;
  gap: 5px;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 100;
`;

const Img = styled.img`
  display: flex;
  width: 100px;
  height: 100px;
  cursor: pointer;
  object-fit: cover;
  user-select: none;
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

const ModalInputContainer = styled.div`
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

const TextContainer = styled.div`
  display: flex;
  width: 100px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: flex-start;
`;

const ChechkboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  width: 100px;
  padding: 5px;
  user-select: none;
`;
export default AdminGroundInfo;
