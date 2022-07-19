import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { groundPhotoListState } from 'stores/groundStore';
import * as Api from 'api/api';
import styled from 'styled-components';
import Spinner from 'components/atoms/Spinner';
import GroundCard from './GroundCard';
import Pagination from './Pagination';

const GroundPhotoList = ({ location, searchInput }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groundList, setGroundList] = useRecoilState(groundPhotoListState);
  const [page, setPage] = useState(1);
  const listPerPage = 8;
  const totalPage = Math.ceil(groundList.length / listPerPage);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await Api.get(
        `grounds?location=${location}&search=${searchInput}&offset=${
          (page - 1) * listPerPage
        }&count=${listPerPage}`,
      );
      setGroundList({
        length: result.data.length,
        data: result.data.grounds,
      });
      setIsLoading(false);
    })();
  }, [searchInput, location, page]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          {groundList.data?.map((ground) => (
            <GroundCard ground={ground} key={ground._id} />
          ))}
        </Container>
      )}

      {groundList.length !== 0 && (
        <Pagination
          totalPage={totalPage}
          limit={5}
          page={page}
          setPage={setPage}
        />
      )}
    </>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  margin-bottom: 3rem;
`;

export default GroundPhotoList;
