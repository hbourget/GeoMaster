package com.ics.geomaster.game.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "GAME")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ElementCollection
    private List<String> countriesMap;

    @ElementCollection
    private List<String> countriesFlag;

    @ElementCollection
    private List<String> countriesMonument;

    @ElementCollection
    private Map<Integer, Integer> userIdsAndScores;

    private Integer status;

    public Game() {
        this.status = 0;
        this.userIdsAndScores = new HashMap<>();
        this.countriesMonument = new ArrayList<>();
        this.countriesFlag = new ArrayList<>();
        this.countriesMap = new ArrayList<>();
    }

    public Game(Integer status) {
        this.userIdsAndScores = new HashMap<>();
        this.countriesMonument = new ArrayList<>();
        this.countriesFlag = new ArrayList<>();
        this.countriesMap = new ArrayList<>();
        this.status = status;
    }

    public Game( Integer status, List<String> countriesMap, List<String> countriesFlag, List<String> countriesMonument, Map<Integer, Integer> userIds) {
        this.status = status;
        this.countriesMap = countriesMap;
        this.countriesFlag = countriesFlag;
        this.countriesMonument = countriesMonument;
        this.userIdsAndScores = userIds;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public Integer getStatus() { return status; }

    public void setStatus(Integer status) { this.status = status; }

    public List<String> getCountriesMap() { return countriesMap; }

    public void setCountriesMap(List<String> countriesMap) { this.countriesMap = countriesMap; }

    public List<String> getCountriesFlag() { return countriesFlag; }

    public void setCountriesFlag(List<String> countriesFlag) { this.countriesFlag = countriesFlag; }

    public List<String> getCountriesMonument() { return countriesMonument; }

    public void setCountriesMonument(List<String> countriesMonument) { this.countriesMonument = countriesMonument; }

    public Map<Integer, Integer> getUserIdsAndScores() { return userIdsAndScores; }

    public void setUserIdsAndScores(Map<Integer, Integer> userIds) { this.userIdsAndScores = userIds; }

}
