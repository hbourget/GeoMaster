import { css } from '@styled-system/css';
import RadioMap from './Components/Map/RadioMap';

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
      <RadioMap />
    </div>
  );
}

export default App;
