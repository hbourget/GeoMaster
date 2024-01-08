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
    @ElementCollection
    private Map<Integer, Integer> userIdsAndStatus;

    private Integer status;

    public Game() {
        this.status = 0;
        this.countriesMonument = new ArrayList<>();
        this.countriesFlag = new ArrayList<>();
        this.countriesMap = new ArrayList<>();
        this.userIdsAndScores = new HashMap<>();
        this.userIdsAndStatus = new HashMap<>();
    }

    public Game(Integer status) {
        this.countriesMonument = new ArrayList<>();
        this.countriesFlag = new ArrayList<>();
        this.countriesMap = new ArrayList<>();
        this.status = status;
        this.userIdsAndScores = new HashMap<>();
        this.userIdsAndStatus = new HashMap<>();
    }

    public Game( Integer status, List<String> countriesMap, List<String> countriesFlag, List<String> countriesMonument, Map<Integer, Integer> userIds, Map<Integer, Integer> userIdsAndStatus) {
        this.status = status;
        this.countriesMap = countriesMap;
        this.countriesFlag = countriesFlag;
        this.countriesMonument = countriesMonument;
        this.userIdsAndScores = userIds;
        this.userIdsAndStatus = userIdsAndStatus;
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

    public Map<Integer, Integer> getUserIdsAndStatus() { return userIdsAndStatus; }

    public void setUserIdsAndStatus(Map<Integer, Integer> userIdsAndStatus) { this.userIdsAndStatus = userIdsAndStatus; }

}
