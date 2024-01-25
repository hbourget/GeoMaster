import { css } from '@styled-system/css';
import { useGetQuery, useGetQueryProut } from '../../Hooks/useQuery';
import planet from '../../assets/img/planet.png';
import { useQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAtom, atom } from 'jotai';
import { useEffect } from 'react';

const userAtom = atom({
  isLoggedIn: false,
  username: null,
});

const leaderboard = css({
  position: 'relative',
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  height: '400px',
  backgroundColor: '#007BFF',
  borderRadius: '8px',
  overflowY: 'auto',
  color: 'white',
  textAlign: 'center',
  textShadow: '0 0 10px black',
  boxShadow: '0 0 10px black',
  margin: 'auto',
});

const MasterligneStyles = {
  backgroundColor: '#004590',
  borderRadius: '8px',
  padding: '3%',
  marginBottom: '2%',
  fontWeight: 'bold',
};

const ligneStyles = {
  backgroundColor: '#4ABBFF',
  borderRadius: '8px',
  padding: '3%',
  marginBottom: '2%',
  fontWeight: 'bold',
};

type User = {
  id: number;
  username: string;
  balance: number;
};

const Accueil = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const username = isLoggedIn ? localStorage.getItem('username') : null;
    setUser({ isLoggedIn, username });
  }, []);

  const SERVER_IP = import.meta.env.SERVER_IP;

  const gameScores = useGetQueryProut<User[]>({
    queryKey: ['users', 'scoreboard'],
    url: `http://${SERVER_IP}:8080/users`, // Utilisation de la variable SERVER_IP
  });

  const sortedUsers = gameScores.data ? gameScores.data.sort((a, b) => b.balance - a.balance) : [];

  const topUsers = sortedUsers.slice(0, 4);

  const planetStyle = css({
    'position': 'absolute',
    'top': '35%',
    'left': '9%',
    'width': '32%',
    'transition': 'transform 0.3s ease-out', // Ajoutez une transition pour une animation plus douce
    '&:hover': {
      transform: 'scale(1.1)', // Ajustez la valeur selon votre préférence
    },
  });

  const col = css({
    fontWeight: 'normal',
    textShadow: 'none',
  });

  if (gameScores.isLoading) {
    return <div>Loading game score ...</div>;
  } else if (gameScores.isError) {
    return <div>Error loading game score. Please try again later.</div>;
  }

  return (
    <div className="row">
      <div className="col-md-4 text-center">
        <div className={planetStyle}>
          {user.isLoggedIn ? (
            <Link to="/party">
              <div className={planetStyle}>
                <img src={planet} alt="planet" />
              </div>
            </Link>
          ) : (
            <Link to="/home">
              <div className={planetStyle}>
                <img src={planet} alt="planet" />
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="col-md-4 text-center">
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
            marginBottom: '1%',
            color: 'white',
            textShadow: '0 0 10px black',
          }}
        >
          GeoMaster
        </h1>
        <br />
        <div className={leaderboard}>
          <h4>Meilleurs joueurs</h4>
          <br></br>
          <div className="container text-center conteneur">
            <div className="AccueilHover row row-cols-3" style={MasterligneStyles}>
              <div className="col">Rang</div>
              <div className="col">Nom</div>
              <div className="col">Score</div>
            </div>

            {topUsers.map((user, index) => (
              <div key={user.id} className="row row-cols-3 monstyle" style={ligneStyles}>
                <div className={col}>{index + 1}</div>
                <div className={col}>{user.username}</div>
                <div className={col}>{user.balance}</div>
              </div>
            ))}
          </div>
        </div>
        <br></br> <br></br>
      </div>

      <div className="col-md-4 text-center">{/* Contenu de la troisième div */}</div>
    </div>
  );
};

export default Accueil;
