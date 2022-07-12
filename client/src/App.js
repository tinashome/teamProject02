import React from 'react';
import Router from './router';
import GlobalStyles from './styles/globalStyles';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Router />
    </RecoilRoot>
  );
};

export default App;
