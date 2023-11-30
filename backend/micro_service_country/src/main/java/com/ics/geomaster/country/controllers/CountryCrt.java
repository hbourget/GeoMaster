package com.ics.geomaster.country.controllers;

import com.ics.geomaster.country.models.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/countries/capital/{capitalName}")
    public ResponseEntity<Country> getCountryByCapital(@PathVariable String capitalName) {
        Optional<Country> country = countryService.getCountryByCapital(capitalName);
        if (country.isPresent()) {
            return new ResponseEntity<>(country.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/countries/flag/{flagName}")
    public ResponseEntity<Country> getCountryByFlag(@PathVariable String flagName) {
        Optional<Country> country = countryService.getCountryByFlag(flagName);
        if (country.isPresent()) {
            return new ResponseEntity<>(country.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Country[]> getCountries() {
        Country[] countries = countryService.getCountries();
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }
}


