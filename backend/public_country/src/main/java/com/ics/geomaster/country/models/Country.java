package com.ics.geomaster.country.models;

public class Country {
    private Integer id;
    private String name;
    private String capital;
    private String flag;
    private String continent;
    private String population;
    private String monummentUrl;

    public Country() {}

    public Country(String name, String capital, String flag, String continent, String population) {
        this.name = name;
        this.capital = capital;
        this.flag = flag;
        this.continent = continent;
        this.population = population;
    }

    public Country(Integer id, String name, String capital, String flag, String continent, String population) {
        this.id = id;
        this.name = name;
        this.capital = capital;
        this.flag = flag;
        this.continent = continent;
        this.population = population;
    }

    public Country(Integer id, String name, String capital, String flag, String continent, String population, String monummentUrl) {
        this.id = id;
        this.name = name;
        this.capital = capital;
        this.flag = flag;
        this.continent = continent;
        this.population = population;
        this.monummentUrl = monummentUrl;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public String getPopulation() {
        return population;
    }

    public void setPopulation(String population) {
        this.population = population;
    }

    public String getMonument() {
        return monummentUrl;
    }

    public void setMonument(String monummentUrl) {
        this.monummentUrl = monummentUrl;
    }

    @Override
    public String toString() {
        return "Country{" +
                "id=" + id +
                ", name='" + name +
                ", capital='" + capital +
                ", flag='" + flag +
                ", continent='" + continent +
                ", population='" + population +
                '}';
    }
}