import { useState, useRef, useEffect } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';

const RadioMap = () => {
  const [, setPointedLocation] = useState(null);
  const [, setSelectedLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const locationsRef = useRef<SVGGElement | null>(null);

  const handleZoom = (deltaY) => {
    setZoomLevel((prevZoom) => {
      const newZoom = deltaY > 0 ? prevZoom - 0.1 : prevZoom + 0.1;
      return Math.max(1, Math.min(newZoom, 3)); // Limitation du niveau de zoom
    });
  };

  const handlePanStart = (event) => {
    setPanning(true);
    setPanStart({ x: event.clientX, y: event.clientY });
  };

  const handlePanMove = (event) => {
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

  const handleLocationMouseOver = (event) => {
    const pointedLocation = getLocationName(event);
    setPointedLocation(pointedLocation);
  };

  const handleLocationMouseOut = () => {
    setPointedLocation(null);
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
    setSelectedLocation(selectedNode.attributes.name.value);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    handleZoom(event.deltaY);
  };

  useEffect(() => {
    if (locationsRef.current) {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [locationsRef.current]);

  const containerStyle = css({
    width: '100%',
    marginTop: '2%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'relative',
  });

  const zoomControlStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    width: '60%',
    position: 'absolute',
    top: '10px',
  });

  return (
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
          }% ${((mousePosition.y - panOffset.y) / locationsRef.current?.clientHeight) * 100}%`,
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
          onLocationMouseOut={handleLocationMouseOut}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default RadioMap;
