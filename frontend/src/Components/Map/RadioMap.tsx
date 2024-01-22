import { useEffect, useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';
import { useAtom } from 'jotai';
import { currentGamePlaying } from '../../jotai';

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

const RadioMap = () => {
  const GAME_TIMER = 10;
  const GAME_ITERATION = 5;
  const GAME_TYPE = 3;

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timer, setTimer] = useState(GAME_TIMER);
  const [currentGameState, setCurrentGameState] = useAtom(currentGamePlaying);
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

  useEffect(() => {
    const handleTimerEnd = () => {
      arrayData.push(selectedLocation);
      setIteration((prevIteration) => prevIteration - 1);
      setTimer(GAME_TIMER);

      if (iteration === 1) {
        // TODO: array is filled with user data, make a request if needed
        handleGameEnd();
      }
    };

    const handleGameEnd = () => {
      console.log('arrayData:', arrayData);
      setCurrentGameState('end');
      setGameType((prevGameType) => prevGameType - 1);
      setIteration(GAME_ITERATION);
      setArrayData([]);

      if (gameType === 1) {
        setGameEnd(true);
        // TODO: Make a request to the server
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
  }, [arrayData, gameEnd, gameType, iteration, selectedLocation, setCurrentGameState, timer]);

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
      {!gameEnd && <p style={{ color: 'white' }}>Temps restant : {timer}</p>}
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
