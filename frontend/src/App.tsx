import { css } from '@styled-system/css';
import Card from './Components/Card/Card';
import RadioMap from './Components/Map/RadioMap';
import { withDefaultColorScheme } from '@chakra-ui/react';

function App() {
  return (
    <div
      className={css({
        width: 'screen',
        height: 'screen',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <RadioMap className={css({ width: 'inherit', height: 'inherit' })} />
    </div>
  );
}

export default App;
