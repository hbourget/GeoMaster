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
    private final String userServiceUrl = "http://localhost:8081";
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
            game.getCountries_r1().add(countries.get(random).getName());
            countries.remove(random);
        }

        game.setPartyId(partyId);
        gameRepository.save(game);
        return game;
    }

    public Game updateGame(Integer gameId, Integer score_roud1, Integer score_roud2, Integer score_roud3, String status) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game != null) {
            game.setScore_roud1(score_roud1);
            game.setScore_roud2(score_roud2);
            game.setScore_roud3(score_roud3);
            game.setStatus(status);
            gameRepository.save(game);
            return game;
        }
        return null;
    }

    public Game getGame(Integer gameId) {
        return gameRepository.findById(gameId).orElse(null);
    }


}
