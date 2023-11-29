package com.ics.geomaster.party.models;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface PartyRepository extends CrudRepository<Party, Integer>{
    public Optional<Party> findById(Integer gameID);

}