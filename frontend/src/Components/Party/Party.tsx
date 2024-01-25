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
});

//todo update style for room list to not overflow until screen border
const sectionStyle = css({
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#007BFF',
  boxShadow: '0 0 10px #004590',
  color: 'white',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '450',
  boxSizing: 'border-box',
  overflowY: 'auto',
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'WAITING':
      return 'colorForWaiting';
    case 'FLAGS':
      return 'colorForFlags';
    case 'MAP':
      return 'colorForMap';
    case 'MONUMENTS':
      return 'colorForMonuments';
    default:
      return 'defaultColor';
  }
};

const listItemStyle = (index: number, status: string) =>
  css({
    backgroundColor: index % 2 === 0 ? '#007BFF' : '#007BFF',
    padding: '10px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: getStatusColor(status),
  });

const getStatusText = (status: string) => {
  switch (status) {
    case 'WAITING':
      return 'En attente';
    case 'FLAGS':
      return 'Round des drapeaux';
    case 'MAP':
      return 'Round de la carte';
    case 'MONUMENTS':
      return 'Round des monuments';
    case 'FINISHED':
      return 'Terminé';
    default:
      return 'En attente';
  }
};

const joinButtonStyle = css({
  padding: '12px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

type RoomData = {
  id: number;
  status: string;
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
    <div className={containerStyle} style={{ marginTop: '2%' }}>
      <div className={sectionStyle}>
        <h3 style={{ fontWeight: 'bold', textShadow: '1px 1px 1px black' }}>
          Créer une nouvelle room
        </h3>

        <Button
          type="button"
          marginBottom={2}
          className="btn btn-primary"
          style={Createbutton}
          onClick={handleCreateRoom}
        >
          Créer
        </Button>
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
        <ul style={{ listStyle: 'none', padding: 0, overflowY: 'auto', maxHeight: '230px' }}>
          {gamesList.isLoading && <div>Loading rooms...</div>}
          {gamesList.isError && <div>Error loading rooms</div>}
          {gamesList.isSuccess &&
            gamesList.data.map(
              (game, index) =>
                game.status !== 'FINISHED' && (
                  <li key={game.id} className={listItemStyle(index, game.status)}>
                    <span style={{ fontWeight: 'normal' }}>
                      Room #{game.id} - ({game.countriesFlag.length} pays)
                    </span>
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
            className="mysuccessbutton"
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
