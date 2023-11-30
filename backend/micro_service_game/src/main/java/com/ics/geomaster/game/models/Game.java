package com.ics.geomaster.game.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "GAME")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int score;
    @ElementCollection
    private List<String> countriesMap;

    @ElementCollection
    private List<String> countriesFlag;

    @ElementCollection
    private List<String> countriesMonument;

    @ElementCollection
    private List<Integer> userIds;

    private Integer status;

    public Game() {
        this.score = 0;
        this.status = 0;
    }

    public Game(int score, Integer status) {
        this.score = score;
        this.status = status;
    }

    public Game(int score, Integer status, List<String> countriesMap, List<String> countriesFlag, List<String> countriesMonument, List<Integer> userIds) {
        this.score = score;
        this.status = status;
        this.countriesMap = countriesMap;
        this.countriesFlag = countriesFlag;
        this.countriesMonument = countriesMonument;
        this.userIds = userIds;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }

    public Integer getStatus() { return status; }

    public void setStatus(Integer status) { this.status = status; }

    public List<String> getCountriesMap() { return countriesMap; }

    public void setCountriesMap(List<String> countriesMap) { this.countriesMap = countriesMap; }

    public List<String> getCountriesFlag() { return countriesFlag; }

    public void setCountriesFlag(List<String> countriesFlag) { this.countriesFlag = countriesFlag; }

    public List<String> getCountriesMonument() { return countriesMonument; }

    public void setCountriesMonument(List<String> countriesMonument) { this.countriesMonument = countriesMonument; }

    public List<Integer> getUserIds() { return userIds; }

    public void setUserIds(List<Integer> userIds) { this.userIds = userIds; }

}
