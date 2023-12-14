package com.ics.geomaster.country.controllers;

import com.ics.geomaster.country.models.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Order(1)
public class CountryCrt {
    @Autowired
    private CountryService countryService;
    public CountryCrt(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/countries/name/{countryName}")
    public ResponseEntity<Country> getCountry(@PathVariable String countryName) {
        Optional<Country> country = countryService.getCountry(countryName);
        if (country.isPresent()) {
            return new ResponseEntity<>(country.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/countries/monument/{countryMonument}/{gameMonument}")
    public ResponseEntity<Boolean> getCountryByMonument(@PathVariable String countryMonument, @PathVariable String gameMonument) {
        Boolean ret = countryService.getCountryByMonument(countryMonument, gameMonument);
        if (ret) {
            return new ResponseEntity<>(ret, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(ret, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getCountries() {
        List<Country> countries = countryService.getCountries();
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }
}