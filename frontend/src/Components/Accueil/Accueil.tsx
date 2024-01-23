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

const leaderboard = css({
  position: 'relative',
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  height: '400px',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  overflowY: 'auto',
  color: 'white',
  textAlign: 'center',
  boxShadow: '0 0 10px white',
});

const triangleStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '0 50px 50px 0',
  borderColor: 'transparent #007BFF transparent transparent',
});


const Accueil = () => {
  return (
    <div className={containerStyle}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>Bienvenue</h1>
      <br />
      <button className="btn btn-primary">Primary button</button>




      <div className={leaderboard}>
      <div className={triangleStyle}></div>
      <p>Contenu du conteneur</p>
    </div>




      <br />
      <button
        style={{ background: '#007BFF', padding: '5px', color: '#fff', borderRadius: '5px' }}
      >
        Valider
      </button>
    </div>
  );
};

export default Accueil;
