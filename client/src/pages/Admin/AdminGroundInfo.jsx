// 관리자페이지 메뉴4 경기장 상세조회 구현 AdminGroundInfo

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { useForm } from 'react-hook-form';
import { adminContentState } from 'stores/adminUserStore';
import { useRecoilState } from 'recoil';
import * as Api from 'api/api';
// eslint-disable-next-line import/no-cycle
import AdminGroundList from './AdminGroundList';
// eslint-disable-next-line import/no-cycle
import AdminGroundEdit from './AdminGroundEdit';

const AdminGroundInfo = ({ groundId }) => {
  const [ground, setGround] = useState(null);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  // const { register, handleSubmit } = useForm();
  // const [StyledPPointValue, setStyledPPointValue] = useState(null);
  // const [postCode, setPostCode] = useState([]);
  // 업로드 된 이미지 주소를 배열로 저장하여 화면에보여주고 경기장 생성시 주소를 전송
  // const [uplodedImgsSrc, setUplodedImgsSrc] = useState(null);
  // const [uplodedImgsSrcArray, setUplodedImgsSrcArray] = useState([]);

  const getGround = async () => {
    // 경기장조회 api요청
    try {
      const result = await Api.get(`grounds/${groundId}`);
      const resultData = result.data;
      setGround(resultData);
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
          onClick={() => {
            if (modal && modal.success) {
              setContent(['경기장 목록 조회', <AdminGroundList />]);
              setModal(null);
            }
            setModal(null);
          }}
        >
          <ModalDiv>
            {modal &&
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
        <TitleRow style={{ borderTop: 'none' }}>필수 입력 정보</TitleRow>
        <Row>
          <Text>경기장 이름</Text>

          <Div>
            <StyledP> {ground.groundName} </StyledP>
          </Div>
        </Row>
        <Row>
          <Text>결제 포인트</Text>

          <Div>
            <StyledP> {ground.paymentPoint.toLocaleString()} </StyledP>
          </Div>
        </Row>
        <Row>
          <Text>경기장 주소</Text>

          <Div>
            <StyledP>
              ({ground.groundAddress.postalCode}){ground.groundAddress.address1}
            </StyledP>
          </Div>
        </Row>
        <Row>
          <Text />

          <Div>
            <StyledP> {ground.groundAddress.address2} </StyledP>
          </Div>
        </Row>

        <TitleRow>선택 입력 정보</TitleRow>
        <Row>
          <Text>경기장 크기</Text>

          <Div>
            <StyledP>{ground.groundSize}</StyledP>
          </Div>
        </Row>
        <Row>
          <Text>구장 이미지</Text>

          {/* <FileContainers> */}
          <Div>
            <ImgBoxContainers>
              <ImgBox>
                {ground.groundImg.map((e, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Img key={i} src={e} alt={`img${i}`} />
                ))}
              </ImgBox>
            </ImgBoxContainers>
          </Div>
          {/* </FileContainers> */}
        </Row>

        <TitleRow>기타사항</TitleRow>
        <Row>
          <StyledP>샤워실사용 - {ground.showerPlace ? `가능` : `불가`}</StyledP>
          <StyledP>무료주차 - {ground.parking ? `가능` : `불가`}</StyledP>
          <StyledP>
            운동복대여 - {ground.sportswearRental ? `가능` : `불가`}
          </StyledP>
          <StyledP>풋살화대여 - {ground.shoesRental ? `가능` : `불가`}</StyledP>
        </Row>

        <TitleRow>구장 특이사항</TitleRow>
        <Row>
          <Text>풋살장 가는 길</Text>

          <Div>
            <StyledP>{ground.wayTo}</StyledP>
          </Div>
        </Row>
        <Row>
          <Text>주차장 위치 안내</Text>

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
          <Text>화장실</Text>

          <Div>
            <StyledP>{ground.toilet}</StyledP>
          </Div>
        </Row>
        <Row>
          <Text>신발대여정보</Text>

          <Div>
            <StyledP>{ground.shoesRentallInfo}</StyledP>
          </Div>
        </Row>
        <Row>
          <Text>기타정보</Text>

          <Div style={{ flexDirection: 'column' }}>
            {ground.actInfo.map((e, i) => (
              <StyledP key={i}>{e}</StyledP>
            ))}
          </Div>
        </Row>
        {/* <Row style={{ borderBottom: '1px solid #919191' }}> */}
        <Row>
          <Text>시작/종료시간</Text>

          <Div>
            <StyledP style={{ width: 'auto', whiteSpace: 'nowrap' }}>
              {ground.startTime.replace(/^(\d{2,2})(\d{2,2})$/, `$1:$2`)}
              부터
            </StyledP>
            <StyledP>
              {ground.endTime.replace(/^(\d{2,2})(\d{2,2})$/, `$1:$2`)} 까지
            </StyledP>
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
  margin-top: 50px;
  font-size: 18px;
  letter-spacing: -1px;
  gap: 5px;
  // border: 1px solid #919191;
`;

const TitleRow = styled.div`
  // position: absolute;
  font-weight: 600;
  padding: 10px;
  // border-top: 1px solid #919191;
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
  // margin: 0 10px;
  // justify-content: space-between;
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
  padding: 5px;
  margin: 0 10px;
  border-radius: 5px;
  background: #3563e9;
  color: white;
  font-size: 25px;
  font-weight: 400;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const ImgBoxContainers = styled.div`
  display: flex;
  // width: 270px;
`;

const ImgBox = styled.div`
  display: flex;
  width: 450px;
  flex-wrap: wrap;
`;

const Img = styled.img`
  display: flex;
  width: 89px;
  height: 89px;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
  position: fixed;
  z-index: 1000;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -2px;
  align-content: center;
  `;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')}};
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
