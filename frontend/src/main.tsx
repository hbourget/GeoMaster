import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import './index.scss'

const emotionCache = createCache({ key: 'emotion-css-cache', prepend: true });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CacheProvider>
  </React.StrictMode>,
);
