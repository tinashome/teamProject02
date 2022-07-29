import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import { addCommas, getCurrentDate } from 'util/useful-functions';
import { useForm } from 'react-hook-form';
import Pagenation from './AdminPagenation';

const AdminPayment = () => {
  const { register, handleSubmit, reset } = useForm();
  const [charge, setCharge] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(null);
  const [lastPage, setLastPage] = useState(9);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setcurrentPage] = useRecoilState(adminCurrentPage);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isCharged, setIsCharged] = useState(null);

  const getCharge = async () => {
    // 충전신청목록조회 api요청
    // points?isCharged=승인여부&name=이름email=이메일&offset=시작위치&count=검색할갯수

    const url = `points?${isCharged && `isCharged=${isCharged}`}${
      userName ? `&name=${userName}` : ''
    }${email ? `&email=${email}` : ''}&offset=${
      currentPage * pageSize
    }&count=${pageSize}`;
    try {
      const result = await Api.get(url);
      const resultData = await result.data;
      setCharge(resultData.points);
      setTotalCount(resultData.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  // 찾기 클릭시
  const handleSearch = async (data) => {
    reset();
    setcurrentPage(0);
    const { charged, search, searchFor } = data;
    if (charged !== 'all') setIsCharged(charged);
    if (search === 'name') setUserName(searchFor);
    if (search === 'email') setEmail(searchFor);
  };

  useEffect(() => {
    getCharge();
  }, [isCharged, userName, email]);

  useEffect(() => {
    getCharge();
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  // 충전승인 클릭시
  const handleClick = async (event, payName) => {
    const { id } = event.target;
    const { name } = event.target;
    const { value } = event.target;
    const bodyData = { isCharged: true };
    // eslint-disable-next-line no-alert
    const chargeConfirm = window.confirm(
      `예금주: ${payName} \n 충전금액: ${addCommas(value)} \n 승인하겠습니까?`,
    );
    if (chargeConfirm) {
      try {
        await Api.patch(`points/${id}`, bodyData);
        setModal({ success: true, name, payName, time: 3 });
        setTimeout(() => {
          setModal(null);
        }, 3000);
      } catch (err) {
        setModal({ success: false, name, payName });
      }
    }
  };

  return (
    <Wrapper>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal(null);
          getCharge();
        }}
      >
        <ModalDiv modal={modal}>
          {modal &&
            `${modal.success ? '승인성공' : '승인실패'}\n\n이름 : ${
              modal.name
            }(예금주: ${modal.payName || modal.name})\n\n`}
          {modal &&
            modal.success &&
            `이 메세지는 ${modal.time}초후에 사라집니다.`}
          <ModalButton
            onClick={() => {
              setModal(null);
              getCharge();
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>

      <TitleRow>
        <InColumn>
          <InRow>
            <Text width='100'>이름</Text>
            <Text width='200'>이메일</Text>
          </InRow>
          <InRow>
            <Text width='100'>예금주</Text>
            <Text width='100'>주문일자</Text>
            <Text width='100'>주문P</Text>
          </InRow>
        </InColumn>
        <Text width='100'>승인</Text>
      </TitleRow>

      <Container>
        {charge &&
          charge.map((e) => (
            <Row key={e._id}>
              <InColumn>
                <InRow>
                  <Text width='100'>{e.user.name}</Text>
                  <Text width='200'>{e.user.email}</Text>
                </InRow>

                <InRow>
                  <Text width='100'>{e.payName}</Text>
                  <Text width='100'>{getCurrentDate(e.createdAt)}</Text>
                  <Text width='100' style={{ justifyContent: 'flex-end' }}>
                    {e.paymentAmount && addCommas(e.paymentAmount)} P
                  </Text>
                </InRow>
              </InColumn>

              <Text width='100'>
                <Button
                  id={e._id}
                  name={e.user.name}
                  value={e.paymentAmount}
                  onClick={(event) => handleClick(event, e.payName)}
                  disabled={e.isCharged}
                >
                  {e.isCharged ? '충전완료' : '충전승인'}
                </Button>
              </Text>
            </Row>
          ))}
        <Row style={{ borderTop: '2px solid #000', borderBottom: 'none' }} />
      </Container>
      {charge.length !== 0 && <Pagenation lastPage={lastPage} />}

      <Form onSubmit={handleSubmit(handleSearch)}>
        <SearchRow>
          <InColumn>
            <RadioBox>
              <Select {...register('charged')} style={{ marginRight: '10px' }}>
                <option value='all'>전체보기</option>
                <option value='false'>승인대기</option>
                <option value='true'>충전완료</option>
              </Select>
              <Label>
                <RadioBtn
                  type='radio'
                  name='search'
                  value='name'
                  id='name'
                  {...register('search', { required: true })}
                  checked
                />
                이름
              </Label>
              <Label>
                <RadioBtn
                  type='radio'
                  name='search'
                  value='email'
                  id='email'
                  {...register('search', { required: true })}
                />
                이메일
              </Label>
            </RadioBox>
            <RadioBox>
              <Input {...register('searchFor')} />
              <Button type='submit'>찾기</Button>
              <Button
                type='button'
                onClick={() => {
                  setUserName(null);
                  setEmail(null);
                }}
              >
                전체보기
              </Button>
            </RadioBox>
          </InColumn>
        </SearchRow>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-size: 14px;
  letter-spacing: -1px;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  line-height: 20px;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-evenly;
  align-items: center;
`;

const TitleRow = styled(Row)`
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
  border-bottom: 2px solid #000;
`;

const InRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InColumn = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const Text = styled.div`
  display: flex;
  width: ${(props) => props.width ?? '80'}px;
  letter-spacing: 0.5px;
  align-items: center;
  white-space: nowrap;
  letter-spacing: 0.5px;
  justify-content: center;
`;
const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? '#D9D9D9' : '#3563e9')};
  color: ${(props) => (props.disabled ? '#919191' : '#fff')};
  font-size: 14px;
  white-space: nowrap;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')};
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
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 250px;
  margin-left: -175px;
  margin-top: -125px;
  padding: 30px 10px;
  border: solid 10px #3563e9;
  border-radius: 3px;
  background-color: #fff;
  font-size: 24px;
  text-align: center;
  white-space: pre-wrap;
  flex-direction: column;
  align-content: center;
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

const Input = styled.input`
  display: flex;
  width: 180px;
  height: 30px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #919191;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 20px;
  align-items: center;
  justify-content: center;
  border: none;
  flex-wrap: wrap;
`;

const RadioBtn = styled.input`
  display: flex;
  margin: 3px 5px;
`;
const Label = styled.label`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  white-space: nowrap;
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Form = styled.form``;

const Select = styled.select`
  display: flex;
  border: 1px solid #919191;
  border-radius: 3px;
  color: #000;
  background-color: #fff;
  font-weight: 600;
  font-size: 14px;
`;

export default AdminPayment;
