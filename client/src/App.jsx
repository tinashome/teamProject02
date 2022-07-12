import React from 'react';
import { RecoilRoot } from 'recoil';
import Router from './router';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyles />
      <Router />
    </RecoilRoot>
  );
}

export default App;
