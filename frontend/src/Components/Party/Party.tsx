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
import {
  currentUserID,
  currentGameID,
  flagGuess,
  mapGuess,
  monumentGuess,
  gameIteration,
} from '../../jotai';
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
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#007BFF',
  boxShadow: '0 0 10px #004590',
  color: 'white',
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
  const response = await fetch(`http://localhost:8080/game/${userId}/${countryNumber}`, {
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
  console.log('Launching game debug:', gameId, userId);
  const response = await fetch(`http://localhost:8080/game/play`, {
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
  console.log('Launching game response:', response);

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
  const [gameID, setGameID] = useAtom(currentGameID);
  const [, setGameIteration] = useAtom(gameIteration);
  const [, setCountriesFlag] = useAtom(flagGuess);
  const [, setCountriesMap] = useAtom(mapGuess);
  const [, setCountriesMonument] = useAtom(monumentGuess);
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();
  const [countryNumber, setCountryNumber] = useState(5);

  const gamesList = useGetQuery<Party[]>({
    queryKey: ['game', 'all'],
    url: 'http://localhost:8080/game/all',
  });

  const createGameMutation = useMutation({
    mutationFn: () => createRoom(userID, countryNumber),
    onSuccess(data) {
      console.log('Party create game data');
      console.log(data);
      setGameID(data.id);
      setGameIteration(data.numberOfCountriesPerRound);
      setCountriesFlag(data.countriesFlag);
      setCountriesMap(data.countriesMap);
      setCountriesMonument(data.countriesMonument);
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
    mutationFn: () => launchGame(gameID, userID),
    onSuccess(data) {
      console.log('Party on success launch game data:', data);
    },
    onError(error, variables) {
      console.error('Party on Error launching game error:', error);
      console.error('Party on Error launching game variables:', variables);
    },
  });

  const handleCreateRoom = async () => {
    createGameMutation.mutate();
    setPlay(true);
  };

  const handleJoinRoom = (roomId: number) => {
    console.log(`Party handle join room ${roomId} for user ${userID}`);
    // joinGameMutation.mutate(roomId); // Pass the roomId to the mutate function
    launchGameMutation.mutate();
    setGameID(roomId);
    navigate('/game');
  };

  const Createbutton = {
    backgroundColor: '#004590',
  };

  return (
    <div className={containerStyle} style={{ marginTop: '5%' }}>
      <div className={sectionStyle}>
        <h3 style={{ fontWeight: 'bold', textShadow: '1px 1px 1px black' }}>
          Créer une nouvelle room
        </h3>

        <button
          type="button"
          className="btn btn-primary"
          style={Createbutton}
          onClick={handleCreateRoom}
        >
          Créer
        </button>
        <Flex>
          <Text>Nombre de pays</Text>
          <Slider
            flex="1"
            focusThumbOnChange={false}
            min={1}
            max={20}
            defaultValue={5}
            value={countryNumber}
            onChange={(val) => setCountryNumber(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              style={{ color: 'black' }}
              fontSize="sm"
              boxSize="24px"
              children={countryNumber}
            />
          </Slider>
        </Flex>
      </div>

      <div className={sectionStyle}>
        <h2>Liste des rooms</h2>
        <ul style={{ listStyle: 'none', padding: 0, overflowY: 'auto', maxHeight: '300px' }}>
          {gamesList.isLoading && <div>Loading rooms...</div>}
          {gamesList.isError && <div>Error loading rooms</div>}
          {gamesList.isSuccess &&
            gamesList.data.map(
              (game, index) =>
                game.status !== 2 && (
                  <li key={game.id} className={listItemStyle(index, game.status)}>
                    <span style={{ fontWeight: 'bold' }}>Room #{game.id}</span>
                    <span>{getStatusText(game.status)}</span>
                    <Button className={joinButtonStyle} onClick={() => handleJoinRoom(game.id)}>
                      Rejoindre
                    </Button>
                    {/* TODO add a remove member button if the id of the game he created is the same as the id of the list */}
                  </li>
                ),
            )}
        </ul>
        {play && (
          <Button
            backgroundColor={'#007BFF'}
            onClick={() => {
              launchGameMutation.mutate();
              navigate('/game');
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
