import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import AdminSidemenu from './AdminSidemenu';
import AdminDashboard from './AdminDashboard';
import MenuToggle from './MenuToggle';

const Admin = () => {
  const [content, setContent] = useRecoilState(adminContentState);

  useEffect(() => {
    setContent(['관리자 페이지', <AdminDashboard />]);
  }, []);

  return (
    <Wrapper>
      <MenuToggle />
      <AdminPageWrapper>
        <AdminSidemenu />
        <AdminPageContentContainer>
          <AdminPageContentTitleBox>{content[0]}</AdminPageContentTitleBox>
          <AdminPageContentBox>{content[1]}</AdminPageContentBox>
        </AdminPageContentContainer>
      </AdminPageWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const AdminPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  letter-spacing: -1px;
`;

const AdminPageContentContainer = styled.div`
  max-width: 100vh;
  // min-width: 700px;
  margin: 50px 0;
`;

const AdminPageContentTitleBox = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 24px;
  font-weight: 600;
`;

const AdminPageContentBox = styled.div``;

export default Admin;
