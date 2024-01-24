package com.ics.geomaster.country.controllers;
import com.google.gson.Gson;
import com.ics.geomaster.country.models.ApiResponse;
import com.ics.geomaster.country.models.Country;
import com.ics.geomaster.country.models.CountryRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
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

            Country southKorea = new Country();
            southKorea.setName("South-Korea");
            southKorea.setMonument("Gyeongbokgung-Palace");
            southKorea.setPopulation("51780579");
            southKorea.setCapital("Seoul");
            southKorea.setContinent("Asia");
            countries.add(southKorea);

            Country northKorea = new Country();
            northKorea.setName("North-Korea");
            northKorea.setMonument("Juche-Tower");
            northKorea.setPopulation("25778816");
            northKorea.setCapital("Pyongyang");
            northKorea.setContinent("Asia");
            countries.add(northKorea);

            countryRepository.saveAll(countries);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    private String translate(String sourceLang, String targetLang, String text) {
        try {
            String prefix = "Pays="; //Ce prefix permet au model de traduction de mieux performer
            String urlString = String.format("http://translator:80/translate?target_lang=%s&source_lang=%s&text=%s",
                    targetLang, sourceLang, java.net.URLEncoder.encode(prefix + toDisplayCase(text), "UTF-8"));
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();
            System.out.println(response.toString());

            JSONObject jsonResponse = new JSONObject(response.toString());
            String translatedText = jsonResponse.getJSONArray("translated").getString(0);

            int equalSignIndex = translatedText.indexOf('=');
            if (equalSignIndex != -1) {
                translatedText = translatedText.substring(equalSignIndex + 1).trim();
            }

            translatedText = translatedText.replace(" ", "-");
            return toDisplayCase(translatedText);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Optional<Country> getCountry(String name) {
        Optional<Country> country = countryRepository.findByName(toDisplayCase(name));
        if (country.isPresent()) {
            return country;
        } else {
            String formattedCountryEnglishFrench = name.replace(" ", "-");
            String nameEnglishFromFrench = translate("fr", "en", formattedCountryEnglishFrench);
            if (nameEnglishFromFrench != null) {
                country = countryRepository.findByName(toDisplayCase(nameEnglishFromFrench));
                if (country.isPresent()) {
                    return country;
                }
            }
        }
        return Optional.empty();
    }

    public Boolean getCountryByMonument(String country, String gameMonument) {
        String countrySanitized = country.replace(" ", "-");
        Optional<Country> countryget = countryRepository.findByName(toDisplayCase(countrySanitized));
        if (countryget.isPresent()) {
            if (countryget.get().getMonument().equalsIgnoreCase(gameMonument)) {
                return true;
            }
        } else {
            String nameEnglishFromFrench = translate("fr", "en", countrySanitized);
            String formattedCountryEnglishFrench = nameEnglishFromFrench.replace(" ", "-");
            countryget = countryRepository.findByName(toDisplayCase(formattedCountryEnglishFrench));
            if (countryget.isPresent()) {
                if (countryget.get().getMonument().equalsIgnoreCase(gameMonument)) {
                    return true;
                }
            }
        }
        return false;
    }

    public List<Country> getCountries() {
        Iterable<Country> countries = countryRepository.findAll();
        return (List<Country>) countries;
    }

    public static String toDisplayCase(String s) {

        final String ACTIONABLE_DELIMITERS = " '-/";

        StringBuilder sb = new StringBuilder();
        boolean capNext = true;

        for (char c : s.toCharArray()) {
            c = (capNext)
                    ? Character.toUpperCase(c)
                    : Character.toLowerCase(c);
            sb.append(c);
            capNext = (ACTIONABLE_DELIMITERS.indexOf((int) c) >= 0);
        }
        return sb.toString();
    }
}
