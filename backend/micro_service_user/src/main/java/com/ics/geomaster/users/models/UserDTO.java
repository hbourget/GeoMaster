package com.ics.geomaster.users.models;

public class UserDTO {

    private int id;
    private String username;
    private Integer balance;

    public UserDTO(Integer id, String username, Integer balance) {
        this.id = id;
        this.username = username;
        this.balance = balance;
    }

    public UserDTO(String username, Integer balance) {
        this.username = username;
        this.balance = balance;
    }

    public UserDTO() {
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public int getId() {
        return id;
    }
}
