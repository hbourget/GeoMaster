import { useEffect, useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';
import { useAtom } from 'jotai';
import {
  currentGameID,
  currentUserID,
  flagGuess,
  gameIteration,
  mapGuess,
  monumentGuess,
} from '../../jotai';
import { useMutation } from '@tanstack/react-query';
import { Center, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { ElementRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FlagGuesser from '../FlagGuesser/FlagGuesser';
import Monument from '../Monument/Monument';

const sendGameData = async (userId: number, gameId: number, gameData: string[]) => {
  const filteredArray = gameData.map((value) => {
    if (value === '') return 'Unknown';
    else if (value === null) return 'Unknown';
    else return value;
  });
  console.log('Radiomap game play debug:');
  console.log('Array:', filteredArray);
  console.log('userid:', userId);
  console.log('gameid:', gameId);

  console.log('debug');
  console.log(
    JSON.stringify({
      userId: userId,
      gameId: gameId,
      countryGuesses: filteredArray,
    }),
  );

  const response = await fetch(`http://159.65.52.6:8080/game/play`, {
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

  return response.json();
};

const containerStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  overflow: 'hidden',
});

const zoomControlStyle = css({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
  width: '100%',
  position: 'absolute',
  top: '10px',
  zIndex: '2',
});

const RadioMap = () => {
  const GAME_TIMER = 5;
  const [GAME_ITERATION] = useAtom(gameIteration);
  const GAME_TYPE = 3;

  const navigate = useNavigate();

  const [score, setScore] = useState(0);

  const [userID] = useAtom(currentUserID);
  const [gameID] = useAtom(currentGameID);

  const [countriesFlag] = useAtom(flagGuess);
  const [countriesMap] = useAtom(mapGuess);
  const [countriesMonument] = useAtom(monumentGuess);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timer, setTimer] = useState(GAME_TIMER);
  const [arrayData, setArrayData] = useState([]);
  const [iteration, setIteration] = useState(GAME_ITERATION);
  const guessIteration = GAME_ITERATION - iteration;
  const [gameType, setGameType] = useState(GAME_TYPE);
  const [gameEnd, setGameEnd] = useState(false);

  // MAX
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const locationsRef = useRef<ElementRef<'div'>>(null);
  // MAX

  const [inputValue, setInputValue] = useState('');

  const handleLocationMouseOver = (event) => {
    getLocationName(event);
  };

  const sendGameDataMutation = useMutation({
    mutationFn: () => sendGameData(userID, gameID, arrayData),
    onSuccess: (data) => {
      console.log('Radio map success send game data');
      console.log(data);
      setScore(data.userIdsAndScores[userID]);
    },
    retry: false,
  });

  useEffect(() => {
    const handleTimerEnd = () => {
      if (gameType === 2) arrayData.push(selectedLocation);
      else arrayData.push(inputValue);
      setIteration((prevIteration) => prevIteration - 1);
      setTimer(GAME_TIMER);
      setInputValue('');

      if (iteration === 1) {
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
        navigate('/home');
      }
    };

    if (gameEnd) return;

    const interval = setInterval(() => {
      if (timer > 1 && userID !== -1 && gameID !== -1) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 1) {
        handleTimerEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    GAME_ITERATION,
    arrayData,
    gameEnd,
    gameID,
    gameType,
    inputValue,
    iteration,
    navigate,
    selectedLocation,
    sendGameDataMutation,
    timer,
    userID,
  ]);

  const handleOnChange = (selectedNode: SVGPathElement) => {
    const country = selectedNode.getAttribute('name');
    console.log('country:', country);
    setSelectedLocation(country);
  };

  // MAX
  const handleZoom = (deltaY: number) => {
    setZoomLevel((prevZoom) => {
      const newZoom = deltaY > 0 ? prevZoom - 0.1 : prevZoom + 0.1;
      return Math.max(1, Math.min(newZoom, 3));
    });
  };

  const handlePanStart: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setPanning(true);
    setPanStart({ x: event.clientX, y: event.clientY });
  };

  const handlePanMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (panning) {
      const dx = event.clientX - panStart.x;
      const dy = event.clientY - panStart.y;

      setPanOffset({ x: panOffset.x + dx, y: panOffset.y + dy });
      setPanStart({ x: event.clientX, y: event.clientY });
    }

    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePanEnd = () => {
    setPanning(false);
  };

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    // event.preventDefault();
    handleZoom(event.deltaY);
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (locationsRef.current) {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, []);
  // MAX

  return (
    <div
      className={css({
        width: '99%',
        height: '100%',
        margin: 'auto',
        overflow: 'hidden',
      })}
    >
      {!gameEnd && userID !== -1 && gameID !== -1 && (
        <>
          <Text color="white">
            {gameType === 3 ? (
              <>
                <FlagGuesser
                  timer={timer}
                  url={`https://restfulcountries.com//assets//images//flags//${countriesFlag[guessIteration]}.png`}
                  onChange={handleInput}
                  value={inputValue}
                />
              </>
            ) : gameType === 2 ? (
              <>
                <Center
                  style={{
                    position: 'absolute',
                    top: '65%',
                    left: '2%',
                    zIndex: 1,
                    textShadow: '0 0 10px black',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    padding: '1%',
                    borderRadius: '8px',
                  }}
                >
                  <Center flexDir="column">
                    <Text fontSize={'3xl'} color={'white'}>
                      Votre score est : <span className="scoreuser">{score}</span>
                    </Text>
                    <Text fontSize="2xl" color="white">
                      <span style={{ color: 'white' }}>Country: </span>
                      <span style={{ color: '#FCFF00' }}>{countriesMap[guessIteration]}</span>
                    </Text>

                    <Text fontSize="2xl" color="white">
                      Il vous reste {timer}s
                    </Text>
                  </Center>
                </Center>
                <div
                  className={containerStyle}
                  onMouseMove={handlePanMove}
                  onMouseUp={handlePanEnd}
                  onWheel={handleWheel}
                >
                  <div
                    className={zoomControlStyle}
                    style={{
                      transformOrigin: `${
                        ((mousePosition.x - panOffset.x) / locationsRef.current?.clientWidth) * 100
                      }% ${
                        ((mousePosition.y - panOffset.y) / locationsRef.current?.clientHeight) * 100
                      }%`,
                    }}
                  ></div>

                  <div
                    style={{
                      width: '60%',
                      height: '100%',
                      margin: 'auto',
                      overflow: 'hidden',
                      transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                      cursor: panning ? 'grabbing' : 'grab',
                    }}
                    onMouseDown={handlePanStart}
                    ref={locationsRef}
                  >
                    <RadioSVGMap
                      map={World}
                      onLocationMouseOver={handleLocationMouseOver}
                      // onLocationMouseOut={handleLocationMouseOut}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
              </>
            ) : gameType === 1 ? (
              <>
                <Monument
                  guess={countriesMonument[guessIteration]}
                  timer={timer}
                  onChange={handleInput}
                  value={inputValue}
                />
              </>
            ) : null}
          </Text>
        </>
      )}

      {/* <MapsComponent id="maps">
        <LayersDirective>
          <LayerDirective shapeData={world_map}></LayerDirective>
        </LayersDirective>
      </MapsComponent> */}
    </div>
  );
};

export default RadioMap;
