import React from 'react';
import { Link } from 'react-router-dom';
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

const Accueil = () => {
  return (
    <div className={containerStyle}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>Bienvenue</h1>
      <br></br><br></br><br></br>

      <Link to="/Party">
        <button
          style={{ background: '#646464', padding: '15px', color: '#fff', borderRadius: '5px' }}
        >
          Accéder à la liste des rooms
        </button>
      </Link>
    </div>
  );
};

export default Accueil;
