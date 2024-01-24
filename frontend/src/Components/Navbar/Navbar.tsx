import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@styled-system/css';
import { Input } from '@chakra-ui/react';
// import { usePostQuery } from '../../Hooks/useQuery';
import { useMutation } from '@tanstack/react-query';
import { currentUserID, loggedIn } from '../../jotai';
import { useAtom } from 'jotai';
import logo from '../../assets/img/logo.png';

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
  const [isLogin, setIsLogin] = useAtom(loggedIn);
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
      setIsLogin(true);
    },
  });

  const handleLogin = () => {
    mutation.mutate({ username: userInput, password: passwordInput });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
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
    textShadow: '1px 1px 1px #000',
  });

  const sideSectionStyle = css({
    display: 'flex',
    alignItems: 'center',
  });

  const middleSectionStyle = css({
    display: 'flex',
  });

  const linkStyle = css({
    fontSize: '25px',
    color: '#fff',
    padding: '8px ',
    fontWeight: 'bold',
    marginRight: '10px',
    _hover: {
      color: '#007BFF !important',
      transition: '0.5s',
    },
  });

  const connexion = {
    width: '70%',
    backgroundColor: '#004590',
    border: 'none',
    _hover: {
      color: '#black',
      backgroundColor: '#fff !important',
      transition: '0.5s',
    },
  };

  const deconnexion = {
    width: '100%',
    backgroundColor: 'red',
    border: 'none',
    _hover: {
      color: '#black',
      backgroundColor: '#fff !important',
      transition: '0.5s',
    },
  };

  const navbarFlex = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const middleSectionFlex = css({
    display: 'flex',
  });

  const sideSectionFlex = css({
    display: 'flex',
    alignItems: 'center',
  });

  const responsiveStyles = css({
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  });

  const responsiveInputStyles = css({
    'marginBottom': '10px',
    '@media (max-width: 600px)': {
      marginBottom: '0',
    },
  });

  return (
    <div className={`${navbarStyle} ${navbarFlex} ${responsiveStyles}`}>
      <img src={logo} alt="logo" width="100px" height="100px" />
      <div className={`${middleSectionStyle} ${middleSectionFlex}`}>
        {!isLogin ? (
          <>
            <Link className={`${linkStyle} ${responsiveInputStyles}`} to="/home">
              Home
            </Link>
            <Link className={`${linkStyle} ${responsiveInputStyles}`} to="/inscription">
              Inscription
            </Link>
          </>
        ) : (
          <>
            <Link className={`${linkStyle} ${responsiveInputStyles}`} to="/home">
              Home
            </Link>
            <Link className={`${linkStyle} ${responsiveInputStyles}`} to="/party">
              Jouer
            </Link>
          </>
        )}
      </div>

      <div className={`${sideSectionStyle} ${sideSectionFlex}`}>
        {!isLogin ? (
          <form
            className={css({
              display: 'flex',
            })}
            action="GET"
          >
            <Input
              className={`${responsiveInputStyles}`}
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              autoComplete="user"
              type="text"
              placeholder="Nom d'utilisateur"
              marginRight={2}
              backgroundColor={'white'}
              color={'black'}
              boxShadow={'0 0 10px black'}
            />
            <Input
              className={`${responsiveInputStyles}`}
              onChange={(e) => setPasswordInput(e.target.value)}
              value={passwordInput}
              autoComplete="current-password"
              type="password"
              placeholder="Mot de passe"
              marginRight={2}
              backgroundColor={'white'}
              color={'black'}
              boxShadow={'0 0 10px black'}
            />
            <button
              type="button"
              className="btn btn-primary"
              style={connexion}
              onClick={handleLogin}
            >
              Connexion
            </button>
          </form>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            style={deconnexion}
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
