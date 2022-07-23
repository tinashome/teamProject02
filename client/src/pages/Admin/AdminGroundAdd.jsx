// 관리자페이지본문 메뉴2 경기장 추가 구현 AdminGroundAdd
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import { useForm } from 'react-hook-form';
import * as Api from 'api/api';
import imgbox from '../../assets/image/imgbox.png';
import Postcode from './PostCode';
import AdminGroundList from './AdminGroundList';

const AdminGroundAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: 'onChange' });

  const fileInput = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  const [postCode, setPostCode] = useState([]);
  const [inputPointValue, setInputPointValue] = useState(null);
  const [findAddressRequired, setFindAddressRequired] = useState(false);
  // 업로드 된 이미지 주소를 배열로 저장하여 화면에보여주고 경기장 생성시 주소를 전송
  const [uplodedImgsSrc, setUplodedImgsSrc] = useState(null);
  const [uplodedImgsSrcArray, setUplodedImgsSrcArray] = useState([]);
  const [actInfoRows, setActInfoRows] = useState(1);
  const [times, setTimes] = useState({ startTime: '07:00', endTime: '22:00' });
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState(null);

  // 포인트 값이 입력되면 유효성 검사후 형식지정
  const validatePoint = (e) => {
    const { value } = e.target;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    if (/^[0-9]+$/.test(removedCommaValue)) {
      setInputPointValue(removedCommaValue.toLocaleString());
    }
  };

  // add버튼 fileinput연결
  const handleAddClick = () => {
    fileInput.current.click();
  };

  // 이미지를 이미지서버에 업로드 후 주소값 반환
  const postImg = async (file) => {
    const formdata = new FormData();
    formdata.append('image', file);

    try {
      const result = await Api.postImg('upload/imageUpload', formdata);
      const resultImageUrl = result.data.imageUrl;
      setUplodedImgsSrc(resultImageUrl);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  // 이미지 파일불러오면 실행되는 함수
  // 이미지서버에 저장하여 받은 주소를 배열로 저장
  const getImgSrcArray = async (e) => {
    const { files } = e.target;
    const filesArray = Array.from(files);
    filesArray.map((el) => postImg(el));
  };

  // 이미지업로드시 결과값 주소를 하나씩 uplodedImgsSrcArray 상태배열에 추가
  useEffect(() => {
    if (uplodedImgsSrc)
      setUplodedImgsSrcArray([...uplodedImgsSrcArray, uplodedImgsSrc]);
    setUplodedImgsSrc(null);
  }, [uplodedImgsSrc]);

  // 기타정보 세로길이 지정용 함수
  const handleActInfo = (e) => {
    const rows = e.target.value.split('\n').length;
    setActInfoRows(rows + 2);
  };

  const hadleTimes = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setTimes({ ...times, [name]: value });
  };

  // 경기장 등록하기클릭시 checkPostCode 으로 postCode의 값이 있는지(우편번호찾기를 했는지)
  // 확인후 onSubmit 실행
  const onSubmit = async (data) => {
    const actInfoArray = data.actInfo.trim().split('\n');
    const newGroundData = {
      ...data,
      paymentPoint:
        inputPointValue.length > 3
          ? inputPointValue.replaceAll(',', '')
          : inputPointValue,
      groundAddress: {
        postalCode: postCode ? postCode[0] : data.postalCode,
        address1: postCode ? postCode[1] : data.address1,
        address2: data.groundAddress.address2,
      },
      groundImg: uplodedImgsSrcArray,
      actInfo: actInfoArray,
    };

    try {
      const result = await Api.post(`grounds`, newGroundData);
      setModal({ success: true, ...result.data });
      setInputPointValue(0);
      setActInfoRows(1);
      setUplodedImgsSrcArray([]);
      setPostCode([]);
      setTimes({ startTime: '07:00', endTime: '22:00' });
      reset();
    } catch (err) {
      setModal({ success: false, ...newGroundData });
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const checkPostCode = (data) => {
    if (postCode[0]) {
      console.log(data);
      onSubmit(data);
    } else {
      setFindAddressRequired(true);
    }
  };

  const goGroundList = () => {
    setModal(null);
    setContent(['경기장 목록 조회', <AdminGroundList />]);
  };

  return (
    <>
      <ModalWrapper modal={modal} onClick={goGroundList}>
        <ModalDiv modal={modal}>
          {modal &&
            `
            등록결과	:  ${modal.success ? '성공' : '실패'}
            경기장명	:  ${modal.groundName}
            포 인 트	:  ${modal.paymentPoint.toLocaleString()}
            우편번호	:  ${modal.groundAddress.postalCode}
            주   소1	:  ${modal.groundAddress.address1}
            주   소2	:  ${modal.groundAddress.address2}
            구장크기	:  ${modal.groundSize}
            이 미 지	:  ${modal.groundImg && modal.groundImg.length}개 업로드
            샤 워 장	:  ${modal.showerPlace}
            주 차 장	:  ${modal.parking}
            옷 대 여	:  ${modal.shoesRental}
            신발대여	:  ${modal.sportswearRental}
            가 는 길	:  ${modal.wayTo}
            주차여부	:  ${modal.parkingInfo}
            흡연여부	:  ${modal.smoking}
            화 장 실	:  ${modal.toilet}
            신발정보	:  ${modal.shoesRentallInfo}
            기타정보	:  ${modal.actInfo && modal.actInfo[0]}
            시작시간	:  ${modal.startTime}
            종료시간	:  ${modal.endTime}`}
          <ModalButton onClick={goGroundList}>닫기</ModalButton>
        </ModalDiv>
      </ModalWrapper>
      <form onSubmit={handleSubmit(checkPostCode)}>
        <Wrapper>
          <TitleRow>필수 입력 정보</TitleRow>

          <Row>
            <TextContainers>
              <Text>경기장 이름</Text>
              <TextRed>*</TextRed>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('groundName', { required: true, maxLength: 10 })}
                placeholder='필수입력 정보입니다.'
              />
              <InputError>
                {errors.groundName && '10자 이하로 입력해 주세요.'}
              </InputError>
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
                value={inputPointValue || ' '}
                placeholder='필수입력 정보입니다.'
                onChange={validatePoint}
              />
              <InputError>
                {errors.paymentPoint && '숫자만 입력해주세요.'}
              </InputError>
            </InputContainers>
          </Row>

          <Row>
            <TextContainers>
              <Text>경기장 주소</Text>
              <TextRed>*</TextRed>
            </TextContainers>
            <InputContainers>
              <Input
                {...register('groundAddress.postalCode')}
                value={postCode[0] || ' '}
                placeholder='우편번호'
              />
              <Postcode
                setPostCode={setPostCode}
                setFindAddressRequired={setFindAddressRequired}
              />
            </InputContainers>
          </Row>

          <Row>
            <InputContainers>
              <Input
                {...register('groundAddress.address1')}
                value={postCode[1] || ' '}
                placeholder='필수입력 정보입니다.'
              />
            </InputContainers>
            {findAddressRequired && (
              <InputError>주소 찾기를 실행해주세요.</InputError>
            )}
          </Row>

          <Row>
            <TextContainers>
              <Text>상세 주소</Text>
            </TextContainers>
            <InputContainers>
              <Input {...register('groundAddress.address2')} />
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
              <Input {...register('groundSize')} />
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
              />
              <ImgBoxContainers>
                <ImgBox>
                  {uplodedImgsSrcArray.map((e, i) => (
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
            <Label>
              <Checkbox type='checkbox' {...register('showerPlace')} />
              샤워실
            </Label>
            <Label>
              <Checkbox type='checkbox' {...register('parking')} />
              주차장
            </Label>
            <Label>
              <Checkbox type='checkbox' {...register('shoesRental')} />
              운동복대여
            </Label>
            <Label>
              <Checkbox type='checkbox' {...register('sportswearRental')} />
              풋살화대여
            </Label>
          </Row>
        </Wrapper>
        <Wrapper>
          <TitleRow>구장 특이사항</TitleRow>
          <Row>
            <TextContainers>
              <Text>풋살장 가는 길</Text>
            </TextContainers>
            <InputContainers>
              <Input {...register('wayTo')} />
            </InputContainers>
          </Row>

          <Row>
            <TextContainers>
              <Text>주차장 위치 안내</Text>
            </TextContainers>
            <InputContainers>
              <Input {...register('parkingInfo')} />
            </InputContainers>
          </Row>

          <Row>
            <TextContainers>
              <Text>흡연</Text>
            </TextContainers>
            <InputContainers>
              <Input {...register('smoking')} />
            </InputContainers>
          </Row>

          <Row>
            <TextContainers>
              <Text>화장실</Text>
            </TextContainers>
            <InputContainers>
              <Input {...register('toilet')} />
            </InputContainers>
          </Row>

          <Row>
            <TextContainers>
              <Text>신발대여정보</Text>
            </TextContainers>
            <InputContainers>
              <Input {...register('shoesRentallInfo')} />
            </InputContainers>
          </Row>

          <Row style={{ alignItems: 'flex-start' }}>
            <TextContainers>
              <Text style={{ paddingTop: '10px' }}>기타정보</Text>
            </TextContainers>
            <InputContainers>
              <Textarea
                {...register('actInfo')}
                onChange={handleActInfo}
                lines={actInfoRows}
              />
            </InputContainers>
          </Row>

          <Row>
            <TextContainers>
              <Text>시작/종료시간</Text>
            </TextContainers>
            <InputContainers style={{ justifyContent: 'flex-start' }}>
              <Input
                style={{ marginRight: '10px' }}
                {...register('startTime')}
                type='time'
                name='startTime'
                min='07:00'
                max='22:00'
                step='3600'
                value={times.startTime}
                onChange={hadleTimes}
              />
              <Input
                {...register('endTime')}
                type='time'
                name='endTime'
                min='07:00'
                max='22:00'
                step='3600'
                value={times.endTime}
                onChange={hadleTimes}
              />
            </InputContainers>
          </Row>

          <Row style={{ justifyContent: 'center' }}>
            <Button type='button' onClick={goGroundList}>
              목록으로
            </Button>
            <Button type='submit'>등록하기</Button>
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
  gap: 10px;
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
  justify-content: flex-end;
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

const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: ${(props) => Math.max(props.lines, 3) * 24}px;
  padding: 20px 5px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 20px;
  line-height: 1.2;
  overflow: visible;
  white-space: pre;
  resize: none;
`;

const InputError = styled.div`
  display: flex;
  position: absolute;
  margin: 0 10px;
  text-align: center;
  font-size: 16px;
  color: #dc5d5d;
  z-index: 111;
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
  margin: auto 10px;
  accent-color: #3563e9;
`;

const Label = styled.label`
  display: flex;
  margin: auto 10px;
  padding-bottom: 5px;
  font-size: 20px;
  user-select: none;
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

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
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
  align-content: center;
`;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 600px;
  margin-left: -250px;
  margin-top: -400px;
  padding: 30px 10px;
  border: solid 10px #3563e9;
  border-radius: 5px;
  background-color: #fff;
  font-size: 24px;
  justify-content: center;
  align-items: center;
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

export default AdminGroundAdd;
