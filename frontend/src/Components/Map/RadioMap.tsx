import React, { useState, useRef, useEffect } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';

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
  const [prouti, setPointedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panning, setPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const locationsRef = useRef<SVGGElement | null>(null);

  const handleZoom = (deltaY) => {
    setZoomLevel((prevZoom) => {
      const newZoom = deltaY > 0 ? prevZoom - 0.1 : prevZoom + 0.1;
      return Math.max(1 , Math.min(newZoom, 3)); // Limitation du niveau de zoom
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
    position: 'relative', // Ajout de cette propriété
  });

  const zoomControlStyle = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    width: '60%',
    position: 'absolute', // Ajout de cette propriété
    top: '10px', // Ajustez cette valeur selon votre mise en page
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
          transformOrigin: `${(mousePosition.x - panOffset.x) / locationsRef.current?.clientWidth * 100}% ${(mousePosition.y - panOffset.y) / locationsRef.current?.clientHeight * 100}%`,
        }}
      >
        {/* ... Boutons Zoom In et Zoom Out ici si vous le souhaitez */}
      </div>

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

      <div className={infoRoomStyle}>
        <p>NOM ROOM</p>
        <br />
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
      </div>
    </div>
  );
};

export default RadioMap;