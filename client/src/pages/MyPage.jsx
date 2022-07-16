import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SideMenu from '../components/organisms/SideMenu';

const MyPage = () => (
  <Container>
    <SideMenu />
    <Other>
      <Outlet />
    </Other>
  </Container>
);

export default MyPage;

const Container = styled.div`
  display: flex;
  padding: 0 11.25rem 0;
`;

const Other = styled.div`
  flex: 4;
  padding: 0 0 4.375rem 8.125rem;
`;
