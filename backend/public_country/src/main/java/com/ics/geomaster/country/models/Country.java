package com.ics.geomaster.country.models;

public class Country {
    private String name;
    private String capital;
    private String continent;
    private String population;
    private String monument;

    public Country() {}

    public Country(String name, String capital, String flag, String continent, String population) {
        this.name = name;
        this.capital = capital;
        this.continent = continent;
        this.population = population;
    }

    public Country(String name, String capital, String flag, String continent, String population, String monument) {
        this.name = name;
        this.capital = capital;
        this.continent = continent;
        this.population = population;
        this.monument = monument;
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
        return monument;
    }

    public void setMonument(String monument) {
        this.monument = monument;
    }

    @Override
    public String toString() {
        return "Country{" +
                "name='" + name + '\'' +
                ", capital='" + capital + '\'' +
                ", continent='" + continent + '\'' +
                ", population='" + population + '\'' +
                ", monument='" + monument + '\'' +
                '}';
    }
}