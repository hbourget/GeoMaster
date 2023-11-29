import React from 'react';
import { useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';
import Navbar from './Navbar';

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
    </div>
  );
};

export default RadioMap;
