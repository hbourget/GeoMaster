package com.ics.geomaster.users.models;

public class UserDTO {

    private int id;
    private String username;
    private double balance;

    public UserDTO(Integer id, String username, double balance) {
        this.id = id;
        this.username = username;
        this.balance = balance;
    }

    public UserDTO(String username, double balance) {
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

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public int getId() {
        return id;
    }
}
