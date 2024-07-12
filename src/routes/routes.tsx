import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import News from '../pages/News';
import Cryptocurrencies from '../pages/Home/components/Cryptocurrencies';
import CryptoDetails from '../pages/Home/components/CryptoDetails';

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route
        path="/cryptocurrencies"
        element={<Cryptocurrencies simplified={false} />}
      />
      <Route path="/crypto/:coinId" element={<CryptoDetails />} />
    </Routes>
  );
};

export default MainRoute;
