import { css } from '@styled-system/css';
import { useNavigate } from 'react-router-dom';
import { useGetQuery } from '../../Hooks/useQuery';
import {
  Button,
  Flex,
  Text,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { currentUserID, currentGameID, flagGuess, mapGuess, monumentGuess } from '../../jotai';
import { useState } from 'react';

const containerStyle = css({
  width: '65%',
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
});

//todo update style for room list to not overflow until screen border
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

const createRoom = async (userId: number, countryNumber: number) => {
  const response = await fetch(`http://159.65.52.6:8080/game/${userId}/${countryNumber}`, {
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

const launchGame = async (gameId: number, userId: number) => {
  const response = await fetch(`http://159.65.52.6:8080/game/play`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      userId: userId,
      gameId: gameId,
      countryGuesses: [],
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};

const joinRoom = async (gameId: number, userId: number) => {
  const response = await fetch(`http://159.65.52.6:8080/game/addMember/${gameId}/${userId}`, {
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
  const [, setGameID] = useAtom(currentGameID);
  const [, setCountriesFlag] = useAtom(flagGuess);
  const [, setCountriesMap] = useAtom(mapGuess);
  const [, setCountriesMonument] = useAtom(monumentGuess);
  const [play, setPlay] = useState(false);
  const [tojoinRoomID, setTojoinRoomID] = useState(-1);
  const navigate = useNavigate();
  const [countryNumber, setCountryNumber] = useState(5);

  const gamesList = useGetQuery<Party[]>({
    queryKey: ['game', 'all'],
    url: 'http://159.65.52.6:8080/game/all',
  });

  const createGameMutation = useMutation({
    mutationFn: () => createRoom(userID, countryNumber),
    onSuccess() {
      gamesList.refetch();
    },
  });

  const joinGameMutation = useMutation({
    mutationFn: (roomId: number) => joinRoom(roomId, userID),
    onSuccess(data) {
      setGameID(data.id);
      setCountriesFlag(data.countriesFlag);
      setCountriesMap(data.countriesMap);
      setCountriesMonument(data.countriesMonument);
    },
  });

  const launchGameMutation = useMutation({
    mutationFn: (roomId: number) => launchGame(roomId, userID),
    onSuccess(data) {
      console.log('Launching game data:', data);
    },
    onError(error, variables) {
      console.log('Error launching game:', error);
      console.log('Error launching game variables:', variables);
    },
  });

  const handleCreateRoom = async () => {
    createGameMutation.mutate();
  };

  const handleJoinRoom = (roomId: number) => {
    console.log(`Joining room ${roomId} for user ${userID}`);
    joinGameMutation.mutate(roomId); // Pass the roomId to the mutate function
    // launchGameMutation.mutate(roomId);
    setPlay(true);
    setTojoinRoomID(roomId);
  };

  return (
    <div className={containerStyle} style={{ marginTop: '2%' }}>
      <div className={sectionStyle}>
        <h2 style={{ fontWeight: 'bold' }}>Créer une nouvelle room</h2>

        <Button className={joinButtonStyle} onClick={() => handleCreateRoom()}>
          Créer
        </Button>
        <Flex>
          <Text>Nombre de pays</Text>
          <Slider
            flex="1"
            focusThumbOnChange={false}
            value={countryNumber}
            onChange={(val) => setCountryNumber(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px" children={countryNumber} />
          </Slider>
        </Flex>
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
        {play && (
          <Button
            backgroundColor={'#007BFF'}
            onClick={() => {
              launchGameMutation.mutate(tojoinRoomID);
              navigate('/home');
            }}
          >
            Play
          </Button>
        )}
      </div>
    </div>
  );
};

export default Party;
