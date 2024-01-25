import { css } from '@styled-system/css';
import { useGetQuery, useGetQueryProut } from '../../Hooks/useQuery';
import planet from '../../assets/img/planet.png';
import { useQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
  textShadow: '0 0 10px black',
  boxShadow: '0 0 10px white',
});

const MasterligneStyles = {
  backgroundColor: '#004590',
  borderRadius: '8px',
  padding: '3%',
  marginBottom: '2%',
  fontWeight: 'bold',
};

const ligneStyles = {
  backgroundColor: '#007BFF',
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
  const gameScores = useGetQueryProut<User[]>({
    queryKey: ['users', 'scoreboard'],
    url: 'http://localhost:8080/users',
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

  if (gameScores.isLoading) {
    return <div>Loading game score ...</div>;
  } else if (gameScores.isError) {
    return <div>Error loading game score. Please try again later.</div>;
  }

  return (
    <div className={containerStyle}>
      <div className={planetStyle}>
        <Link to="/party">
          <div className={planetStyle}>
            <img src={planet} alt="planet" />
          </div>
        </Link>
      </div>
      <h1
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '1%',
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
            <div key={user.id} className="AccueilHover row row-cols-3 monstyle" style={ligneStyles}>
              <div className="col">{index + 1}</div>
              <div className="col">{user.username}</div>
              <div className="col">{user.balance}</div>
            </div>
          ))}
        </div>
      </div>
      <br />
    </div>
  );
};

export default Accueil;
