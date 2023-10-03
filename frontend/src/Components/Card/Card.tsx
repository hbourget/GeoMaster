import { css } from '@styled-system/css';

function App() {
  return (
    <div>
      <p
        className={css({
          fontWeight: 'bold',
        })}
      >
        Card component
      </p>
    </div>
  );
}

export default App;
