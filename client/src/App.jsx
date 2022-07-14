import React from 'react';
import Router from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './styles/globalStyles';

const App = () => (
  <RecoilRoot>
    <GlobalStyles />
    <Router />
  </RecoilRoot>
);

export default App;
