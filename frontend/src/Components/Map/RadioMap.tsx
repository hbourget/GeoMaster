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
