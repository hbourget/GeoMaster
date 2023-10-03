import { css } from '@styled-system/css';
import Card from './Components/Card/Card';

function App() {
  return (
    <div
      className={css({
        width: 'screen',
        height: 'prout',
        display: 'flex',
        justifyContent: 'prout',
        alignItems: 'center',
      })}
    >
      <div>Hello 🐼!</div>
      <Card />
    </div>
  );
}

export default App;
