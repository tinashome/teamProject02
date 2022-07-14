import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from './router';
import GlobalStyles from './styles/globalStyles';

const App = () => (
  <RecoilRoot>
    <GlobalStyles />
    <Router />
  </RecoilRoot>
);

export default App;
