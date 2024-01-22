import { atom } from 'jotai';

export const currentUserID = atom(-1, (get, set, update) => {
  set(currentUserID, update), get(currentUserID);
});

export const currentGameID = atom(-1, (get, set, update) => {
  set(currentGameID, update), get(currentGameID);
});

export const currentGameStatus = atom(-1, (get, set, update) => {
  set(currentGameStatus, update), get(currentGameStatus);
});

export const flagGuess = atom([], (get, set, update) => {
  set(flagGuess, update), get(flagGuess);
});

export const mapGuess = atom([], (get, set, update) => {
  set(mapGuess, update), get(mapGuess);
});

export const monumentGuess = atom([], (get, set, update) => {
  set(monumentGuess, update), get(monumentGuess);
});
