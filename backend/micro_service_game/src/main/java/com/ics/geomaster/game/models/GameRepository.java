package com.ics.geomaster.game.models;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface GameRepository extends CrudRepository<Game, Integer>{
    public Optional<Game> findById(Integer gameID);

}