package com.ics.geomaster.game.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "GAME")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int score_roud1;
    private int score_roud2;
    private int score_roud3;
    @ElementCollection
    private List<String> countries_r1;
    @ElementCollection
    private List<String> flags_r2;
    @ElementCollection
    private List<String> capitals_r3;

    private String status;
    private int partyId;

    public Game() {
        this.score_roud1 = 0;
        this.score_roud2 = 0;
        this.score_roud3 = 0;
        this.status = "Started";
    }

    public Game(int score_roud1, int score_roud2, int score_roud3, String status, int partyId) {
        this.score_roud1 = score_roud1;
        this.score_roud2 = score_roud2;
        this.score_roud3 = score_roud3;
        this.status = status;
        this.partyId = partyId;
    }

    public Game(int id, int score_roud1, int score_roud2, int score_roud3, String status, int partyId) {
        this.id = id;
        this.score_roud1 = score_roud1;
        this.score_roud2 = score_roud2;
        this.score_roud3 = score_roud3;
        this.status = status;
        this.partyId = partyId;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public int getScore_roud1() { return score_roud1; }

    public void setScore_roud1(int score_roud1) { this.score_roud1 = score_roud1; }

    public int getScore_roud2() { return score_roud2; }

    public void setScore_roud2(int score_roud2) { this.score_roud2 = score_roud2; }

    public int getScore_roud3() { return score_roud3; }

    public void setScore_roud3(int score_roud3) { this.score_roud3 = score_roud3; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public int getPartyId() { return partyId; }

    public void setPartyId(int partyId) { this.partyId = partyId; }

    public List<String> getCountries_r1() { return countries_r1; }

    public void setCountries_r1(List<String> countries_r1) { this.countries_r1 = countries_r1; }

    public List<String> getFlags_r2() { return flags_r2; }

    public void setFlags_r2(List<String> flags_r2) { this.flags_r2 = flags_r2; }

    public List<String> getCapitals_r3() { return capitals_r3; }

    public void setCapitals_r3(List<String> capitals_r3) { this.capitals_r3 = capitals_r3; }
}
