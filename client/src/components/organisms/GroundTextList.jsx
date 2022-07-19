import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { groundTextListState } from 'stores/groundStore';
import * as Api from 'api/api';
import styled from 'styled-components';
import Spinner from 'components/atoms/Spinner';
import Pagination from './Pagination';

const GroundTextList = ({ location, searchInput }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groundList, setGroundList] = useRecoilState(groundTextListState);
  const [page, setPage] = useState(1);
  const listPerPage = 10;
  const totalPage = Math.ceil(groundList.length / listPerPage);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
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
  }, [location, page]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          {groundList.data?.map((ground) => (
            <div>{ground.groundName}</div>
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

const Container = styled.div``;

export default GroundTextList;
