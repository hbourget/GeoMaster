import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@styled-system/css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (username: string, password: string) => {
    setUser(username);
    console.log(password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
    console.log(currentPage);
    setCurrentPage('Home');
  };

  const navbarStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
  });

  const leftSectionStyle = css({
    display: 'flex',
    alignItems: 'center',
  });

  const middleSectionStyle = css({
    display: 'flex',
  });

  const buttonStyle = css({
    marginLeft: '10px',
    backgroundColor: '#555 !important',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    _hover: {
      backgroundColor: '#777 !important',
    },
  });

  const rightSectionStyle = css({
    display: 'flex',
    alignItems: 'center',
  });

  const inputStyle = css({
    marginRight: '8px',
    padding: '4px',
    color: 'black !important',
  });

  return (
    <div className={navbarStyle}>
      <div className={leftSectionStyle}>{user && <span>Bienvenue, {user} !</span>}</div>
      <div className={middleSectionStyle}>
        <Link className={buttonStyle} to="/home">
          Home
        </Link>
        <Link className={buttonStyle} to="/party">
          Party
        </Link>
        <Link className={buttonStyle} to="/inscription">
          Inscription
        </Link>
      </div>
      <p>Score:</p>
      <div className={rightSectionStyle}>
        {!loggedIn ? (
          <div>
            <form action="GET">
              <input
                onChange={(e) => setUserInput(e.target.value)}
                className={inputStyle}
                value={userInput}
                autoComplete="user"
                type="text"
                placeholder="Nom d'utilisateur"
              />
              <input
                className={inputStyle}
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
                autoComplete="current-password"
                type="password"
                placeholder="Mot de passe"
              />
              <button className={buttonStyle} onClick={() => handleLogin('user123', 'password123')}>
                Connexion
              </button>
            </form>
          </div>
        ) : (
          <button className={buttonStyle} onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
