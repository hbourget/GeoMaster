import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@styled-system/css';
import { Button, Input } from '@chakra-ui/react';
import { usePostQuery } from '../../Hooks/useQuery';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const mutation = usePostQuery({ url: 'http://localhost:8080/auth/login' });

  const handleLogin = () => {
    mutation.mutate({ username: userInput, password: passwordInput });
    if (mutation.isSuccess) {
      setLoggedIn(true);
      setUser(userInput);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem('token');
    if (currentPage !== 'Home') {
      setCurrentPage('Home');
    }
  };

  const navbarStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
  });

  const sideSectionStyle = css({
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

  return (
    <div className={navbarStyle}>
      <div className={sideSectionStyle}>{user && <span>Bienvenue, {user} !</span>}</div>
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
      <div className={sideSectionStyle}>
        {!loggedIn ? (
          <form
            className={css({
              display: 'flex',
            })}
            action="GET"
          >
            <Input
              onChange={(e) => setUserInput(e.target.value)}
              // className={inputStyle}
              value={userInput}
              autoComplete="user"
              type="text"
              placeholder="Nom d'utilisateur"
            />
            <Input
              // className={inputStyle}
              onChange={(e) => setPasswordInput(e.target.value)}
              value={passwordInput}
              autoComplete="current-password"
              type="password"
              placeholder="Mot de passe"
            />
            <Button className={buttonStyle} onClick={() => handleLogin()}>
              Connexion
            </Button>
          </form>
        ) : (
          <Button className={buttonStyle} onClick={handleLogout}>
            Déconnexion
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
