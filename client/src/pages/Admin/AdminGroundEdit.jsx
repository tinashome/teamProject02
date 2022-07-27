// 관리자페이지본문 메뉴5 경기장수정 구현 AdminGroundEdit

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { adminContentState, adminCurrentPage } from 'stores/adminUserStore';
import { adminGround } from 'stores/adminGroundStore';
import * as Api from 'api/api';
import { RiCloseLine } from '@react-icons/all-files/ri/RiCloseLine';
import Postcode from './PostCode';
import imgbox from '../../assets/image/inputFile.png';
// eslint-disable-next-line import/no-cycle
import AdminGroundList from './AdminGroundList';
// eslint-disable-next-line import/no-cycle
import GroundInfoModal from './GroundInfoModal';

const AdminGroundEdit = ({ groundId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: 'onChange' });
  const fileInput = useRef(null);
  // const [ground, setGround] = useState(null);
  const [ground, setGround] = useRecoilState(adminGround);
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  const [postCode, setPostCode] = useState([]);
  const [inputPointValue, setInputPointValue] = useState(null);
  const [inputPointRequired, setInputPointRequired] = useState(false);
  const [findAddressRequired, setFindAddressRequired] = useState(false);
  // 업로드 된 이미지 주소를 배열로 저장하여 화면에보여주고 경기장 생성시 주소를 전송
  const [uplodedImgsSrc, setUplodedImgsSrc] = useState(null);
  const [uplodedImgsSrcArray, setUplodedImgsSrcArray] = useState([]);
  const [actInfoRows, setActInfoRows] = useState(1);
  const [times, setTimes] = useState({ startTime: '07:00', endTime: '22:00' });
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [currentPage, setCurentPage] = useRecoilState(adminCurrentPage);

  const getGround = async () => {
    try {
      const result = await Api.get(`grounds/${groundId}`);
      const resultData = result.data;
      // setUplodedImgsSrcArray(resultData.groundImg);
      // setGroundImages(resultData.groundImg);
      setGround({
        ...resultData,
        paymentPoint: resultData.paymentPoint.toLocaleString(),
        actInfo: resultData.actInfo.join('\n'),
      });
      setActInfoRows(resultData.actInfo.length + 3);
      setInputPointValue(resultData.paymentPoint.toLocaleString());
      setPostCode([
        resultData.groundAddress.postalCode,
        resultData.groundAddress.address1,
      ]);
      setTimes({
        startTime: resultData.startTime,
        endTime: resultData.endTime,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  // 포인트 값이 입력되면 유효성 검사후 형식지정
  const validatePoint = (e) => {
    const { value } = e.target;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    if (/^[0-9]+$/.test(removedCommaValue)) {
      setInputPointValue(removedCommaValue.toLocaleString());
    }
  };

  useEffect(() => {
    getGround();
  }, []);

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

  const handleClickImage = (event) => {
    setModalImage({ image: true, url: event.target.src });
  };

  // 이미지업로드시 결과값 주소를 하나씩 uplodedImgsSrcArray 상태배열에 추가
  useEffect(() => {
    if (uplodedImgsSrc)
      setUplodedImgsSrcArray([...uplodedImgsSrcArray, uplodedImgsSrc]);
    setUplodedImgsSrc(null);
  }, [uplodedImgsSrc]);

  // 기타입력란 세로길이 지정용 함수
  const handleActInfo = (e) => {
    const rows = e.target.value.split('\n').length;
    setActInfoRows(rows + 2);
  };

  const hadleTimes = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setTimes({ ...times, [name]: value });
  };

  // 경기장 등록하기클릭시 checkPostCodeAndPoint 으로
  // postCode의 값이 있는지(우편번호찾기를 했는지)
  // inputPointValu의 값이 있는지(포인트를 입력했는지)
  // 확인후 onSubmit 실행
  const onSubmit = async (data) => {
    const actInfoArray = data.actInfo.trim().split('\n');
    const newGroundData = {
      ...ground,
      ...data,
      paymentPoint:
        inputPointValue && inputPointValue.length > 3
          ? inputPointValue.replaceAll(',', '')
          : inputPointValue,
      groundAddress: {
        postalCode: postCode ? postCode[0] : data.postalCode,
        address1: postCode ? postCode[1] : data.address1,
        address2: data.groundAddress.address2,
      },
      groundImg: [...ground.groundImg, ...uplodedImgsSrcArray],
      actInfo: actInfoArray,
    };
    try {
      const result = await Api.patch(`grounds/${groundId}`, newGroundData);
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

  const checkPostCodeAndPoint = (data) => {
    if (inputPointValue) {
      setInputPointRequired(false);
      if (postCode[0]) {
        setFindAddressRequired(false);
        onSubmit(data);
      } else {
        setFindAddressRequired(true);
      }
    } else {
      setInputPointRequired(true);
    }
  };

  const goGroundList = () => {
    setModal(null);
    setCurentPage(0);
    setContent(['경기장 목록 조회', <AdminGroundList />]);
  };

  return (
    ground && (
      <>
        {(modal || modalImage) && (
          <GroundInfoModal
            modal={modal}
            goGroundList={goGroundList}
            modalImage={modalImage}
            setModalImage={setModalImage}
          />
        )}

        <form onSubmit={handleSubmit(checkPostCodeAndPoint)}>
          <Wrapper>
            <TitleRow>필수 입력 정보</TitleRow>

            <Row>
              <TextContainers>
                <Text>경기장 이름</Text>
                <TextRed>*</TextRed>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('groundName', {
                    required: true,
                    mxLength: 10,
                    value: ground.groundName,
                  })}
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
                  {...register('paymentPoint', {
                    required: true,
                  })}
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
                <Input
                  {...register('groundAddress.address2', {
                    value: ground.groundAddress.address2,
                  })}
                />
              </InputContainers>
            </Row>
          </Wrapper>

          <Wrapper>
            <TitleRow>경기장 이미지</TitleRow>

            <AddButtonWrap style={{ height: '30px' }}>
              기존업로드된 이미지
            </AddButtonWrap>
            <Row>
              <ImgBoxContainers>
                <ImgBox>
                  {ground.groundImg !== 0 &&
                    ground.groundImg.map((e, i) => (
                      <ImgBox>
                        <CancelIcon
                          onClick={() => {
                            const arr = [...ground.groundImg];
                            arr.splice(i, 1);
                            setGround({ ...ground, groundImg: [...arr] });
                          }}
                        >
                          <CloseIcon />
                        </CancelIcon>
                        <Img
                          key={i}
                          src={e}
                          alt={`img${i}`}
                          onClick={handleClickImage}
                        />
                      </ImgBox>
                    ))}
                </ImgBox>
              </ImgBoxContainers>
            </Row>
          </Wrapper>

          <Wrapper>
            <AddButtonWrap>
              <CancelText
                onClick={() => {
                  setUplodedImgsSrcArray([]);
                }}
                style={{
                  position: 'relative',
                  marginTop: '10px',
                  color: '#000',
                }}
              >
                모든파일 취소
              </CancelText>
              <AddButton onClick={handleAddClick} type='button'>
                +
              </AddButton>
            </AddButtonWrap>
            <Input
              type='file'
              style={{ display: 'none' }}
              accept='image/*'
              {...register('groundImg')}
              ref={fileInput}
              onChange={getImgSrcArray}
            />
            <Row>
              <ImgBoxContainers imgbox={imgbox}>
                {uplodedImgsSrcArray.map((e, i) => (
                  <ImgBox>
                    <CancelIcon
                      onClick={() => {
                        const arr = [...uplodedImgsSrcArray];
                        arr.splice(i, 1);
                        setUplodedImgsSrcArray([...arr]);
                      }}
                    >
                      <CloseIcon />
                    </CancelIcon>
                    <Img
                      key={i}
                      src={e}
                      alt={`img${i}`}
                      onClick={handleClickImage}
                    />
                  </ImgBox>
                ))}
              </ImgBoxContainers>
            </Row>
          </Wrapper>

          {/* <Wrapper>
            <TitleRow>경기장 이미지</TitleRow>
            <Row>
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
                    {uplodedImgsSrcArray.length !== 0
                      ? [...ground.groundImg, ...uplodedImgsSrcArray].map(
                          (e, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Img key={i} src={e} alt={`img${i}`} />
                          ),
                        )
                      : ground.groundImg.map((e, i) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Img
                            key={i}
                            src={e}
                            alt={`img${i}`}
                            onClick={handleClickImage}
                          />
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
                      setGround({ ...ground, groundImg: [] });
                    }}
                  >
                    업로드취소
                  </Text>
                </AddButtonWrap>
              </InputFileContainers>
            </Row>
          </Wrapper> */}

          <Wrapper>
            <TitleRow>경기장 정보</TitleRow>
            <Row>
              <TextContainers>
                <Text>경기장 크기</Text>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('groundSize', {
                    value: ground.groundSize,
                  })}
                />
              </InputContainers>
            </Row>
            <Row>
              <TextContainers>
                <Text>기타정보</Text>
              </TextContainers>
              <InputContainers>
                <Div>
                  <Label>
                    <Checkbox
                      type='checkbox'
                      {...register('showerPlace', {
                        value: ground.showerPlace,
                      })}
                    />
                    샤워실
                  </Label>
                  <Label>
                    <Checkbox
                      type='checkbox'
                      {...register('parking', {
                        value: ground.parking,
                      })}
                    />
                    무료주차
                  </Label>
                </Div>
              </InputContainers>
            </Row>
            <Row>
              <InputContainers>
                <Div>
                  <Label>
                    <Checkbox
                      type='checkbox'
                      {...register('sportswearRental', {
                        value: ground.sportswearRental,
                      })}
                    />
                    운동복대여
                  </Label>
                  <Label>
                    <Checkbox
                      type='checkbox'
                      {...register('shoesRental', {
                        value: ground.shoesRental,
                      })}
                    />
                    풋살화대여
                  </Label>
                </Div>
              </InputContainers>
            </Row>
            {/* 
            <Row>
              <Label>
                <Checkbox
                  type='checkbox'
                  {...register('showerPlace', {
                    value: ground.showerPlace,
                  })}
                />
                샤워실
              </Label>
              <Label>
                <Checkbox
                  type='checkbox'
                  {...register('parking', {
                    value: ground.parking,
                  })}
                />
                주차장
              </Label>
              <Label>
                <Checkbox
                  type='checkbox'
                  {...register('shoesRental', {
                    value: ground.shoesRental,
                  })}
                />
                운동복대여
              </Label>
              <Label>
                <Checkbox
                  type='checkbox'
                  {...register('sportswearRental', {
                    value: ground.sportswearRental,
                  })}
                />
                풋살화대여
              </Label>
            </Row> */}
          </Wrapper>
          <Wrapper>
            <TitleRow>구장 특이사항</TitleRow>
            <Row>
              <TextContainers>
                <Text>풋살장 가는 길</Text>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('wayTo', {
                    value: ground.wayTo,
                  })}
                />
              </InputContainers>
            </Row>

            <Row>
              <TextContainers>
                <Text>주차</Text>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('parkingInfo', {
                    value: ground.parkingInfo,
                  })}
                />
              </InputContainers>
            </Row>

            <Row>
              <TextContainers>
                <Text>흡연</Text>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('smoking', {
                    value: ground.smoking,
                  })}
                />
              </InputContainers>
            </Row>

            <Row>
              <TextContainers>
                <Text>풋살화대여</Text>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('shoesRentallInfo', {
                    value: ground.shoesRentallInfo,
                  })}
                />
              </InputContainers>
            </Row>

            <Row>
              <TextContainers>
                <Text>화장실</Text>
              </TextContainers>
              <InputContainers>
                <Input
                  {...register('toilet', {
                    value: ground.toilet,
                  })}
                />
              </InputContainers>
            </Row>

            <Row style={{ alignItems: 'flex-start' }}>
              <TextContainers>
                <Text style={{ paddingTop: '10px' }}>기타</Text>
              </TextContainers>
              <InputContainers>
                <Textarea
                  {...register('actInfo', {
                    value: ground.actInfo,
                  })}
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
                <Select
                  {...register('startTime')}
                  style={{ marginRight: '10px' }}
                  defaultValue={ground.startTime}
                >
                  <option value='07:00'>7:00</option>
                  <option value='08:00'>8:00</option>
                  <option value='09:00'>9:00</option>
                  <option value='10:00'>10:00</option>
                  <option value='11:00'>11:00</option>
                  <option value='12:00'>12:00</option>
                  <option value='13:00'>13:00</option>
                  <option value='14:00'>14:00</option>
                  <option value='15:00'>15:00</option>
                  <option value='16:00'>16:00</option>
                  <option value='17:00'>17:00</option>
                  <option value='18:00'>18:00</option>
                  <option value='19:00'>19:00</option>
                  <option value='20:00'>20:00</option>
                  <option value='21:00'>21:00</option>
                  <option value='22:00'>22:00</option>
                </Select>
                <Select {...register('endTime')} defaultValue={ground.endTime}>
                  <option value='07:00'>7:00</option>
                  <option value='08:00'>8:00</option>
                  <option value='09:00'>9:00</option>
                  <option value='10:00'>10:00</option>
                  <option value='11:00'>11:00</option>
                  <option value='12:00'>12:00</option>
                  <option value='13:00'>13:00</option>
                  <option value='14:00'>14:00</option>
                  <option value='15:00'>15:00</option>
                  <option value='16:00'>16:00</option>
                  <option value='17:00'>17:00</option>
                  <option value='18:00'>18:00</option>
                  <option value='19:00'>19:00</option>
                  <option value='20:00'>20:00</option>
                  <option value='21:00'>21:00</option>
                  <option value='22:00' selected>
                    22:00
                  </option>
                </Select>
              </InputContainers>
            </Row>

            {/* <Row>
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
            </Row> */}

            <Row style={{ justifyContent: 'center' }}>
              <Button
                type='button'
                onClick={() => {
                  setContent(['경기장 상세정보 조회', <AdminGroundList />]);
                }}
              >
                목록으로
              </Button>
              <Button type='submit'>저장하기</Button>
            </Row>
          </Wrapper>
        </form>
      </>
    )
  );
};

