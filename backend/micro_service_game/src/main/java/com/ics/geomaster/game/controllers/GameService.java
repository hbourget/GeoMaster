package com.ics.geomaster.game.controllers;
import com.ics.geomaster.country.models.Country;
import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String countryServiceUrl = "http://localhost:8082";
    private final String partyServiceUrl = "http://localhost:8083";

    public Game createGame(Integer partyId) {
        try {
            restTemplate.getForEntity(partyServiceUrl + "/parties/" + partyId, Game.class);
        } catch (Exception e) {
            return null;
        }

        List<Country> countries = restTemplate.getForObject(countryServiceUrl + "/countries", List.class);

        if (countries == null) {
            return null;
        }

        Game game = new Game();
        for (int i = 0; i < 5; i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountries().add(countries.get(random).getName());
            countries.remove(random);
        }

        game.setPartyId(partyId);
        gameRepository.save(game);
        return game;
    }

    public Game updateGame(Integer gameId, List<String> countryGuesses) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }
        if (game.getStatus() == 0) {
            for (int i = 0; i < 5; i++) {
                for (int j = 0; i < 5; i++) {
                    Country country = restTemplate.getForObject(countryServiceUrl + "/countries/name/" + countryGuesses.get(j), Country.class);
                    if (country != null && country.getName().equalsIgnoreCase(game.getCountries().get(i))) {
                        game.setScore(game.getScore() + 1);
                    }
                }
            }
            game.setStatus(1);
        }
        else if (game.getStatus() == 1) {
            for (int i = 5; i < 9; i++) {
                for (int j = 0; i < 5; i++) {
                    Country country = restTemplate.getForObject(countryServiceUrl + "/countries/name/" + countryGuesses.get(j), Country.class);
                    if (country != null && country.getName().equalsIgnoreCase(game.getCountries().get(i))) {
                        game.setScore(game.getScore() + 1);
                    }
                }
            }
            game.setStatus(2);
        }
        else if (game.getStatus() == 2)
        {
            for (int i = 9; i < 14; i++) {
                for (int j = 0; i < 5; i++) {
                    Country country = restTemplate.getForObject(countryServiceUrl + "/countries/name/" + countryGuesses.get(j), Country.class);
                    if (country != null && country.getName().equalsIgnoreCase(game.getCountries().get(i))) {
                        game.setScore(game.getScore() + 1);
                    }
                }
            }
            game.setStatus(3);
        }
        gameRepository.save(game);
        return game;
    }

    public Game getGame(Integer gameId) {
        return gameRepository.findById(gameId).orElse(null);
    }
}
