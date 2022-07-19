/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as Api from 'api/api';
import ModalWrapper from 'components/atoms/AdminModalWrapper';
import ModalButton from 'components/atoms/AdminModalButton';
import Postcode from './PostCode';
import imgbox from '../../assets/image/imgbox.png';

const AdminAddGround = () => {
  const { register, handleSubmit } = useForm();
  const [inputPointValue, setInputPointValue] = useState(0);
  const [postCode, setPostCode] = useState([]);
  // 업로드 된 이미지 주소를 배열로 저장하여 화면에보여주고 경기장 생성시 주소를 전송
  const [uplodedImgsSrc, setUplodedImgsSrc] = useState(null);
  const [uplodedImgsSrcArray, setUplodedImgsSrcArray] = useState([]);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');
  const fileInput = useRef(null);

  // 포인트 값이 입력되면 ,로 포맷팅
  const changeEnteredNum = (e) => {
    const { value } = e.target;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    setInputPointValue(removedCommaValue.toLocaleString());
  };

  // add버튼 fileinput연결
  const handleAddClick = () => {
    fileInput.current.click();
  };

  // 이미지를 이미지서버에 업로드 후 주소값 반환
  // 배열주소를 하나씩 서버로보냄
  // 결과값을 하나씩 uplodedImgsSrcArray 상태배열에 추가
  const postImg = async (file) => {
    const formdata = new FormData();
    formdata.append('image', file);
    try {
      const result = await Api.postImg('upload/imageUpload', formdata);
      const resultImageUrl = result.data.imageUrl;
      setUplodedImgsSrc(resultImageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (uplodedImgsSrc)
      setUplodedImgsSrcArray([...uplodedImgsSrcArray, uplodedImgsSrc]);
  }, [uplodedImgsSrc]);

  // 파일불러오면 실행되는 함수
  // 이미지서버에 저장하여 받은 주소를 배열로 저장
  const getImgSrcArray = async (e) => {
    const { files } = e.target;
    const filesArray = Array.from(files);
    console.log(filesArray);
    filesArray.map((el) => postImg(el));
  };

  // 등록하기실행
  const onSubmit = async (data) => {
    const {
      groundName,
      paymentPoint,
      groundImg = uplodedImgsSrcArray,
      postalCode,
      address1,
      address2,
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
      shoesRentallInfo,
      actInfo,
      startTime = data.startTime.replace(':'),
      endTime = data.endTime.replace(':'),
    } = data;
    const newGroundData = {
      groundName,
      paymentPoint,
      groundImg,
      groundAddress: { postalCode, address1, address2 },
      groundSize,
      showerPlace,
      parking,
      shoesRental,
      sportswearRental,
      wayTo,
      parkingInfo,
      smoking,
      toilet,
      shoesRentallInfo,
      actInfo,
      startTime,
      endTime,
    };

    try {
      const result = await Api.post(`grounds`, newGroundData);
      setModal({ success: true, ...newGroundData });
      setModal({ success: true, ...result.data });
      // console.log(result.data, groundImg);
    } catch (err) {
      setModal({ success: false, ...newGroundData });
      console.log(err);
    }
  };

  // 테스트용 데이터
  // eslint-disable-next-line no-unused-vars
  const testData = [
    'test경기장명',
    100000,
    'test우편번호',
    'test주소1',
    'test주소2',
    'test경기장크기',
    [],
    true,
    true,
    true,
    true,
    'test가는길',
    'test주차여부',
    'test연여부',
    'test화장실',
    'test신발대여정보',
    'test기타정보',
    '0700',
    '2200',
  ];

  return (
    <>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal('');
        }}
      >
        <ModalDiv>
          {`
            등록결과	${modal.success ? '성공' : '실패'}
            경기장명	${modal.groundName}
            포 인 트	${modal.paymentPoint}
            주    소	
            ${!modal.groundAddress ? '없음' : '있음'}
            구장크기	${modal.groundSize}
            이 미 지	${modal.groundImg && modal.groundImg.length}개 업로드
            샤 워 장	${modal.showerPlace}
            주 차 장	${modal.parking}
            옷 대 여	${modal.shoesRental}
            신발대여	${modal.sportswearRental}
            가 는 길	${modal.wayTo}
            주차여부	${modal.parkingInfo}
            흡연여부	${modal.smoking}
            화 장 실	${modal.toilet}
            신발정보	${modal.shoesRentallInfo}
            기타정보	${modal.actInfo}
            시작시간	${modal.startTime}
            종료시간	${modal.endTime}`}
          <ModalButton
            onClick={() => {
              setModal('');
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <TitleRow>필수 입력 정보</TitleRow>
          <Row>
            <TextContainers>
              <Text>경기장 이름</Text>
              <TextRed>*</TextRed>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('groundName', { required: true })}
                placeholder='필수입력 정보입니다.'
                // value={testData[0]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>결제 포인트</Text>
              <TextRed>*</TextRed>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('paymentPoint', { required: true })}
                onChange={changeEnteredNum}
                value={inputPointValue}
                placeholder='필수입력 정보입니다.'
                // value={inputPointValue || testData[1]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>경기장 주소</Text>
              <TextRed>*</TextRed>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('postalCode', { required: true })}
                value={postCode[0]}
                // value={postCode[0] || testData[2]}
              />
              <Postcode postCode={postCode} setPostCode={setPostCode} />
            </InputContainers>
          </Row>
          <Row>
            <InputContainers>
              <Input
                {...register('address1', { required: true })}
                value={postCode[1]}
                placeholder='필수입력 정보입니다.'
                // value={postCode[1] || testData[3]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>상세 주소</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('address2')}
                // value={testData[4]}
              />
            </InputContainers>
          </Row>
        </Wrapper>
        <Wrapper>
          <TitleRow>선택 입력 정보</TitleRow>
          <Row>
            <TextContainers>
              <Text>경기장 크기</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('groundSize')}
                // value={testData[5]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>구장 이미지</Text>
            </TextContainers>
            <InputFileContainers>
              <Input
                type='file'
                style={{ display: 'none' }}
                multiple
                accept='image/*'
                {...register('groundImg')}
                ref={fileInput}
                onChange={getImgSrcArray}
                // value={testData[6]}
              />
              <ImgBoxContainers>
                <ImgBox>
                  {uplodedImgsSrcArray.map((e, i) => (
                    // <LoadedImage e={e} i={i} />
                    // eslint-disable-next-line react/no-array-index-key
                    <Img key={i} src={e} alt={`img${i}`} />
                  ))}
                </ImgBox>
                <ImgBoxBack>
                  <Img src={imgbox} alt='imgbox' />
                  <Img src={imgbox} alt='imgbox' />
                  <Img src={imgbox} alt='imgbox' />
                </ImgBoxBack>
              </ImgBoxContainers>
              <AddButtonWrap>
                <AddButton onClick={handleAddClick} type='button'>
                  +
                </AddButton>
                <Text
                  onClick={() => {
                    setUplodedImgsSrcArray([]);
                  }}
                >
                  업로드취소
                </Text>
              </AddButtonWrap>
            </InputFileContainers>
          </Row>
        </Wrapper>
        <Wrapper>
          <TitleRow>기타사항</TitleRow>
          <Row>
            <Checkbox
              type='checkbox'
              name='showerPlace'
              {...register('showerPlace')}
              // checked={testData[7]}
            />
            <Label htmlFor='showerPlace'>샤워실</Label>
            <Checkbox
              type='checkbox'
              name='parking'
              {...register('parking')}
              // checked={testData[8]}
            />
            <Label htmlFor='parking'>주차장</Label>
            <Checkbox
              type='checkbox'
              name='shoesRental'
              {...register('shoesRental')}
              // checked={testData[9]}
            />
            <Label htmlFor='shoesRental'>운동복대여</Label>
            <Checkbox
              type='checkbox'
              name='sportswearRental'
              {...register('sportswearRental')}
              // checked={testData[10]}
            />
            <Label htmlFor='sportswearRental'>풋살화대여</Label>
          </Row>
        </Wrapper>
        <Wrapper>
          <TitleRow>구장 특이사항</TitleRow>
          <Row>
            <TextContainers>
              <Text>풋살장 가는 길</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('wayTo')}
                // value={testData[11]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>주차장 위치 안내</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('parkingInfo')}
                // value={testData[12]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>흡연</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('smoking')}
                // value={testData[13]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>화장실</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('toilet')}
                // value={testData[14]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>신발대여정보</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('shoesRentallInfo')}
                // value={testData[15]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>기타정보</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('actInfo')}
                // value={testData[16]}
              />
            </InputContainers>
          </Row>
          <Row>
            <TextContainers>
              <Text>시작/종료시간</Text>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('startTime')}
                // value={testData[17]}
                value='07:00'
                type='time'
                min='07:00:00'
                max='22:00:00'
              />
              <Text>ㅤ</Text>
              <Input
                {...register('endTime')}
                // value={testData[18]}
                value='22:00'
                type='time'
                min='07:00:00'
                max='22:00:00'
              />
            </InputContainers>
          </Row>
          <Row>
            <Button type='submit'>등록하기</Button>
            <Button>뒤로가기</Button>
          </Row>
        </Wrapper>
      </form>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  margin-bottom: 50px;
  font-size: 24px;
  letter-spacing: -1px;
  gap: 15px;
