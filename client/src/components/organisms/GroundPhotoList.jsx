import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { groundPhotoListState, pageState } from 'stores/groundStore';
import * as Api from 'api/api';
import styled from 'styled-components';
import NoResult from 'components/atoms/NoResult';
import GroundCard from './GroundCard';
import Pagination from './Pagination';

const GroundPhotoList = ({ location, searchInput }) => {
  const [groundList, setGroundList] = useRecoilState(groundPhotoListState);
  const [page, setPage] = useRecoilState(pageState);
  const listPerPage = 8;
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
        {groundList.data?.map((ground) => (
          <GroundCard ground={ground} key={ground._id} />
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

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  margin-bottom: 3rem;
`;

export default GroundPhotoList;
