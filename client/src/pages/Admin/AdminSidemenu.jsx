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

const AdminSidemenu = () => {
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
    if (window.innerWidth <= 870) {
      setIsMobile(true);
    }

    window.addEventListener('resize', resizingHandler);
    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, []);

  return (
    <SideMenuWrapper isMobile={isMobile}>
      <SideMenuContainer>
        <SideMenuTitle>사용자 관리</SideMenuTitle>
        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['회원정보 삭제(탈퇴)', <AdminUserDelete />]);
          }}
        >
          회원 탈퇴
        </SideMenuLink>
      </SideMenuContainer>

      <SideMenuContainer>
        <SideMenuTitle>경기장 관리</SideMenuTitle>

        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['경기장 추가', <AdminGroundAdd />]);
          }}
        >
          경기장 추가
        </SideMenuLink>

        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['경기장 목록 조회', <AdminGroundList />]);
          }}
        >
          조회/수정/삭제
        </SideMenuLink>
      </SideMenuContainer>

      <SideMenuContainer>
        <SideMenuTitle>예약 관리</SideMenuTitle>

        <SideMenuLink
          onClick={() => {
            setCurentPage(0);
            setContent(['예약상태 관리', <AdminRentalList />]);
          }}
        >
          예약조회/취소
        </SideMenuLink>
      </SideMenuContainer>

      <SideMenuContainer>
        <SideMenuTitle>포인트 관리</SideMenuTitle>

        <SideMenuLink
          onClick={() => {
            setContent(['충전 관리', <AdminPayment />]);
          }}
        >
          포인트 충전 관리
        </SideMenuLink>
      </SideMenuContainer>
    </SideMenuWrapper>
  );
};

const SideMenuWrapper = styled.div`
  display: ${(props) => (props.isMobile ? 'none' : 'flex')};
  flex-direction: column;
  width: 100px;
  padding-top: 100px;
  padding-right: 50px;
  align-items: flex-end;
`;

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  padding: 10px 0px;
  border-bottom: 1px solid #bdbdbd;
  align-items: flex-end;
`;

const SideMenuTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const SideMenuLink = styled.button`
  display: flex;
  letter-spacing: -1px;
  color: #000;
`;

export default AdminSidemenu;
