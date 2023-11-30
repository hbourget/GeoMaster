import React from 'react';
import { useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';
import Navbar from './Navbar';

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
  const [pointedLocation, setPointedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
      <RadioSVGMap
        map={World}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
        onChange={handleOnChange}
      />

      <div className={infoRoomStyle}>
        <p>Room : NOM ROOM</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
        <p>Maxime - SCORE</p>
      </div>
    </div>
  );
};

export default RadioMap;
