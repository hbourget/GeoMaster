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

const FlagGuesser = (props) => {
  return (
    <div className={containerStyle}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', textShadow: '0 0 10px black' }}>
        FlagGuesser
      </h1>
      <div className={flagContainer}>
        <img src={props.url} alt="Flag" className={imageStyle} />
        <span style={{ color: 'black' }}>Temps restant : {props.timer}</span>

        <p>Connaissez-vous le nom du drapeau ?</p>
        <Input
          placeholder="Country"
          marginRight={2}
          backgroundColor={'white'}
          color={'black'}
          boxShadow={'0 0 10px black'}
          width={'50%'}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default FlagGuesser;
