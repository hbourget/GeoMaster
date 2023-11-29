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
    private List<String> countries;
    private Integer status;
    private int partyId;

    public Game() {
        this.score = 0;
        this.status = 0;
    }

    public Game(int score, Integer status, int partyId) {
        this.score = score;
        this.status = status;
        this.partyId = partyId;
    }

    public Game(int score, List<String> countries, Integer status, int partyId) {
        this.score = score;
        this.countries = countries;
        this.status = status;
        this.partyId = partyId;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }

    public Integer getStatus() { return status; }

    public void setStatus(Integer status) { this.status = status; }

    public int getPartyId() { return partyId; }

    public void setPartyId(int partyId) { this.partyId = partyId; }

    public List<String> getCountries() { return countries; }

}
