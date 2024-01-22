import { ReactNode, useEffect, useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';
import { useAtom } from 'jotai';
import { currentGameID, currentUserID, flagGuess, mapGuess, monumentGuess } from '../../jotai';
import { useMutation } from '@tanstack/react-query';
import { Text } from '@chakra-ui/react';

const infoRoomStyle = css({
  marginLeft: '20px',
  marginTop: '20px',
  color: 'white',
  fontWeight: 'bold',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  padding: '10px',
  borderRadius: '8px',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1',
});

const sendGameData = async (userId: number, gameId: number, gameData: string[]) => {
  const filteredArray = gameData.map((value) => (value === null ? 'Unknown' : value));
  console.log('gameData:', gameData);
  console.log('filteredArray:', filteredArray);

  const response = await fetch('http://localhost:8080/game/play', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      userId: userId,
      gameId: gameId,
      countryGuesses: filteredArray,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }
};

const RadioMap = () => {
  const GAME_TIMER = 2;
  const GAME_ITERATION = 5;
  const GAME_TYPE = 3;

  const [userID] = useAtom(currentUserID);
  console.log('userID:', userID);
  const [gameID] = useAtom(currentGameID);
  console.log('gameID:', gameID);

  const [countriesFlag] = useAtom(flagGuess);
  // console.log('countriesFlag:', countriesFlag);
  const [countriesMap] = useAtom(mapGuess);
  // console.log('countriesMap:', countriesMap);
  const [countriesMonument] = useAtom(monumentGuess);
  // console.log('countriesMonument:', countriesMonument);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timer, setTimer] = useState(GAME_TIMER);
  const [arrayData, setArrayData] = useState([]);
  const [iteration, setIteration] = useState(GAME_ITERATION);
  const [gameType, setGameType] = useState(GAME_TYPE); // 3 country, 2 city, 1 flag
  const [gameEnd, setGameEnd] = useState(false);

  const handleLocationMouseOver = (event) => {
    const LocationName = getLocationName(event);
    // console.log('--------------------------------------------');
    // console.log('LocationName:', LocationName);
    // console.log('selectedLocation:', selectedLocation);
  };

  const sendGameDataMutation = useMutation({
    mutationFn: () => sendGameData(userID, gameID, arrayData),
    onSuccess: () => {
      console.log('sendGameDataMutation success');
    },
    onError: () => {
      console.log('sendGameDataMutation error');
    },
  });

  useEffect(() => {
    const handleTimerEnd = () => {
      arrayData.push(selectedLocation);
      setIteration((prevIteration) => prevIteration - 1);
      setTimer(GAME_TIMER);

      if (iteration === 1) {
        // TODO: array is filled with user data, make a request if needed
        handleRoundEnd();
      }
    };

    const handleRoundEnd = () => {
      setGameType((prevGameType) => prevGameType - 1);
      setIteration(GAME_ITERATION);
      sendGameDataMutation.mutate();
      setArrayData([]);

      if (gameType === 1) {
        setGameEnd(true);
      }
    };

    if (gameEnd) return;

    const interval = setInterval(() => {
      if (timer > 1) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 1) {
        handleTimerEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [arrayData, gameEnd, gameType, iteration, selectedLocation, sendGameDataMutation, timer]);

  const handleOnChange = (selectedNode) => {
    const country = selectedNode.attributes.name.value;
    console.log('country:', country);
    // if (!selectedLocation === country) {
    setSelectedLocation(country);
    // }
  };

  return (
    <div
      style={{ marginTop: '1%' }}
      className={css({
        width: '60%',
        height: '100%',
        margin: 'auto',
        overflow: 'hidden',
      })}
    >
      {!gameEnd && userID !== -1 && gameID !== -1 && (
        <>
          <Text fontSize="2xl" color="white">
            You have to guess
            {gameType === 3 ? (
              <Text fontSize="2xl" color="white">
                {countriesFlag[iteration]}
              </Text>
            ) : gameType === 2 ? (
              <Text fontSize="2xl" color="white">
                {countriesMap[iteration]}
              </Text>
            ) : gameType === 1 ? (
              <Text fontSize="2xl" color="white">
                {countriesMonument[iteration]}
              </Text>
            ) : null}
          </Text>
          <p style={{ color: 'white' }}>Temps restant : {timer}</p>
        </>
      )}
      <RadioSVGMap
        map={World}
        onLocationMouseOver={handleLocationMouseOver}
        onChange={handleOnChange}
      />
      <div className={infoRoomStyle}>
        <p>NOM ROOM</p>
        <br></br>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
      </div>
    </div>
  );
};

export default RadioMap;
