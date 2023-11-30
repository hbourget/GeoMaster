package com.ics.geomaster.game.models;

import java.util.List;

public class GameUpdateDTO {
    private Integer gameId;
    private Integer userId;
    private List<String> countryGuesses;

    public GameUpdateDTO() {
    }

    public GameUpdateDTO(Integer gameId, Integer userId, List<String> countryGuesses) {
        this.gameId = gameId;
        this.userId = userId;
        this.countryGuesses = countryGuesses;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<String> getCountryGuesses() {
        return countryGuesses;
    }

    public void setCountryGuesses(List<String> countryGuesses) {
        this.countryGuesses = countryGuesses;
    }

    @Override
    public String toString() {
        return "GameUpdateDTO{" +
                "gameId=" + gameId +
                ", userId=" + userId +
                ", countryGuesses=" + countryGuesses +
                '}';
    }
}

