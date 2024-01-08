import { useState } from 'react';
import { css } from '@styled-system/css';
import { useNavigate } from 'react-router-dom';
import { useGetQuery } from '../../Hooks/useQuery';
import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { currentUserID } from '../../jotai';

const containerStyle = css({
  width: '65%',
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
});

const sectionStyle = css({
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '400px',
  boxSizing: 'border-box',
  overflowY: 'auto',
});

const listItemStyle = (index: number, status: number) =>
  css({
    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#fff',
    padding: '10px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: getStatusColor(status),
  });

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return 'En attente de joueur';
    case 1:
      return 'En cours';
    case 2:
      return 'Terminé';
    default:
      return '';
  }
};

const getStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return 'gray';
    case 1:
      return 'orange';
    case 2:
      return 'green';
    default:
      return 'black';
  }
};

const joinButtonStyle = css({
  'padding': '12px',
  'backgroundColor': '#007BFF',
  'color': '#fff',
  'border': 'none',
  'borderRadius': '4px',
  'cursor': 'pointer',
  'transition': 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

type RoomData = {
  id: number;
  status: number;
};

interface Party extends RoomData {
  countriesFlag: string[];
  countriesMap: string[];
  countriesMonument: string[];
}

// { url: 'http://localhost:8080/game/1' }

const createRoom = async () => {
  // todo: recuperer l'user id dans le state global (jotai)
  const response = await fetch('http://localhost:8080/game/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const joinRoom = async (gameId: number, userId: number) => {
  const response = await fetch(`http://localhost:8080/game/addMember/${gameId}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const Party = () => {
  const [userID] = useAtom(currentUserID);
  console.log('store:', userID);

  // todo put rooms in a global state to not lose them when navigating
  const [rooms, setRooms] = useState([]);
  // const [playerScore, setPlayerScore] = useState(0);
  const navigate = useNavigate();

  const gamesList = useGetQuery<Party[]>({
    queryKey: ['game', 'all'],
    url: 'http://localhost:8080/game/all',
  });

  const createGameMutation = useMutation({
    mutationFn: createRoom,
    onSuccess(data) {
      setRooms((prevRooms) => [...prevRooms, { id: data.id, status: data.status }]);
      console.log('rooms:', rooms);
    },
  });

  const joinGameMutation = useMutation({
    mutationFn: () => joinRoom(1, 1),
    onSuccess(data) {
      console.log('joinGameData:', data);
    },
  });

  const handleCreateRoom = async () => {
    createGameMutation.mutate();
  };

  const handleJoinRoom = (roomId: number) => {
    joinGameMutation.mutate();
    navigate('/home');
    console.log(roomId);
  };

  console.log(gamesList.data);

  return (
    <div className={containerStyle} style={{ marginTop: '2%' }}>
      <div className={sectionStyle}>
        <h2 style={{ fontWeight: 'bold' }}>Créer une nouvelle room</h2>

        <Button className={joinButtonStyle} onClick={handleCreateRoom}>
          Créer
        </Button>
      </div>

      <div className={sectionStyle}>
        <h2 style={{ fontWeight: 'bold', color: 'black' }}>Liste des rooms</h2>
        <ul style={{ listStyle: 'none', padding: 0, overflowY: 'auto', maxHeight: '300px' }}>
          {gamesList.isLoading && <div>Loading rooms...</div>}
          {gamesList.isError && <div>Error loading rooms</div>}
          {gamesList.isSuccess &&
            gamesList.data.map((game, index) => (
              <li key={game.id} className={listItemStyle(index, game.status)}>
                <span style={{ fontWeight: 'bold' }}>Room #{game.id}</span>
                <span>{getStatusText(game.status)}</span>
                <Button className={joinButtonStyle} onClick={() => handleJoinRoom(game.id)}>
                  Rejoindre
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Party;
