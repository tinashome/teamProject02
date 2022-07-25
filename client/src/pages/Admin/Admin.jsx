import React, { useEffect } from 'react';
import styled from 'styled-components';
import { adminContentState } from 'stores/adminUserStore';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import AdminSidemenu from './AdminSidemenu';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const [content, setContent] = useRecoilState(adminContentState);
  const navigate = useNavigate();
  const isAdmin = () => {
    try {
      const token = localStorage.getItem('token');
      const userRole = jwtDecode(token).role;
      if (userRole !== 'admin') navigate('/');
    } catch (err) {
      navigate('/login');
    }
  };
  isAdmin();
  useEffect(() => {
    setContent(['관리자 페이지', <AdminDashboard />]);
  }, []);

  return (
    <AdminPageWrapper>
      <AdminSidemenu />
      <AdminPageContentContainer>
        <AdminPageContentTitleBox>{content[0]}</AdminPageContentTitleBox>
        <AdminPageContentBox>{content[1]}</AdminPageContentBox>
      </AdminPageContentContainer>
    </AdminPageWrapper>
  );
};

const AdminPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  letter-spacing: -1px;
`;

const AdminPageContentContainer = styled.div`
  width: 770px;
  margin: 50px;
`;

const AdminPageContentTitleBox = styled.div`
  text-align: center;
  padding: 30px 50px;
  font-size: 40px;
  font-weight: 700;
`;

const AdminPageContentBox = styled.div`
  // height: auto;
  height: 100%;
`;

export default Admin;
