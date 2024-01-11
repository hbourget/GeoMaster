import { atom } from 'jotai';

export const currentUserID = atom(-1, (get, set, update) => {
  set(currentUserID, update), get(currentUserID);
});

const gamePlay = {
  gameID: -1,
  gameName: '',
  gameType: '',
  gameStatus: '',
  gamePlayers: [],
  gameRounds: [],
};

export const currentGamePlaying = atom(gamePlay, (get, set, update) => {
  set(currentUserID, update), get(currentUserID);
});
