package com.ics.geomaster.country.controllers;
import com.google.gson.Gson;
import com.ics.geomaster.country.models.ApiResponse;
import com.ics.geomaster.country.models.Country;
import com.ics.geomaster.country.models.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;

@Component
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;
    private static final String API_KEY = "436|IB7ZFRBwAT57zd9rsE8sRSDkvDa9tucnRKbsbKaf";
    private static final String BASE_URL = "https://restfulcountries.com/api/v1/countries";
    @PostConstruct
    public void init() {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL))
                .header("Authorization", "Bearer " + API_KEY)
                .build();
        try {

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            Gson gson = new Gson();
            ApiResponse apiResponse = gson.fromJson(response.body(), ApiResponse.class);

            List<Country> countries = apiResponse.getData();

            for (Country country : countries) {

                Optional<Country> countryget = countryRepository.findByName(country.getName());
                if (countryget.isPresent()) {
                    System.out.println("Country already exists in database");
                    continue;
                }

                country.setMonument("Unknown");
                country.setName(country.getName().replace(" ", "-"));
                if(country.getName().equalsIgnoreCase("France")){
                    country.setMonument("Eiffel-Tower");
                }
                if(country.getName().equalsIgnoreCase("United-States")){
                    country.setMonument("Statue-of-Liberty");
                }
                if(country.getName().equalsIgnoreCase("United-Kingdom")){
                    country.setMonument("Big-Ben");
                }
                if(country.getName().equalsIgnoreCase("United-Arab-Emirates")){
                    country.setMonument("Burj-Khalifa");
                }
                if(country.getName().equalsIgnoreCase("Saudi-Arabia")){
                    country.setMonument("Mecca");
                }
                if(country.getName().equalsIgnoreCase("South-Africa")){
                    country.setMonument("Table-Mountain");
                }
                if(country.getName().equalsIgnoreCase("South-Korea")){
                    country.setMonument("Gyeongbokgung-Palace");
                }
                if(country.getName().equalsIgnoreCase("North-Korea")){
                    country.setMonument("Juche-Tower");
                }
                if(country.getName().equalsIgnoreCase("New-Zealand")){
                    country.setMonument("Sky-Tower");
                }
                if(country.getName().equalsIgnoreCase("Czech-Republic")){
                    country.setMonument("Prague-Castle");
                }
                if(country.getName().equalsIgnoreCase("Congo")){
                    country.setMonument("Brazzaville-Cathedral");
                }
                if(country.getName().equalsIgnoreCase("Costa-Rica")){
                    country.setMonument("Arenal-Volcano");
                }
                if(country.getName().equalsIgnoreCase("Brazil")){
                    country.setMonument("Christ-the-Redeemer");
                }
                if(country.getName().equalsIgnoreCase("El-Salvador")){
                    country.setMonument("San-Salvador-Volcano");
                }
                if(country.getName().equalsIgnoreCase("Denmark")){
                    country.setMonument("Little-Mermaid");
                }
                if(country.getName().equalsIgnoreCase("Cuba")){
                    country.setMonument("El-Capitolio");
                }
                if(country.getName().equalsIgnoreCase("China")){
                    country.setMonument("Great-Wall-of-China");
                }
                if(country.getName().equalsIgnoreCase("Canada")){
                    country.setMonument("CN-Tower");
                }
                if(country.getName().equalsIgnoreCase("Cameroon")){
                    country.setMonument("Mount-Cameroon");
                }
                if(country.getName().equalsIgnoreCase("Cambodia")){
                    country.setMonument("Angkor-Wat");
                }
                if(country.getName().equalsIgnoreCase("Bulgaria")){
                    country.setMonument("Alexander-Nevsky-Cathedral");
                }
            }

            countryRepository.saveAll(countries);
            System.out.println("Countries saved to database");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public Optional<Country> getCountry(String name) {
        Iterable<Country> countries = countryRepository.findAll();
        for (Country country : countries) {
            if (country.getName().toLowerCase().replace("-", " ").contains(name.toLowerCase())) {
                return Optional.of(country);
            }
        }
        return Optional.empty();
    }

    public Boolean getCountryByMonument(String country, String gameMonument) {
        String countrySanitized = country.replace(" ", "-");
        Optional<Country> countryget = countryRepository.findByName(countrySanitized);
        if (countryget.isPresent()) {
            if (countryget.get().getMonument().equalsIgnoreCase(gameMonument)) {
                return true;
            }
        }
        return false;
    }

    public List<Country> getCountries() {
        Iterable<Country> countries = countryRepository.findAll();
        return (List<Country>) countries;
    }

    public List<Country> getCountriesByContinent(String continent) {
        Iterable<Country> countries = countryRepository.findAll();
        for (Country country : countries) {
            if (country.getContinent().toLowerCase().replace("-", " ").contains(continent.toLowerCase())) {
                return (List<Country>) countries;
            }
        }
        return null;
    }
}
