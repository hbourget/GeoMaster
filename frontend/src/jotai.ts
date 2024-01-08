import { atom } from 'jotai';

export const currentUserID = atom({ id: -1 }, (get, set, update) => {
  set(currentUserID, update), get(currentUserID);
});