const TitleRow = styled.div`
  position: absolute;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  margin-bottom: 50px;
  font-size: 20px;
  letter-spacing: -1px;
  gap: 15px;
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

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 450px;
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
  height: 35px;
  padding: 10px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
`;

// const Input = styled.input`
//   display: flex;
//   width: ${(props) => props.width || '100%'};
//   height: 45px;
//   padding: 10px;
//   border: 1px solid #919191;
//   border-radius: 4px;
//   font-size: 20px;
// `;
const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: ${(props) => Math.max(props.lines, 3) * 26}px;
  padding: 20px 5px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 20px;
  line-height: 1.2;
  overflow: visible;
  white-space: pre;
  resize: none;
`;

const Select = styled.select`
  display: flex;
  width: ${(props) => props.width || '100px'};
  height: 45px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
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
  font-size: 16px;
  font-weight: 700;
  justify-content: flex-end;
  justify-self: flex-end;
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
  justify-self: flex-end;
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

const ImgBoxContainers = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 220px;
  margin: 0 10px;
  overflow-x: scroll;
  background-image: url(${(props) => props.imgbox});
  background-size: 200px;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Img = styled.img`
  display: flex;
  width: 200px;
  height: 200px;
  cursor: pointer;
  object-fit: cover;
`;

const CancelText = styled.div`
  display: flex;
  position: absolute;
  padding: 6px 0;
  font-size: 18pt;
  font-weight: 400;
  cursor: pointer;
`;

const CancelIcon = styled.div`
  display: flex;
  position: absolute;
  padding: 6px;
  color: #fff;
  opacity: 0.5;
  cursor: pointer;
`;

// const CloseIcon = styled(AiFillCloseCircle)`
const CloseIcon = styled(RiCloseLine)`
  font-size: 25px;
  padding: -10px;
  background-color: #000;
  background-color: #000;
  border-radius: 10%;
`;

export default AdminGroundEdit;
