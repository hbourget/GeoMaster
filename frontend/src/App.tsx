import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { css } from '@styled-system/css';
import Navbar from './Components/Navbar/Navbar';
import RadioMap from './Components/Map/RadioMap';
import Party from './Components/Party/Party';
import Inscription from './Components/Inscription/Inscription';
import FlagGuesser from './Components/FlagGuesser/FlagGuesser';
import Monument from './Components/Map/Monument';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={containerStyle}>
          <Navbar />
          <div className={contentStyle}>
            <Routes>
              <Route path="/" element={<RadioMap />} />
              <Route path="/home" element={<RadioMap />} />
              <Route path="/party" element={<Party />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/flagguesser" element={<FlagGuesser />} />
              <Route path="/Monument" element={<Monument />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
