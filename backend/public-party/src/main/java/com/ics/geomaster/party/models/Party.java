package com.ics.geomaster.party.models;

import java.util.List;


public class Party {

  private Integer id;

  private List<Integer> userIds;

  private Integer gameId;

  //getter and setter

  public Integer getId() { return id; }

  public void setId(Integer id) { this.id = id; }

  public List<Integer> getUserIds() { return userIds; }

  public void setUserIds(List<Integer> userIds) { this.userIds = userIds; }

  public Integer getGameId() { return gameId; }

  public void setGameId(Integer gameId) { this.gameId = gameId; }

  public Party() {
  }

  public Party(List<Integer> userIds) {
    this.userIds = userIds;
  }

  public Party(List<Integer> userIds, Integer gameId) {
    this.userIds = userIds;
    this.gameId = gameId;
  }

  public Party(Integer id, List<Integer> userIds, Integer gameId) {
    this.id = id;
    this.userIds = userIds;
    this.gameId = gameId;
  }

  @Override
  public String toString() {
    return "Party{" +
            "id=" + id +
            ", userIds=" + userIds +
            ", gameId=" + gameId +
            '}';
  }
}

