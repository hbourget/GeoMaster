import { useState } from 'react';
import World from '@svg-maps/world';
import RadioSVGMap from './RadioSVGMap';
import { getLocationName } from './utils';

function RadioMap(props) {
  const [pointedLocation, setPointedLocation] = useState(null);
  const [focusedLocation, setFocusedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationMouseOver = (event) => {
    const pointedLocation = getLocationName(event);
    setPointedLocation(pointedLocation);
  };

  const handleLocationMouseOut = () => {
    setPointedLocation(null);
  };

  const handleLocationFocus = (event) => {
    const focusedLocation = getLocationName(event);
    setFocusedLocation(focusedLocation);
  };

  const handleLocationBlur = () => {
    setFocusedLocation(null);
  };

  const handleOnChange = (selectedNode) => {
    setSelectedLocation(selectedNode.attributes.name.value);
  };

  return (
    <article className="examples__block">
      <h2 className="examples__block__title">Australia SVG map as radio buttons</h2>
      <div className="examples__block__info">
        <div className="examples__block__info__item">Pointed location: {pointedLocation}</div>
        <div className="examples__block__info__item">Focused location: {focusedLocation}</div>
        <div className="examples__block__info__item">Selected location: {selectedLocation}</div>
      </div>
      <div className="examples__block__map examples__block__map--australia">
        <RadioSVGMap
          map={World}
          onLocationMouseOver={handleLocationMouseOver}
          onLocationMouseOut={handleLocationMouseOut}
          onLocationFocus={handleLocationFocus}
          onLocationBlur={handleLocationBlur}
          onChange={handleOnChange}
        />
      </div>
    </article>
  );
}

// RadioSVGMap.propTypes = {
//   selectedLocationId: PropTypes.string,
//   onChange: PropTypes.func,
//   map: PropTypes.shape({
//     viewBox: PropTypes.string.isRequired,
//     locations: PropTypes.arrayOf(
//       PropTypes.shape({
//         path: PropTypes.string.isRequired,
//         name: PropTypes.string,
//         id: PropTypes.string
//       })
//     ).isRequired,
//     label: PropTypes.string
//   }).isRequired,
//   className: PropTypes.string,
//   locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   locationAriaLabel: PropTypes.func,
//   onLocationMouseOver: PropTypes.func,
//   onLocationMouseOut: PropTypes.func,
//   onLocationMouseMove: PropTypes.func,
//   onLocationFocus: PropTypes.func,
//   onLocationBlur: PropTypes.func,
//   childrenBefore: PropTypes.node,
//   childrenAfter: PropTypes.node,
// };

export default RadioMap;
