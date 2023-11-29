/**
 * Return the id of the location targeted by the event
 * @param  {Event} event Occured event
 * @return {String}      Id of the location
 */
export function getLocationId(event: { target: { id: any } }) {
  return event.target.id;
}

/**
 * Return the name of the location targeted by the event
 * @param  {Event} event Occured event
 * @return {String}      Name of the location
 */
export function getLocationName(event: { target: { attributes: { name: { value: any } } } }) {
  return event.target.attributes.name.value;
}

/**
 * Indicate if the location targeted by the event is selected
 * @param  {Event} event Occured event
 * @return {Boolean}     Is the location selected
 */
export function getLocationSelected(event: {
  target: { attributes: { [x: string]: { value: string } } };
}) {
  return event.target.attributes['aria-checked'].value === 'true';
}
