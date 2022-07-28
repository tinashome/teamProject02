import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { adminContentState, adminCurrentPage } from 'stores/adminUserStore';
import { adminGround } from 'stores/adminGroundStore';
import * as Api from 'api/api';
import { RiCloseLine } from '@react-icons/all-files/ri/RiCloseLine';
import { BsFileEarmarkPlus } from '@react-icons/all-files/bs/BsFileEarmarkPlus';
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete';
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
  const [ground, setGround] = useRecoilState(adminGround);
  const setContent = useSetRecoilState(adminContentState);
  const setCurentPage = useSetRecoilState(adminCurrentPage);
  const [postCode, setPostCode] = useState([]);
  const [inputPointValue, setInputPointValue] = useState(null);
  const [inputPointRequired, setInputPointRequired] = useState(false);
  const [findAddressRequired, setFindAddressRequired] = useState(false);
  // 업로드 된 이미지 주소를 배열로 저장하여 화면에보여주고 경기장 생성시 주소를 전송
  const [uplodedImgsSrc, setUplodedImgsSrc] = useState(null);
  const [uplodedImgsSrcArray, setUplodedImgsSrcArray] = useState([]);
  const [actInfoRows, setActInfoRows] = useState(1);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState('');
  const [modalImage, setModalImage] = useState('');

  const getGround = async () => {
    try {
      const result = await Api.get(`grounds/${groundId}`);
      const resultData = result.data;
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
      reset();
    } catch (err) {
      setModal({ success: false, ...newGroundData });
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

        <Form onSubmit={handleSubmit(checkPostCodeAndPoint)}>
          <PageWrapper>
            <Wrapper>
              <TitleRow>필수 입력 정보</TitleRow>

              <Row>
                <TextContainer>
                  <Text>경기장 이름</Text>
                  <TextRed>*</TextRed>
                </TextContainer>
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
                <TextContainer>
                  <Text>결제 포인트</Text>
                  <TextRed>*</TextRed>
                </TextContainer>
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
                <TextContainer>
                  <Text>경기장 주소</Text>
                  <TextRed>*</TextRed>
                </TextContainer>
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
                <TextContainer>
                  <Text />
                </TextContainer>
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
                <TextContainer>
                  <Text>상세 주소</Text>
                </TextContainer>
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
              <TitleRow>예약가능 시간</TitleRow>
              <Row>
                <TextContainer>
                  <Text>시작/종료시간</Text>
                </TextContainer>
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
                  <Select
                    {...register('endTime')}
                    defaultValue={ground.endTime}
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
                    <option value='22:00' selected>
                      22:00
                    </option>
                  </Select>
                </InputContainers>
              </Row>

              <Row>
                <TextContainer />
                <InputContainer>
                  <div style={{ color: '#9e9e9e', padding: 0 }}>
                    <div>
                      시작,종료 시간 미선택시 기본값(7:00~22:00)으로 설정됩니다.
                    </div>
                  </div>
                </InputContainer>
              </Row>

              <TitleRow>경기장 정보</TitleRow>
              <Row>
                <TextContainer>
                  <Text>경기장 크기</Text>
                </TextContainer>
                <InputContainers>
                  <Input
                    {...register('groundSize', {
                      value: ground.groundSize,
                    })}
                  />
                </InputContainers>
              </Row>
              <Row>
                <TextContainer>
                  <Text>기타정보</Text>
                </TextContainer>
                <InputContainers>
                  <ChechkboxContainer>
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
                  </ChechkboxContainer>
                </InputContainers>
              </Row>
              <Row>
                <TextContainer>
                  <Text />
                </TextContainer>
                <ChechkboxContainer>
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
                </ChechkboxContainer>
              </Row>
            </Wrapper>
          </PageWrapper>
          <PageWrapper />
          <PageWrapper>
            <Wrapper>
              <TitleRow>경기장 특이사항</TitleRow>
              <Row>
                <TextContainer>
                  <Text>풋살장 가는 길</Text>
                </TextContainer>
                <InputContainers>
                  <Input
                    {...register('wayTo', {
                      value: ground.wayTo,
                    })}
                  />
                </InputContainers>
              </Row>

              <Row>
                <TextContainer>
                  <Text>주차</Text>
                </TextContainer>
                <InputContainers>
                  <Input
                    {...register('parkingInfo', {
                      value: ground.parkingInfo,
                    })}
                  />
                </InputContainers>
              </Row>

              <Row>
                <TextContainer>
                  <Text>흡연</Text>
                </TextContainer>
                <InputContainers>
                  <Input
                    {...register('smoking', {
                      value: ground.smoking,
                    })}
                  />
                </InputContainers>
              </Row>

              <Row>
                <TextContainer>
                  <Text>풋살화대여</Text>
                </TextContainer>
                <InputContainers>
                  <Input
                    {...register('shoesRentallInfo', {
                      value: ground.shoesRentallInfo,
                    })}
                  />
                </InputContainers>
              </Row>

              <Row>
                <TextContainer>
                  <Text>화장실</Text>
                </TextContainer>
                <InputContainers>
                  <Input
                    {...register('toilet', {
                      value: ground.toilet,
                    })}
                  />
                </InputContainers>
              </Row>

              <Row style={{ alignItems: 'flex-start' }}>
                <TextContainer>
                  <Text style={{ paddingTop: '10px' }}>기타</Text>
                </TextContainer>
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
            </Wrapper>
            <Wrapper>
              <TitleRow>기존업로드된 이미지</TitleRow>

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

              <TitleRow
                style={{ justifyContent: 'space-between', paddingRight: '0' }}
              >
                경기장 이미지
                <Row>
                  <IconContainer onClick={handleAddClick}>
                    <AddFileIcon />
                    사진업로드
                  </IconContainer>
                  <IconContainer
                    onClick={() => {
                      setUplodedImgsSrcArray([]);
                    }}
                  >
                    <DeleteFileIcon />
                    모두삭제
                  </IconContainer>
                </Row>
              </TitleRow>
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
          </PageWrapper>
          <Row style={{ justifyContent: 'center' }}>
            <Button type='button' onClick={goGroundList}>
              목록으로
            </Button>
            <Button type='submit'>저장하기</Button>
          </Row>
        </Form>
      </>
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

const Form = styled.form``;

const Row = styled.div`
  display: flex;
`;
const TextContainer = styled.div`
  display: flex;
  width: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: flex-end;
`;

const Text = styled.p`
  display: flex;
  align-self: center;
  white-space: nowrap;
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

const Checkbox = styled.input`
  display: flex;
  width: 16px;
  height: 16px;
  margin: auto 5px;
  accent-color: #3563e9;
`;

const TextRed = styled(Text)`
  color: #dc5d5d;
  font-weight: 600;
`;
const InputContainers = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  justify-content: flex-end;
`;

const Input = styled.input`
  display: flex;
  width: ${(props) => props.width || '100%'};
  height: 30px;
  padding: 10px;
  border: 1px solid #919191;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  height: ${(props) => Math.max(props.lines, 2) * 20}px;
  padding: 10px;
  border: 1px solid #919191;
  border-radius: 4px;
  overflow: visible;
  white-space: pre;
  resize: none;
`;

const Select = styled.select`
  display: flex;
  width: 60px;
  height: 30px;
  border: 1px solid #919191;
  border-radius: 3px;
  color: #000;
  background-color: #fff;
  font-weight: 600;
`;

const InputError = styled.div`
  display: flex;
  text-align: center;
  color: #dc5d5d;
  z-index: 111;
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

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  font-size: 12px;
  font-weight: 600;
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

const CloseIcon = styled(RiCloseLine)`
  font-size: 20px;
  background-color: #000;
`;

const AddFileIcon = styled(BsFileEarmarkPlus)`
  font-size: 20px;
  align-self: center;
`;

const DeleteFileIcon = styled(AiOutlineDelete)`
  font-size: 20px;
  align-self: center;
`;

export default AdminGroundEdit;
