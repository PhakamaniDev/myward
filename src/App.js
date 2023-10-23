import React, { Suspense,useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Ward from './pages/Ward';
import { CredentialContext } from './context/Context';

function App() {
  const [wardCode, setWardCode] = useState([]);

  return (
    <HashRouter>
      <Suspense>
        <CredentialContext.Provider value={{ wardCode, setWardCode }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ward' element={<Ward />} />
          </Routes>
        </CredentialContext.Provider>
      </Suspense>
    </HashRouter>
  );
}


export default App;
