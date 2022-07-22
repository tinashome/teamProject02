import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styled from 'styled-components';
import SideMenu from '../components/organisms/SideMenu';

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userRole = jwtDecode(token).role;
      if (userRole !== 'basic-user') navigate('/');
    } catch {
      navigate('/login');
    }
  }, []);

  return (
    <Container>
      <SideMenu />
      <Other>
        <Outlet />
      </Other>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  padding: 0 11.25rem 0;
`;

const Other = styled.div`
  flex: 4;
  padding: 0 0 4.375rem 8.125rem;
`;
