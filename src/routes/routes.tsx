import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import News from '../pages/News/index';


const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
};

export default MainRoute;
