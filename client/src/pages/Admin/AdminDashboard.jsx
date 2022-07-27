// 관리자페이지 메뉴0 대쉬보드 AdminDashboard
// 대쉬보드는 관리자페이지의 첫페이지이며 각종정보를 요약하여 나타냅니다.

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { adminContentState } from 'stores/adminUserStore';
import * as Api from 'api/api';
import { addCommas } from 'util/useful-functions';
import AdminPayment from './AdminPayment';
import AdminRentalList from './AdminRentalList';

const AdminDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useRecoilState(adminContentState);
  // 조회한 유저목록을 저장하는 상태
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  const [todaySignUp, setTodaySignUp] = useState(null);
  // 조회한 충전신청목록을 저장하는 상태
  const [orders, setOrders] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [unCharged, setUnCharged] = useState(null);
  const [points, setPoints] = useState(null);
  // 조회한 예약목록을 저장하는 상태
  const [rentals, setRentals] = useState(null);
  const [rentalsOfDay, setRentalsOfDay] = useState(null);
  const [todayRentalsPayment, setTodayRentalsPayment] = useState(null);
  const [yesterdayRentalsPayment, setYesterdayRentalsPayment] = useState(null);

  // 오늘 날짜인지 확인하는 함수
  const isSameDate = (date) => {
    const today = new Date();
    const dates = new Date(date);
    return (
      today.getFullYear() === dates.getFullYear() &&
      today.getMonth() === dates.getMonth() &&
      today.getDate() === dates.getDate()
    );
  };

  // 어제 날짜인지 확인하는 함수
  const isSameDateYesterDay = (date) => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const dates = new Date(date);
    return (
      yesterday.getFullYear() === dates.getFullYear() &&
      yesterday.getMonth() === dates.getMonth() &&
      yesterday.getDate() === dates.getDate()
    );
  };

  const getUsers = async () => {
    // 사용자목록조회 api요청
    // users?name=이름&email=이메일&phoneNumber=연락처&offset=시작번호&count=조회할갯수
    try {
      const result = await Api.get(`users?count=999`);
      const resultData = result.data;
      setUsers(resultData.users);
      setTotalUsers(resultData.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (users) {
      // 오늘 가입자수
      const todayUser = users
        .map((e) => isSameDate(e.createdAt))
        .filter((e) => e).length;
      setTodaySignUp(todayUser);

      // 총 예치금 잔고
      const pointValue =
        users && users.reduce((acc, cur) => acc + cur.totalPoint, 0);
      setPoints(pointValue);
    }
  }, [users]);

  const getOrders = async () => {
    // 충전신청목록조회 api요청
    try {
      const result = await Api.get(`points?count=999`);
      await setOrders(result.data.points);
      await setTotalOrders(result.data.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (totalOrders) {
      // 승인대기건수
      const unchargedOrder =
        orders && orders.filter((e) => !e.isCharged).length;
      setUnCharged(unchargedOrder);
    }
  }, [orders]);

  const getRentals = async () => {
    // 예약목록조회 api요청
    try {
      const result = await Api.get(`rentals?count=999`);
      await setRentals(result.data.rentals);
      await setRentalsOfDay(result.data.length);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (rentals) {
      // 오늘 예약 건수
      const todayRentals =
        rentals &&
        rentals.map((e) => isSameDate(e.createdAt)).filter((e) => e).length;

      // 어제 예약 건수
      const yesterDayRentals =
        rentals &&
        rentals.map((e) => isSameDateYesterDay(e.createdAt)).filter((e) => e)
          .length;

      // 오늘 매출(오늘 예약한건)
      const todayRentalsPay =
        rentals &&
        rentals.reduce(
          (acc, cur) =>
            acc + (isSameDate(cur.createdAt) && cur.groundId.paymentPoint),
          0,
        );

      // 어제 매출(어제 예약한건)
      const yesterdayRentalsPay =
        rentals &&
        rentals.reduce(
          (acc, cur) =>
            acc +
            (isSameDateYesterDay(cur.createdAt) && cur.groundId.paymentPoint),
          0,
        );

      setRentalsOfDay([todayRentals, yesterDayRentals]);
      setTodayRentalsPayment(todayRentalsPay);
      setYesterdayRentalsPayment(yesterdayRentalsPay);
    }
  }, [rentals]);

  useEffect(() => {
    getUsers();
    getOrders();
    getRentals();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Block>
          <Title>회원정보</Title>
          <TextBold>
            총 회원수<Text>{totalUsers} 명</Text>
          </TextBold>
          <TextBold>
            오늘 가입<Text>{todaySignUp} 명</Text>
          </TextBold>
        </Block>

        <Block width='350'>
          <Title>충전내역</Title>
          <TextBold>
            승인 대기
            <Text>
              <TextLink
                onClick={() => {
                  setContent(['충전 관리', <AdminPayment />]);
                }}
              >
                {unCharged}
              </TextLink>
              /{totalUsers} 건
            </Text>
          </TextBold>
          <TextBold>
            총 예치금 잔고<Text>{points && addCommas(points)} 원</Text>
          </TextBold>
        </Block>

        <Block>
          <Title>예약정보</Title>
          <TextBold>
            오늘 예약<Text>{rentalsOfDay && rentalsOfDay[0]} 건</Text>
          </TextBold>
          <TextBold>
            어제 예약<Text>{rentalsOfDay && rentalsOfDay[1]} 건</Text>
          </TextBold>
        </Block>

        <Block width='350'>
          <Title>매출정보(당일예약건)</Title>
          <TextBold>
            오늘 매출
            <Text>
              {todayRentalsPayment && addCommas(todayRentalsPayment)} 원
            </Text>
          </TextBold>
          <TextBold>
            어제 매출
            <Text>
              {yesterdayRentalsPayment && addCommas(yesterdayRentalsPayment)} 원
            </Text>
          </TextBold>
        </Block>
      </Container>
      <ModalDiv />
      <ModalWrapper />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  font-size: 20px;
  letter-spacing: -1px;
  align-items: center;
  justify-content: center;
  align-content: center;
  align-self: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 620px;
  font-size: 20px;
  letter-spacing: -1px;
  margin: 50px 0;
  gap: 30px;
  align-items: center;
  justify-content: center;
  align-content: center;
  align-self: center;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width ?? '200'}px;
  height: 150px;
  padding: 20px 0px;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  font-size: 20px;
  line-height: 1.2;
  justify-content: space-between;
  white-space: pre-wrap;
`;

const Title = styled.div`
  display: flex;
  color: #3563e9;
  padding-bottom: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #919191;
  justify-content: center;
  align-items: center;
`;

const TextBold = styled.div`
  display: flex;
  font-weight: 600;
  margin: 0 20px;
  justify-content: space-between;
`;

const Text = styled.div`
  display: flex;
  font-weight: 400;
  margin: 0 20px;
  align-self: center;
`;

const TextLink = styled.div`
  display: flex;
  font-weight: 600;
  color: #3563e9;
  border-bottom: 2px solid #3563e9;
  align-self: center;
  cursor: pointer;
`;

const ModalDiv = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 600px;
  margin-left: -250px;
  margin-top: -400px;
  padding: 20px 10px;
  border: solid 10px #3563e9;
  border-radius: 5px;
  background-color: #fff;
  font-size: 20px;
  line-height: 1.2;
  justify-content: center;
  align-items: center;
  
  z-index: 9000;
  white-space: pre-wrap;
`;
const ModalWrapper = styled.div`
  display: ${(props) => (props.modal ? 'flex' : 'none')}};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -2px;
  align-content: center;
`;
export default AdminDashboard;
