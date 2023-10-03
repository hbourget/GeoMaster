import { css } from '@styled-system/css';
import Card from './Components/Card/Card';
import { css } from '@styled-system/css';
import Card from './Components/Card/Card';
function App() {
  return (
    <div
      className={css({
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <div>Hello 🐼!</div>
      <Card />
    </div>
  );
}

export default App;
