import { useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';
import { css } from '@styled-system/css';

const RadioMap = () => {
  const [pointedLocation, setPointedLocation] = useState(null);
  // const [focusedLocation, setFocusedLocation] = useState(null);
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
    <article className={css({ width: 'inherit', height: 'inherit' })}>
      <h2 className="examples__block__title">Australia SVG map as radio buttons</h2>
      <div className="examples__block__info">
        <div className="examples__block__info__item">Pointed location: {pointedLocation}</div>
        <div className="examples__block__info__item">Selected location: {selectedLocation}</div>
      </div>
      <div className="examples__block__map examples__block__map--australia">
        <RadioSVGMap
          map={World}
          onLocationMouseOver={handleLocationMouseOver}
          onLocationMouseOut={handleLocationMouseOut}
          onChange={handleOnChange}
        />
      </div>
    </article>
  );
};

export default RadioMap;
