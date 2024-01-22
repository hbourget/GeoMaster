import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@styled-system/css';
import { Button, Input } from '@chakra-ui/react';
// import { usePostQuery } from '../../Hooks/useQuery';
import { useMutation } from '@tanstack/react-query';
import { currentUserID } from '../../jotai';
import { useAtom } from 'jotai';

const login = async (data) => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    mode: 'cors',
  });
  const json = await response.json();
  return json;
};

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [, setUserID] = useAtom(currentUserID);

  const [userInput, setUserInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const mutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      console.log('dataLogin:', data);
      localStorage.setItem('token', data.access_token);
      setUserID(data.userId);
      setLoggedIn(true);
      setUser(userInput);
    },
  });

  const handleLogin = () => {
    mutation.mutate({ username: userInput, password: passwordInput });
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

  const inputStyle = css({
    width: '50%',
    backgroundColor: '#fff',
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

  const ConnexionButtonStyle = css({
    width: '100%',
  });


  return (
    <div className={navbarStyle}>
      <div className={sideSectionStyle}>{user && <span>Bienvenue, {user} !</span>}</div>
      <div className={middleSectionStyle}>
        <Link className={buttonStyle} to="/Accueil">
        Accueil
        </Link>
        <Link className={buttonStyle} to="/party">
          Party
        </Link>
        <Link className={buttonStyle} to="/inscription">
          Inscription
        </Link>
      </div>
      <div className={sideSectionStyle}>
        {!loggedIn ? (
          <form
            className={css({
              display: 'flex',
              marginRight: '30px',
            })}
            action="GET"
          >
            <Input
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              autoComplete="user"
              type="text"
              placeholder="Nom d'utilisateur"
            />
            <Input
              onChange={(e) => setPasswordInput(e.target.value)}
              value={passwordInput}
              autoComplete="current-password"
              type="password"
              placeholder="Mot de passe"
            />
            <Button className={ConnexionButtonStyle} onClick={() => handleLogin()}>
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
