import { css } from '@styled-system/css';

const containerStyle = css({
  width: '100%',
  marginTop: '2%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
});

const flagContainer = css({
  width: '80%',
  maxWidth: '400px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxSizing: 'border-box',
  overflowY: 'auto',
  color: 'black',
  textAlign: 'center',
});

const imageStyle = css({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '20px',
});

const FlagGuesser = () => {
  return (
    <div className={containerStyle}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>FlagGuesser</h1>
      <br></br>
      <div className={flagContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Afghanistan.svg/1200px-Flag_of_Afghanistan.svg.png"
          alt="Flag"
          className={imageStyle}
        />
        <p>Connaissez-vous le nom du drapeau ?</p>
        <br></br>
        <input type="text" name="flag" placeholder="Nom du drapeau" />
        <button
          style={{ background: '#007BFF', padding: '5px', color: '#fff', borderRadius: '5px' }}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default FlagGuesser;
