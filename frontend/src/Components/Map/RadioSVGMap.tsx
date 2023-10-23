import { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import SVGMap from './SVGMap';

class RadioSVGMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
    };

    this.locations = createRef();

    this.getLocationTabIndex = this.getLocationTabIndex.bind(this);
    this.isLocationSelected = this.isLocationSelected.bind(this);
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.handleLocationKeyDown = this.handleLocationKeyDown.bind(this);
  }

  componentDidMount() {
    const { selectedLocationId } = this.props;

    if (selectedLocationId) {
      const selectedLocation = this.locations.current
        .getElementsByTagName('path')
        .find((location) => location.id === selectedLocationId);

      this.setState({ selectedLocation });
    }
  }

  getLocationTabIndex(location, index) {
    let tabIndex = null;

    if (this.state.selectedLocation) {
      tabIndex = this.isLocationSelected(location) ? '0' : '-1';
    } else {
      tabIndex = index === 0 ? '0' : '-1';
    }

    return tabIndex;
  }

  isLocationSelected(location) {
    return this.state.selectedLocation && this.state.selectedLocation.id === location.id;
  }

  selectLocation(location) {
    location.focus();
    this.setState({ selectedLocation: location });

    if (this.props.onChange) {
      this.props.onChange(location);
    }
  }

  handleLocationClick(event) {
    const clickedLocation = event.target;

    if (clickedLocation !== this.state.selectedLocation) {
      this.selectLocation(clickedLocation);
    }
  }

  handleLocationKeyDown(event) {
    const focusedLocation = event.target;

    if (event.keyCode === 32) {
      event.preventDefault();

      if (focusedLocation !== this.state.selectedLocation) {
        this.selectLocation(focusedLocation);
      } else if (event.keyCode === 39 || event.keyCode === 40) {
        event.preventDefault();

        this.selectLocation(
          focusedLocation.nextSibling || this.locations.current.getElementsByTagName('path')[0],
        );
      } else if (event.keyCode === 37 || event.keyCode === 38) {
        event.preventDefault();

        this.selectLocation(
          focusedLocation.previousSibling ||
            this.locations.current.getElementsByTagName('path')[
              this.locations.current.getElementsByTagName('path').length - 1
            ],
        );
      }
    }
  }

  render() {
    return (
      <SVGMap
        map={this.props.map}
        role="radiogroup"
        locationTabIndex={this.getLocationTabIndex}
        locationRole="radio"
        className={this.props.className}
        locationClassName={this.props.locationClassName}
        locationAriaLabel={this.props.locationAriaLabel}
        isLocationSelected={this.isLocationSelected}
        onLocationClick={this.handleLocationClick}
        onLocationKeyDown={this.handleLocationKeyDown}
        onLocationMouseOver={this.props.onLocationMouseOver}
        onLocationMouseOut={this.props.onLocationMouseOut}
        onLocationMouseMove={this.props.onLocationMouseMove}
        onLocationFocus={this.props.onLocationFocus}
        onLocationBlur={this.props.onLocationBlur}
        onChange={this.props.onChange}
        childrenBefore={this.props.childrenBefore}
        childrenAfter={this.props.childrenAfter}
        ref={this.locations}
      />
    );
  }
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
//         id: PropTypes.string,
//       }),
//     ).isRequired,
//     label: PropTypes.string,
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

export default RadioSVGMap;
