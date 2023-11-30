package com.ics.geomaster.game.controllers;
import com.ics.geomaster.country.models.Country;
import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameRepository;
import com.ics.geomaster.users.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String countryServiceUrl = "http://localhost:8082";
    private final String userService = "http://localhost:8081";

    public Game createGame(Integer userId) {

        Game game = new Game();

        try {
            ResponseEntity<User> responseEntity = restTemplate.getForEntity(userService + "/users/" + userId, User.class);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                game.setUserIds(List.of(userId));
            }
        } catch (Exception e) {
            return null;
        }

        List<Country> countries = restTemplate.getForObject(countryServiceUrl + "/countries", List.class);

        if (countries == null) {
            return null;
        }

        for (int i = 0; i < 5; i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesMap().add(countries.get(random).getName());
            countries.remove(random);
        }

        for (int i = 0; i < 5; i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesFlag().add(countries.get(random).getName());
            countries.remove(random);
        }

        for (int i = 0; i < 5; i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesMonument().add(countries.get(random).getName());
            countries.remove(random);
        }

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
                    if (country != null && country.getName().equalsIgnoreCase(game.getCountriesMap().get(i))) {
                        game.setScore(game.getScore() + 1);
                    }
                }
            }
            game.setStatus(1);
        }

        else if (game.getStatus() == 1) {
            for (int i = 0; i < 5; i++) {
                for (int j = 0; i < 5; i++) {
                    Country country = restTemplate.getForObject(countryServiceUrl + "/countries/name/" + countryGuesses.get(j), Country.class);
                    if (country != null && country.getName().equalsIgnoreCase(game.getCountriesFlag().get(i))) {
                        game.setScore(game.getScore() + 1);
                    }
                }
            }
            game.setStatus(2);
        }

        else if (game.getStatus() == 2) {
            for (int i = 0; i < 5; i++) {
                for (int j = 0; i < 5; i++) {
                    Country country = restTemplate.getForObject(countryServiceUrl + "/countries/name/" + countryGuesses.get(j), Country.class);
                    if (country != null && country.getName().equalsIgnoreCase(game.getCountriesMonument().get(i))) {
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

    public Game addMember(Integer gameId, Integer userId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }

        List<Integer> userIds = game.getUserIds();
        userIds.add(userId);
        game.setUserIds(userIds);
        gameRepository.save(game);
        return game;
    }

    public Game removeMember(Integer gameId, Integer userId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }
        List<Integer> userIds = game.getUserIds();
        userIds.remove(userId);
        game.setUserIds(userIds);
        gameRepository.save(game);
        return game;
    }

    public Game deleteGame(Integer gameId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game != null) {
            gameRepository.delete(game);
        }
        return game;
    }

    public Game getGameByUserId(Integer userId) {
        Iterable<Game> games = gameRepository.findAll();
        for (Game game : games) {
            if (game.getUserIds().contains(userId)) {
                return game;
            }
        }
        return null;
    }
}