`;

const TitleRow = styled.div`
  padding: 10px 30px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;
const TextContainers = styled.div`
  display: flex;
  width: 200px;
  margin: 0 10px;
  justify-content: flex-end;
`;

const Text = styled.p`
  display: flex;
  align-self: center;
`;

const TextRed = styled.p`
  display: flex;
  width: 7px;
  color: #dc5d5d;
  font-weight: 600;
`;
const InputContainers = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin: 0 10px;
  justify-content: space-between;
`;

const Input = styled.input`
  display: flex;
  width: ${(props) => props.width || '100%'};
  height: 45px;
  padding: 10px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 20px;
`;
const AddButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -1px;
  align-items: center;
`;

const AddButton = styled.button`
  display: flex;
  width: 50px;
  height: 45px;
  padding-bottom: 5px;
  margin: 8px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 40px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  padding: 5px 20px 10px 20px;
  margin: 80px 20px 50px 20px;
  border-radius: 5px;
  background: #3563e9;
  color: white;
  font-size: 35px;
  font-weight: 400;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const Checkbox = styled.input`
  display: flex;
  width: 24px;
  height: 24px;
  margin: auto 0 auto 10px;
`;

const Label = styled.label`
  display: flex;
  margin: auto 10px;
  padding-bottom: 5px;
  font-size: 20px;
`;

const InputFileContainers = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin: 0 10px;
  justify-content: space-between;
`;

const ImgBoxContainers = styled.div`
  display: flex;
  width: 270px;
`;

const ImgBox = styled.div`
  display: flex;
  width: 270px;
  flex-wrap: wrap;
`;

const ImgBoxBack = styled(ImgBox)`
  position: absolute;
  z-index: -999;
`;

const Img = styled.img`
  display: flex;
  width: 89px;
  height: 89px;
`;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal === '' ? 'none' : 'flex')}};
  flex-direction: column;
  position:absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 600px;
  margin-left: -250px;
  margin-top: -400px;
  padding: 30px 10px;
  border: solid 10px #3563e9;
  border-radius: 5px;
  background-color:#fff;
  font-size:24px;
  justify-content: center;
  // text-align: right;
  align-items: center;
  white-space: pre-wrap;
`;

export default AdminAddGround;
