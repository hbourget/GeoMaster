import { atom } from 'jotai';

export const currentUserID = atom(-1, (get, set, update) => {
  set(currentUserID, update), get(currentUserID);
});
