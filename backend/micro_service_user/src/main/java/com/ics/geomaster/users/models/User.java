package com.ics.geomaster.users.models;
import jakarta.persistence.*;

@Entity
@Table(name = "utilisateur")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String username;
  private String password;
  private Integer balance;

  public User(Integer id, String username, String password) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.balance = 0;
  }

  public User(Integer id, String username, String password, Integer balance) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.balance = 0;
  }

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

  public void setUsername(String username) { this.username = username; }

  public String getPassword() { return password; }

  public void setPassword(String password) { this.password = password; }

  public Integer getBalance() { return balance; }

  public void setBalance(Integer balance) { this.balance = balance; }

  public String toString() {
    return ("User: " + username + " has " + balance + " points");
  }

}
