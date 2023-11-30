import { transition } from '@chakra-ui/react';
import { css } from '@styled-system/css';

const mapStyle = css({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  fill: '#DBDCB6', // #A8E151 vert
  stroke: 'black',
  strokeWidth: '1px',
  transition: 'fill 0.5s',
});

function SVGMap(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.map.viewBox}
      className={props.className}
      role={props.role}
      aria-label={props.map.label}
    >
      {props.childrenBefore}
      {props.map.locations.map((location, index) => {
        return (
          <path
            id={location.id}
            name={location.name}
            d={location.path}
            className={mapStyle}
            // Carré de selection
            // tabIndex={
            //   typeof props.locationTabIndex === 'function'
            //     ? props.locationTabIndex(location, index)
            //     : props.locationTabIndex
            // }
            role={props.locationRole}
            aria-label={
              typeof props.locationAriaLabel === 'function'
                ? props.locationAriaLabel(location, index)
                : location.name
            }
            aria-checked={props.isLocationSelected && props.isLocationSelected(location, index)}
            onMouseOver={props.onLocationMouseOver}
            onMouseOut={props.onLocationMouseOut}
            onMouseMove={props.onLocationMouseMove}
            onClick={props.onLocationClick}
            onKeyDown={props.onLocationKeyDown}
            onFocus={props.onLocationFocus}
            onBlur={props.onLocationBlur}
            key={location.id}
          />
        );
      })}
      {props.childrenAfter}
    </svg>
  );
}

SVGMap.defaultProps = {
  className: 'svg-map',
  role: 'none',
  locationClassName: 'svg-map__location',
  locationTabIndex: '0',
  locationRole: 'none',
};

export default SVGMap;
