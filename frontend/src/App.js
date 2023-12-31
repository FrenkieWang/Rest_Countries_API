// App.js
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from './HomePage';
import CountryInfo from './CountryInfo';

function App(){
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/country/:name" element={<CountryInfo />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;