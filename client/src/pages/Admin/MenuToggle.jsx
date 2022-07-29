import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { adminContentState, adminCurrentPage } from 'stores/adminUserStore';
import adminMenuStore from 'stores/adminMenuStore';
import AdminUserDelete from './AdminUserDelete';
import AdminGroundAdd from './AdminGroundAdd';
import AdminGroundList from './AdminGroundList';
import AdminPayment from './AdminPayment';
import AdminRentalList from './AdminRentalList';
import AdminDashboard from './AdminDashboard';

const MenuToggle = () => {
  const setContent = useSetRecoilState(adminContentState);
  const setCurentPage = useSetRecoilState(adminCurrentPage);
  const [isMobile, setIsMobile] = useRecoilState(adminMenuStore);

  const resizingHandler = () => {
    if (window.innerWidth <= 870) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth * 1 <= 870) {
      setIsMobile(true);
    }

    window.addEventListener('resize', resizingHandler);
    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, []);

  return (
    <Container>
      <DownMenu isMobile={isMobile}>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['관리자 페이지', <AdminDashboard />]);
          }}
          style={{ fontWeight: '600' }}
        >
          관리메인
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['회원정보 삭제(탈퇴)', <AdminUserDelete />]);
          }}
        >
          회원관리
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['경기장 추가', <AdminGroundAdd />]);
          }}
        >
          경기장추가
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['경기장 목록 조회', <AdminGroundList />]);
          }}
        >
          경기장관리
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['예약상태 관리', <AdminRentalList />]);
          }}
        >
          예약관리
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            setContent(['충전 관리', <AdminPayment />]);
          }}
        >
          포인트관리
        </SideMenuLink>
      </DownMenu>
    </Container>
  );
};

export default MenuToggle;

const Container = styled.div`
  z-index: 99;
`;

const DownMenu = styled.div`
  display: ${(props) => (props.isMobile ? 'flex' : 'none')};
  flex-direction: row;
  width: 100vw;
  justify-content: center;
`;
const SideMenuLink = styled.button`
  display: flex;
  width: 20%;
  height: 40px;
  letter-spacing: -1px;
    props.ismobile && props.togglemenu ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #adb5bd;
  border-top: 2px solid #3563e9;
  border-bottom: 2px solid #3563e9;
  background-color: #fff;
  &:hover {
    background-color: #f2f4f6;
  }
`;
