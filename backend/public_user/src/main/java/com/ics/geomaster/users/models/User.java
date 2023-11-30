package com.ics.geomaster.users.models;

public class User {
  private Integer id;
  private String username;
  private String password;
  private Integer balance;

  public User(String username, String password) {
    this.username = username;
    this.password = password;
    this.balance = 0;
  }

  public User(String username, String password, Integer balance) {
    this.username = username;
    this.password = password;
    this.balance = balance;
  }

  public User() {}

  public Integer getId() { return id; }

  public String getUsername() { return username; }

  public String getPassword() { return password; }

  public double getBalance() { return balance; }

  public void setBalance(Integer balance) { this.balance = balance; }


  public String toString() {
    return ("User: " + username + " has " + balance + " dollars");
  }
}
