import { css } from '@styled-system/css';
import { useGetQuery } from '../../Hooks/useQuery';
import { currentGameID, currentUserID } from '../../jotai';
import { useAtom } from 'jotai';
import { Text } from '@chakra-ui/react';

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

type ApiResponse = {
  userIdsAndScores: Record<string, number>;
};

const Accueil = () => {
  const [gameID] = useAtom(currentGameID);
  const [userID] = useAtom(currentUserID);

  const gameScores = useGetQuery<User[]>({
    queryKey: ['users', 'score'],
    url: 'http://localhost:8080/users',
  });

  const endGameScore = useGetQuery<ApiResponse>({
    queryKey: ['user', 'game'],
    url: `http://localhost:8080/game/g/${gameID}`,
  });

  const sortedUsers = gameScores.data ? gameScores.data.sort((a, b) => b.balance - a.balance) : [];

  const userScore = endGameScore.data ? endGameScore.data.userIdsAndScores[userID] : null;

  const topUsers = sortedUsers.slice(0, 4);

  if (gameScores.isLoading) {
    return <div>Loading...</div>;
  }

  if (gameScores.isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className={containerStyle}>
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
      {userID !== -1 && gameID !== -1 && (
        <div>
          <Text fontSize={'3xl'}>Votre score de la derniere partie {userScore}</Text>
        </div>
      )}
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
            <div key={user.id} className="AccueilHover row row-cols-3" style={ligneStyles}>
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
