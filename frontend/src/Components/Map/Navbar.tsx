import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@styled-system/css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const handleLogin = (username, password) => {
    setUser(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
  };

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const middleSectionStyle = {
    display: 'flex',
  };

  const buttonStyle = {
    marginLeft: '10px',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Ajoutez une transition pour un effet de fondu lors du survol
  };

  const buttonHoverStyle = {
    backgroundColor: '#777',
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    marginRight: '8px',
    padding: '4px',
    color: 'black',
  };

  return (
    <div style={navbarStyle}>
      <div style={leftSectionStyle}>{user && <span>Bienvenue, {user} !</span>}</div>
      <div style={middleSectionStyle}>
        <Link to="/home">
          <button style={{ ...buttonStyle, ...(currentPage === 'Home' && buttonHoverStyle) }}>
            Home
          </button>
        </Link>
        <Link to="/party">
          <button style={{ ...buttonStyle, ...(currentPage === 'Party' && buttonHoverStyle) }}>
            Party
          </button>
        </Link>
        <Link to="/inscription">
          <button
            style={{ ...buttonStyle, ...(currentPage === 'Inscription' && buttonHoverStyle) }}
          >
            Inscription
          </button>
        </Link>
      </div>
      <div style={rightSectionStyle}>
        {!loggedIn ? (
          <div>
            <input style={inputStyle} type="text" placeholder="Nom d'utilisateur" />
            <input style={inputStyle} type="password" placeholder="Mot de passe" />
            <button
              style={{ ...buttonStyle, ...(loggedIn && buttonHoverStyle) }}
              onClick={() => handleLogin('user123', 'password123')}
            >
              Connexion
            </button>
          </div>
        ) : (
          <button style={{ ...buttonStyle, ...buttonHoverStyle }} onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
