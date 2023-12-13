package com.ics.geomaster.game.models;

import java.util.List;
import java.util.Map;

public class GameUpdateDTO {
    private Integer gameId;
    private Integer userId;
    private Map<Integer, Integer> userIdsAndScores;
    private List<String> countryGuesses;

    public GameUpdateDTO() {
    }

    public GameUpdateDTO(Integer gameId, Integer userId) {
        this.gameId = gameId;
        this.userId = userId;
    }

    public GameUpdateDTO(Integer gameId, Integer userId, Map<Integer, Integer> userIdsAndScores) {
        this.gameId = gameId;
        this.userId = userId;
        this.userIdsAndScores = userIdsAndScores;
    }

    public Integer getGameId() {
        return gameId;
    }

    public Integer getUserId() {
        return userId;
    }

    public Map<Integer, Integer> getUserIdsAndScores() {
        return userIdsAndScores;
    }

    public void setCountryGuesses(List<String> countryGuesses) {
        this.countryGuesses = countryGuesses;
    }

    public List<String> getCountryGuesses() {
        return countryGuesses;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setUserIdsAndScores(Map<Integer, Integer> userIdsAndScores) {
        this.userIdsAndScores = userIdsAndScores;
    }

    @Override
    public String toString() {
        return "GameUpdateDTO{" +
                "gameId=" + gameId +
                ", userId=" + userId +
                ", userIdsAndScores=" + userIdsAndScores +
                '}';
    }
}

