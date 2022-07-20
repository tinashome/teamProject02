import React from 'react';
import styled from 'styled-components';
import PointChargeTitle from 'components/organisms/PointChargeTitle';
import PointChargeCard from 'components/organisms/PointChargeCard';
import PointChargeCheck from 'components/organisms/PointChargeCheck';

const PointCharge = () => (
  <Container>
    <PointChargeTitle />
    <PointChargeCard />
    <PointChargeCheck />
  </Container>);

const Container = styled.div`
  width: 80%;
`;
export default PointCharge;
