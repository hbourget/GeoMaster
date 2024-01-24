import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { css } from '@styled-system/css';
import Navbar from './Components/Navbar/Navbar';
import RadioMap from './Components/Map/RadioMap';
import Party from './Components/Party/Party';
import Accueil from './Components/Accueil/Accueil';
import Inscription from './Components/Inscription/Inscription';
import FlagGuesser from './Components/FlagGuesser/FlagGuesser';
import Monument from './Components/Monument/Monument';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const containerStyle = css({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4ABBFF',
  // background: 'radial-gradient(circle, #35B2F1, #003366)',
  flexDirection: 'column',
});

const contentStyle = css({
  flex: 1,
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={containerStyle}>
          <Navbar />
          <div className={contentStyle}>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/home" element={<Accueil />} />
              <Route path="/game" element={<RadioMap />} />
              <Route path="/party" element={<Party />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/flag" element={<FlagGuesser />} />
              <Route path="/monument" element={<Monument />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
