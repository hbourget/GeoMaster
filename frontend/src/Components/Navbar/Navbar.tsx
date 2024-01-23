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
    backgroundColor: '#4ABBFF',
    color: '#fff',
  });

  const sideSectionStyle = css({
    display: 'flex',
    alignItems: 'center',
  });

  const middleSectionStyle = css({
    display: 'flex',
  });

  const linkStyle = css({
    marginLeft: '10px',
    fontSize: '20px',
    color: '#fff',
    padding: '8px ',
    fontWeight: 'bold',
    _hover: {
      color: '#007BFF !important',
      transition: '0.5s',
    },
  });

  const buttonStyle = css({
    width: '70%',
    backgroundColor: '#004590',
    _hover: {
      color: '#fff',
      backgroundColor: '#007BFF !important',
      transition: '0.5s',
    },
  });

  const start = {
    width: '70%',
    backgroundColor: '#004590',
    border: 'none',
    _hover: {
      color: '#black',
      backgroundColor: '#fff !important',
      transition: '0.5s',
    },
  };

  return (
    <div className={navbarStyle}>
      <div className={middleSectionStyle}>
        <Link className={linkStyle} to="/home">
          Home
        </Link>
        <Link className={linkStyle} to="/party">
          Party
        </Link>
        <Link className={linkStyle} to="/inscription">
          Inscription
        </Link>
      </div>
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
              value={userInput}
              autoComplete="user"
              type="text"
              placeholder="Nom d'utilisateur"
              marginRight={2}
              backgroundColor={'white'}
            />
            <Input
              onChange={(e) => setPasswordInput(e.target.value)}
              value={passwordInput}
              autoComplete="current-password"
              type="password"
              placeholder="Mot de passe"
              marginRight={2}
              backgroundColor={'white'}
            />
            <button type="button" className="btn btn-primary" style={start}>
              Connexion
            </button>
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
