import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { groundTextListState, pageState } from 'stores/groundStore';
import * as Api from 'api/api';
import styled from 'styled-components';
import { addCommas } from 'util/useful-functions';
import { Link } from 'react-router-dom';
import NoResult from 'components/atoms/NoResult';
import Pagination from './Pagination';

const GroundTextList = ({ location, searchInput }) => {
  const [groundList, setGroundList] = useRecoilState(groundTextListState);
  const [page, setPage] = useRecoilState(pageState);

  const listPerPage = 15;
  const totalPage = Math.ceil(groundList.length / listPerPage);

  useEffect(() => {
    (async () => {
      try {
        const result = await Api.get(
          `grounds?location=${location}&search=${searchInput}&offset=${
            (page - 1) * listPerPage
          }&count=${listPerPage}`,
        );
        setGroundList({
          length: result.data.length,
          data: result.data.grounds,
        });
      } catch (err) {
        alert(err.response.data.reason);
      }
    })();
  }, [location, searchInput, page]);

  return (
    <>
      <Container>
        <GrounndListHeader>
          <p>주소</p>
          <p>경기장 이름</p>
          <p>결제 금액</p>
          <p>영업 시간</p>
        </GrounndListHeader>
        {groundList.data?.map((ground) => (
          <GroundInfo key={ground._id}>
            <div>{ground.groundAddress.address1}</div>
            <Link to={`/grounds/${ground._id}`}>
              <div>{ground.groundName}</div>
            </Link>
            <div>{addCommas(ground.paymentPoint)}P</div>
            <div>
              {ground.startTime}~{ground.endTime}
            </div>
          </GroundInfo>
        ))}
      </Container>
      <Pagination
        totalPage={totalPage}
        limit={5}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

const Container = styled.div`
  border-radius: 4px;
  margin-top: 1rem;
`;

const GrounndListHeader = styled.div`
  display: grid;
  grid-template-columns: 20% 40% 20% 20%;
  padding: 1rem;
  border-bottom: 1px solid #343a40;

  p {
    font-size: 23px;
    font-weight: 600;
    margin: 0 auto;
  }
`;

const GroundInfo = styled.div`
  display: grid;
  grid-template-columns: 20% 40% 20% 20%;
  padding: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid #e9ecef;
  }

  a,
  div {
    width: 100%;
    text-align: center;
  }

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GroundTextList;
