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
                country.setName(country.getName().replace(" ", "-"));
                if(country.getName().equalsIgnoreCase("France")){
                    country.setMonument("Eiffel-Tower");
                }

                else {
                    country.setMonument("Unknown");
                }
            }

            if (countries.isEmpty()) {
                System.out.println("\n\n[API] ERROR FETCHING COUNTRIES\n\n");
            }
            else {
                System.out.println("\n\n[API] COUNTRIES LOADED\n\n");
            }

            countryRepository.saveAll(countries);
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

    public Boolean getCountryByMonument(String countryMonument, String gameMonument) {
        Optional<Country> country = countryRepository.findByName(countryMonument);
        if (country.isPresent()) {
            System.out.println("COUNTRYSERVICE: " + country.get().getMonument() + " " + gameMonument + " " +countryMonument);
            if (country.get().getMonument().equalsIgnoreCase(gameMonument)) {
                return true;
            }
        }
        return false;
    }

    public List<Country> getCountries() {
        Iterable<Country> countries = countryRepository.findAll();
        return (List<Country>) countries;
    }
}
