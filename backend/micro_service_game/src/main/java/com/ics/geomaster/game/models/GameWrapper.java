package com.ics.geomaster.game.models;

import java.util.List;

public class GameWrapper {
    private Game game;
    private List<Game> games;

    // Getters and Setters
    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }
}
