// 관리자페이지본문 메뉴1 회원탈퇴 AdminUserDelete
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import { useForm } from 'react-hook-form';
import Pagenation from './AdminPagenation';

const AdminUserDelete = () => {
  const { register, handleSubmit, reset } = useForm();

  // 조회한유저목록을 저장하는 상태
  const [users, setUsers] = useState([]);
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
  const [phoneNumber, setPhoneNumber] = useState(null);

  const getUsers = async () => {
    // 사용자목록조회 api요청
    // users?name=이름&email=이메일&phoneNumber=연락처&offset=시작번호&count=조회할갯수
    const url = `users?${userName ? `&name=${userName}` : ''}${
      email ? `&email=${email}` : ''
    }${phoneNumber ? `&phoneNumber=${phoneNumber}` : ''}&offset=${
      currentPage * pageSize
    }&count=${pageSize}`;
    try {
      const result = await Api.get(url);
      const resultData = await result.data;
      setUsers(resultData.users);
      setTotalCount(resultData.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  // 회원정보삭제 클릭시
  const handleClick = async (event) => {
    const { id } = event.target;
    const { name } = event.target;
    // eslint-disable-next-line no-alert
    const deleteConfirm = window.confirm(
      `${name}의 계정 정보를 정말 삭제 하시겠습니까?`,
    );
    if (deleteConfirm) {
      try {
        await Api.delete(`users/${id}`);
        setModal({ success: true, userName: name, time: 3 });
        setTimeout(() => {
          setModal(null);
        }, 3000);
      } catch (err) {
        setModal({ success: false, userName: name });
      }
    }
  };

  // 찾기 클릭시
  const handleSearch = async (data) => {
    reset();
    setcurrentPage(0);
    const { searchFor, search } = data;
    if (!searchFor) return;
    if (search === 'name') setUserName(searchFor);
    if (search === 'email') setEmail(searchFor);
    if (search === 'phoneNumber')
      setPhoneNumber(searchFor.trim().replace('-', ''));
  };

  useEffect(() => {
    getUsers();
  }, [userName, email, phoneNumber]);

  return (
    users && (
      <Wrapper>
        <ModalWrapper
          modal={modal}
          onClick={() => {
            setModal(null);
            getUsers();
          }}
        >
          <ModalDiv modal={modal}>
            {modal &&
              `사용자 이름: ${modal.userName}\n\n삭제에 ${
                modal.success ? '성공' : '실패'
              } 하였습니다.\n\n`}
            {modal &&
              modal.success &&
              `이 메세지는 ${modal.time}초후에 사라집니다.`}
            <ModalButton
              onClick={() => {
                setModal(null);
                getUsers();
              }}
            >
              닫기
            </ModalButton>
          </ModalDiv>
        </ModalWrapper>
        <TitleRow>
          <InColumn>
            <InRow>
              <Text width='200'>이메일</Text>
              <Text>이름</Text>
            </InRow>
            <InRow>
              <Text width='200'>연락처</Text>
              <Text>포인트</Text>
            </InRow>
          </InColumn>
          <Text>삭제(탈퇴)</Text>
        </TitleRow>
        <Container pageSize={pageSize}>
          {users &&
            users.map((e) => (
              <Row key={e._id}>
                <InColumn>
                  <InRow>
                    <TextLeft width='200'>{e.email}</TextLeft>
                    <Text>{e.name}</Text>
                  </InRow>
                  <InRow>
                    <Text width='200'>
                      {e.phoneNumber &&
                        e.phoneNumber.replace(
                          /^(\d{2,3})(\d{3,4})(\d{4})$/,
                          `$1-$2-$3`,
                        )}
                    </Text>
                    <Text>
                      {e.totalPoint && e.totalPoint.toLocaleString()} P
                    </Text>
                  </InRow>
                </InColumn>
                <Text>
                  <Button id={e._id} name={e.name} onClick={handleClick}>
                    계정삭제
                  </Button>
                </Text>
              </Row>
            ))}
          <Row style={{ borderTop: '2px solid #000', borderBottom: 'none' }} />
        </Container>
        {users.length !== 0 && <Pagenation lastPage={lastPage} />}

        <Form onSubmit={handleSubmit(handleSearch)}>
          <SearchRow>
            <InColumn>
              <RadioBox>
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
                <Label>
                  <RadioBtn
                    type='radio'
                    name='search'
                    value='name'
                    id='name'
                    {...register('search', { required: true })}
                  />
                  이름
                </Label>
                <Label>
                  <RadioBtn
                    type='radio'
                    name='search'
                    value='phoneNumber'
                    id='phoneNumber'
                    {...register('search', { required: true })}
                  />
                  연락처
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
                    setPhoneNumber(null);
                  }}
                >
                  전체보기
                </Button>
              </RadioBox>
            </InColumn>
          </SearchRow>
        </Form>
      </Wrapper>
    )
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
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-between;
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
  width: ${(props) => props.width ?? '100'}px;
  letter-spacing: 0.5px;
  align-items: center;
  white-space: nowrap;
  letter-spacing: 0.5px;
  justify-content: center;
`;

const TextLeft = styled(Text)`
  justify-content: flex-start;
`;

const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 14px;
  white-space: nowrap;
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
  position: fixed;
  z-index: 1000;
  top:0;
  left:0;
  width: auto;
  height: 100%;
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
  font-size: 24px;
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

export default AdminUserDelete;
