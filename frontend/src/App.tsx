import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { css } from '@styled-system/css';
import Navbar from './Components/Map/Navbar';
import RadioMap from './Components/Map/RadioMap';
import Party from './Components/Map/Party';
import Inscription from './Components/Map/Inscription';

const containerStyle = css({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'radial-gradient(circle, #35B2F1, #003366)',
  flexDirection: 'column',
});

const contentStyle = css({
  flex: 1,
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
});

const App = () => {
  return (
    <Router>
      <div className={containerStyle}>
        <Navbar />
        <div className={contentStyle}>
          <Routes>
            <Route path="/home" element={<RadioMap />} />
            <Route path="/party" element={<Party />} />
            <Route path="/inscription" element={<Inscription />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
