package com.ics.geomaster.users.models;

public class UserDTO {

    private int id;
    private String username;
    private Integer balance;
    private Integer idInventory;

    public UserDTO(Integer id, String username, Integer balance, Integer idInventory) {
        this.id = id;
        this.username = username;
        this.balance = balance;
        this.idInventory = idInventory;
    }

    public UserDTO(String username, Integer balance, Integer idInventory) {
        this.username = username;
        this.balance = balance;
        this.idInventory = idInventory;
    }

    public UserDTO() {
        // Constructeur par défaut sans arguments
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

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public Integer getIdInventory() {
        return this.idInventory;
    }

    public void setIdInventory(Integer idInventory) {
        this.idInventory = idInventory;
    }

    public int getId() {
        return id;
    }
}
