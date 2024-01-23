import { useEffect, useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';
import { useAtom } from 'jotai';
import { currentGameID, currentUserID, flagGuess, mapGuess, monumentGuess } from '../../jotai';
import { useMutation } from '@tanstack/react-query';
import { Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { ElementRef } from 'react';
import { Combobox, Portal } from '@ark-ui/react';

// import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-react-maps';
// import { world_map } from './world_map';

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

const containerStyle = css({
  width: '100%',
  marginTop: '2%',
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
  const GAME_TIMER = 10;
  const GAME_ITERATION = 5;
  const GAME_TYPE = 3;

  const [userID] = useAtom(currentUserID);
  console.log('userID:', userID);
  const [gameID] = useAtom(currentGameID);
  console.log('gameID:', gameID);

  const [countriesFlag] = useAtom(flagGuess);
  const [countriesMap] = useAtom(mapGuess);
  const [countriesMonument] = useAtom(monumentGuess);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timer, setTimer] = useState(GAME_TIMER);
  const [arrayData, setArrayData] = useState([]);
  const [iteration, setIteration] = useState(GAME_ITERATION);
  const guessIteration = 5 - iteration;
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

  const handleLocationMouseOver = (event) => {
    getLocationName(event);
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
      if (timer > 1 && userID !== -1 && gameID !== -1) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 1) {
        handleTimerEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    arrayData,
    gameEnd,
    gameID,
    gameType,
    iteration,
    selectedLocation,
    sendGameDataMutation,
    timer,
    userID,
  ]);

  const handleOnChange = (selectedNode: SVGPathElement) => {
    const country = selectedNode.getAttribute('name');
    console.log('country:', country);
    // if (!selectedLocation === country) {
    setSelectedLocation(country);
    // }
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
    event.preventDefault();
    handleZoom(event.deltaY);
  };

  useEffect(() => {
    if (locationsRef.current) {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, []);
  // MAX

  const items = ['France', 'Germany', 'Italy', 'Spain', 'United Kingdom'];

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
            You have to guess{' '}
            {gameType === 3 ? 'the country' : gameType === 2 ? 'the city' : 'the flag'} of{' '}
            {gameType === 3 ? (
              <>
                <img
                  src={`https://restfulcountries.com//assets//images//flags//${countriesFlag[guessIteration]}.png`}
                ></img>
                <Combobox.Root items={items} lazyMount unmountOnExit>
                  <Combobox.Label>Countries</Combobox.Label>
                  <Combobox.Control>
                    <Combobox.Input />
                    <Combobox.Trigger>Open</Combobox.Trigger>
                    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
                  </Combobox.Control>
                  <Portal>
                    <Combobox.Positioner>
                      <Combobox.Content>
                        <Combobox.ItemGroup id="countries">
                          <Combobox.ItemGroupLabel htmlFor="countries">
                            Countries
                          </Combobox.ItemGroupLabel>
                          {items.map((item) => (
                            <Combobox.Item key={item} item={item}>
                              <Combobox.ItemText>{item}</Combobox.ItemText>
                              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                            </Combobox.Item>
                          ))}
                        </Combobox.ItemGroup>
                      </Combobox.Content>
                    </Combobox.Positioner>
                  </Portal>
                </Combobox.Root>
              </>
            ) : gameType === 2 ? (
              <>
                <Text fontSize="2xl" color="white">
                  {countriesMap[guessIteration]}
                </Text>
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
                <Text fontSize="2xl" color="white">
                  {countriesMonument[guessIteration]}
                </Text>
                <Combobox.Root items={items} lazyMount unmountOnExit>
                  <Combobox.Label>Countries</Combobox.Label>
                  <Combobox.Control>
                    <Combobox.Input />
                    <Combobox.Trigger>Open</Combobox.Trigger>
                    <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
                  </Combobox.Control>
                  <Portal>
                    <Combobox.Positioner>
                      <Combobox.Content>
                        <Combobox.ItemGroup id="countries">
                          <Combobox.ItemGroupLabel htmlFor="countries">
                            Countries
                          </Combobox.ItemGroupLabel>
                          {items.map((item) => (
                            <Combobox.Item key={item} item={item}>
                              <Combobox.ItemText>{item}</Combobox.ItemText>
                              <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                            </Combobox.Item>
                          ))}
                        </Combobox.ItemGroup>
                      </Combobox.Content>
                    </Combobox.Positioner>
                  </Portal>
                </Combobox.Root>
              </>
            ) : null}
          </Text>
          <p style={{ color: 'white' }}>Temps restant : {timer}</p>
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
