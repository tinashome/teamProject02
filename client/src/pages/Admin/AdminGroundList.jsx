// 관리자페이지본문 메뉴 경기장목록,삭제 구현 AdminGroundList

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { adminContentState, adminCurrentPage } from 'stores/adminUserStore';
import * as Api from 'api/api';
import { useForm } from 'react-hook-form';
import Pagenation from './AdminPagenation';
// eslint-disable-next-line import/no-cycle
import AdminGroundInfo from './AdminGroundInfo';
// eslint-disable-next-line import/no-cycle
import AdminGroundEdit from './AdminGroundEdit';

const AdminGroundList = () => {
  const { register, handleSubmit, reset } = useForm();
  // 조회한유저목록을 저장하는 상태
  const [grounds, setGrounds] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setcurrentPage] = useRecoilState(adminCurrentPage);
  const setContent = useSetRecoilState(adminContentState);
  // api요청 결과 모달창 display 변경을 위한상태 빈값이면 none
  const [modal, setModal] = useState(null);

  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState(null);

  const getGrounds = async () => {
    // 경기장목록조회 api요청
    // grounds?location=지역&search=검색어&offset=시작번호&count=조회할갯수

    const url = `grounds?${location && `location=${location}`}${
      search ? `&search=${search}` : ''
    }&offset=${currentPage * pageSize}&count=${pageSize}`;

    try {
      const result = await Api.get(url);
      const resultData = await result.data;
      setGrounds(resultData.grounds);
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
    const { locationValue, searchValue } = data;
    if (locationValue !== 'all') setLocation(locationValue);
    if (searchValue) setSearch(searchValue);
  };

  useEffect(() => {
    getGrounds();
  }, [location, search]);

  // 경기장정보조회클릭시 groundId만보내서 새컴포넌트 호출
  const handleClickInfo = async (event) => {
    const { id } = event.target;
    setContent(['경기장 상세정보 조회', <AdminGroundInfo groundId={id} />]);
  };

  // 경기장정보수정클릭시
  const handleEdit = async (event) => {
    const { id } = event.target;
    setContent(['경기장 등록정보 수정', <AdminGroundEdit groundId={id} />]);
  };

  // 경기장정보삭제 클릭시
  const handleDelete = async (event) => {
    const { id } = event.target;
    const { name } = event.target;

    // eslint-disable-next-line no-alert
    const deleteConfirm = window.confirm(
      `${name}의 경기장 정보를 정말 삭제 하시겠습니까?`,
    );
    if (deleteConfirm) {
      try {
        await Api.delete(`grounds/${id}`);
        setModal({ success: true, groundName: name, time: 3 });
        setTimeout(() => {
          setModal(null);
        }, 3000);
        return;
      } catch (err) {
        setModal({ success: false, groundName: name });
      }
    }
  };

  useEffect(() => {
    setcurrentPage(0);
  }, []);

  useEffect(() => {
    getGrounds();
  }, [currentPage, modal]);

  useEffect(() => {
    setLastPage(Math.ceil(totalCount / pageSize) - 1);
  }, [totalCount]);

  return (
    <Wrapper>
      <ModalWrapper
        modal={modal}
        onClick={() => {
          setModal(null);
          getGrounds();
        }}
      >
        <ModalDiv>
          {modal &&
            `경기장명:${
              modal.groundName.length >= 10
                ? `${modal.groundName.slice(0, 10)}...`
                : modal.groundName
            }\n\n삭제에 ${modal.success ? '성공' : '실패'} 하였습니다.\n\n`}
          {modal &&
            modal.success &&
            `이 메세지는 ${modal.time}초후에 사라집니다.`}

          <ModalButton
            onClick={() => {
              setModal(null);
              getGrounds();
            }}
          >
            닫기
          </ModalButton>
        </ModalDiv>
      </ModalWrapper>
      <TitleRow>
        <InColumn>
          <InRow>
            <Text width='150'>경기장명</Text>
            <Text>포인트</Text>
          </InRow>
          <InRow>
            <Text width='300'>위치</Text>
          </InRow>
        </InColumn>
        <Text>수정 / 삭제</Text>
      </TitleRow>
      <Container pageSize={pageSize}>
        {grounds &&
          grounds.map((e) => (
            <Row key={e._id}>
              <InColumn>
                <InRow>
                  <TextLeft
                    width='150'
                    onClick={handleClickInfo}
                    style={{ cursor: 'pointer' }}
                  >
                    {e.groundName}
                  </TextLeft>
                  <TextRight
                    id={e._id}
                    onClick={handleClickInfo}
                    style={{ cursor: 'pointer' }}
                  >
                    {e.paymentPoint && e.paymentPoint.toLocaleString()} P
                  </TextRight>
                </InRow>

                <InRow>
                  <TextLeft
                    width='350'
                    id={e._id}
                    onClick={handleClickInfo}
                    style={{ padding: '0 30px', cursor: 'pointer' }}
                  >
                    {e.groundAddress.address1}
                  </TextLeft>
                </InRow>
              </InColumn>
              <Text>
                <Button
                  id={e._id}
                  name={e.groundName}
                  onClick={handleEdit}
                  style={{ margin: '0 5px' }}
                >
                  수정
                </Button>
                <Button
                  id={e._id}
                  name={e.groundName}
                  onClick={handleDelete}
                  style={{ margin: '0 5px' }}
                >
                  삭제
                </Button>
              </Text>
            </Row>
          ))}
        <Row style={{ borderTop: '2px solid #000', borderBottom: 'none' }} />
      </Container>
      {grounds.length !== 0 && <Pagenation lastPage={lastPage} />}

      <Form onSubmit={handleSubmit(handleSearch)}>
        <SearchRow>
          <InColumn>
            <RadioBox>
              <Select
                {...register('locationValue')}
                style={{ marginRight: '10px' }}
              >
                <option value='all'>모든지역</option>
                <option value='서울'>서울</option>
                <option value='경기'>경기</option>
                <option value='부산'>부산</option>
              </Select>
            </RadioBox>
            <RadioBox>
              <Input
                {...register('searchValue')}
                placeholder='경기장명으로 찾기'
              />
              <Button type='submit'>찾기</Button>
              <Button
                type='button'
                onClick={() => {
                  setLocation(null);
                  setSearch(null);
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-size: 14px;
  letter-spacing: -1px;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid #bdbdbd;
  justify-content: space-between;
  align-items: center;
  align-content: center;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TextRight = styled(TextLeft)`
  justify-content: flex-end;
`;
const Button = styled.button`
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  background: #3563e9;
  color: white;
  font-size: 14px;
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

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Form = styled.form``;

const Select = styled.select`
  display: flex;
  width: 100px;
  height: 30px;
  border: 1px solid #919191;
  border-radius: 3px;
  color: #000;
  background-color: #fff;
  font-weight: 600;
`;
export default AdminGroundList;
