import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GlobalLayout = () => (
  <Container>
    <Header />
    <Outlet />
    <Footer />
  </Container>
);

export default GlobalLayout;
