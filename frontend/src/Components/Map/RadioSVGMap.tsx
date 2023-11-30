import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import SVGMap from './SVGMap';

type RadioSVGMapProps = {
  selectedLocationId?: string;
  onChange?: (selectedNode: SVGPathElement) => void;
  map: any; // Replace with the appropriate type for your map data
  className?: string;
  locationClassName?: string;
  locationAriaLabel?: string;
  onLocationMouseOver?: (event: React.MouseEvent) => void;
  onLocationMouseOut?: (event: React.MouseEvent) => void;
  onLocationMouseMove?: (event: React.MouseEvent) => void;
  childrenBefore?: React.ReactNode;
  childrenAfter?: React.ReactNode;
};

const RadioSVGMap = ({
  selectedLocationId,
  onChange,
  map,
  className,
  locationClassName,
  locationAriaLabel,
  onLocationMouseOver,
  onLocationMouseOut,
  onLocationMouseMove,
  childrenBefore,
  childrenAfter,
}: RadioSVGMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<SVGPathElement | null>(null);
  const locationsRef = useRef<SVGGElement | null>(null);

  const getLocationTabIndex = (location: SVGPathElement, index: number): string => {
    let tabIndex: string = '-1';

    if (selectedLocation) {
      tabIndex = isLocationSelected(location) ? '0' : '-1';
    } else {
      tabIndex = index === 0 ? '0' : '-1';
    }

    return tabIndex;
  };

  const isLocationSelected = (location: SVGPathElement): boolean =>
    selectedLocation && selectedLocation.id === location.id;

  const selectLocation = (location: SVGPathElement): void => {
    location.focus();
    setSelectedLocation(location);

    if (onChange) {
      onChange(location);
    }
  };

  const handleLocationClick = (event: React.MouseEvent): void => {
    const clickedLocation = event.target as SVGPathElement;

    if (clickedLocation !== selectedLocation) {
      selectLocation(clickedLocation);
    }
  };

  useEffect(() => {
    if (selectedLocationId) {
      if (!locationsRef.current) {
        return;
      }

      const selectedLocationElement = Array.from(
        locationsRef.current.getElementsByTagName('path'),
      ).find((location) => location.id === selectedLocationId);

      setSelectedLocation(selectedLocationElement as SVGPathElement);
    }
  }, [selectedLocationId]);

  return (
    <SVGMap
      map={map}
      role="radiogroup"
      locationTabIndex={getLocationTabIndex}
      locationRole="radio"
      className={className}
      locationClassName={locationClassName}
      locationAriaLabel={locationAriaLabel}
      isLocationSelected={isLocationSelected}
      onLocationClick={handleLocationClick}
      onLocationMouseOver={onLocationMouseOver}
      onLocationMouseOut={onLocationMouseOut}
      onLocationMouseMove={onLocationMouseMove}
      onChange={onChange}
      childrenBefore={childrenBefore}
      childrenAfter={childrenAfter}
      ref={locationsRef}
    />
  );
};

export default RadioSVGMap;
