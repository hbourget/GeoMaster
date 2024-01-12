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
  const GAME_TIMER = 2;
  const GAME_ITERATION = 2;
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
    if (gameEnd) {
      console.log('GAME END');
      return;
    }

    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (timer === 0) {
        // todo 1 send a request to the server with the selectedLocation
        // todo 2 update the country to guess
        // todo 3 reset the timer to 10
        arrayData.push(selectedLocation);
        setIteration(iteration - 1);
        setTimer(GAME_TIMER);
        // TODO reset user selection ?
        console.log('timer ended');
        if (iteration === 1) {
          console.log('arrayData:', arrayData);
          setCurrentGameState('end');
          setGameType(gameType - 1);
          // TODO make a request to the server
          setIteration(GAME_ITERATION);
          setArrayData([]);
          if (gameType === 1) {
            console.log('END OF THE GAME');

            setGameEnd(true);
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

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
      <p style={{ color: 'white' }}>Temps restant : {timer}</p>
      {/* // todo add possibility to zoom in and out smoothly with ctrl + mouse wheel */}
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
