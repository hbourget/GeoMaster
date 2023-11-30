package com.ics.geomaster.country.models;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface CountryRepository extends CrudRepository<Country, Integer>{
    public Optional<Country> findById(Integer gameID);
}