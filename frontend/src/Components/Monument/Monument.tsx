import { css } from '@styled-system/css';
import { Input } from '@chakra-ui/react';

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

const Monument = () => {
  return (
    <div className={containerStyle}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', textShadow: '0 0 10px black' }}>
        Monument
      </h1>
      <br></br>
      <div className={flagContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Afghanistan.svg/1200px-Flag_of_Afghanistan.svg.png"
          alt="monument"
          className={imageStyle}
        />
        <p>De quel PAYS vient ce monument ?</p>
        <br></br>
        <Input
          placeholder="Nom d'utilisateur"
          marginRight={2}
          backgroundColor={'white'}
          color={'black'}
          boxShadow={'0 0 10px black'}
          width={'50%'}
        />
        <button
          style={{ background: '#004590', padding: '5px', color: '#fff', borderRadius: '5px' }}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default Monument;
