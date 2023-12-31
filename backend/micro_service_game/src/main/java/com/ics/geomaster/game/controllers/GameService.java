package com.ics.geomaster.game.controllers;
import com.ics.geomaster.country.models.Country;
import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameRepository;
import com.ics.geomaster.users.models.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String countryServiceUrl = "http://country:8082";
    private final String userService = "http://user:8081";

    public Game createGame(Integer userId) {

        Game game = new Game();
        try {
            ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity(userService + "/users/" + userId, UserDTO.class);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                game.getUserIdsAndScores().put(userId, 0);
            }
        } catch (Exception e) {
            return null;
        }
        ParameterizedTypeReference<List<Country>> typeRef = new ParameterizedTypeReference<List<Country>>() {};
        List<Country> countries = restTemplate.exchange(countryServiceUrl + "/countries", HttpMethod.GET, null, typeRef).getBody();

        if (countries == null) {
            return null;
        }

        for (int i = 0; i < 5; i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesMap().add(countries.get(random).getName());
        }

        for (int i = 0; i < 5; i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesFlag().add(countries.get(random).getName());
        }

        Random rnd = new Random();

        for (int i = 0; i < 5; i++) {
            int randomIndex = rnd.nextInt(countries.size());
            while (countries.get(randomIndex).getMonument().equals("Unknown")) {
                randomIndex = rnd.nextInt(countries.size());
            }
            game.getCountriesMonument().add(countries.get(randomIndex).getMonument());
        }

        gameRepository.save(game);
        return game;
    }

    public Game updateGameScores(Integer gameId, Integer userId, List<String> countryGuesses) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }

        try {
            ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity(userService + "/users/" + userId, UserDTO.class);
            if (responseEntity.getStatusCode().is4xxClientError()) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }

        if (game.getStatus() == 0) {
            game.setStatus(1);
            gameRepository.save(game);
            return game;
        }

        if (game.getStatus() == 4) {
            return null;
        }

        if (game.getStatus() == 1) {
            for (int i = 0; i < 5; i++) {
                for (String countryName : countryGuesses) {
                    ResponseEntity<Country> responseEntity = restTemplate.getForEntity(countryServiceUrl + "/countries/name/" + countryName, Country.class);
                    if (responseEntity.getStatusCode().is2xxSuccessful()) {
                        Country country = responseEntity.getBody();
                        if (country != null) {
                            if (country.getName().equalsIgnoreCase(game.getCountriesMap().get(i))) {
                                Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
                                userIdsAndScores.replace(userId, userIdsAndScores.get(userId) + 1);
                                game.setUserIdsAndScores(userIdsAndScores);
                            }
                        }
                    }
                }
            }
            game.setStatus(2);
        }

        else if (game.getStatus() == 2) {
            for (int i = 0; i < 5; i++) {
                for (String countryName : countryGuesses) {
                    ResponseEntity<Country> responseEntity = restTemplate.getForEntity(countryServiceUrl + "/countries/name/" + countryName, Country.class);
                    if (responseEntity.getStatusCode().is2xxSuccessful()) {
                        Country country = responseEntity.getBody();
                        if (country != null) {
                            if (country.getName().equalsIgnoreCase(game.getCountriesFlag().get(i))) {
                                Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
                                userIdsAndScores.replace(userId, userIdsAndScores.get(userId) + 1);
                                game.setUserIdsAndScores(userIdsAndScores);
                            }
                        }
                    }
                }
            }
            game.setStatus(3);
        }

        else if (game.getStatus() == 3) {
            for (int i = 0; i < 5; i++) {
                for (String countryName : countryGuesses) {
                    ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(countryServiceUrl + "/countries/monument/" + countryName + "/" + game.getCountriesMonument().get(i), Boolean.class);
                    if (responseEntity.getStatusCode().value() == 200) {
                            Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
                            userIdsAndScores.replace(userId, userIdsAndScores.get(userId) + 1);
                            game.setUserIdsAndScores(userIdsAndScores);
                        }
                    }
                }
            game.setStatus(4);
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

        Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
        userIdsAndScores.put(userId, 0);
        game.setUserIdsAndScores(userIdsAndScores);
        gameRepository.save(game);
        return game;
    }

    public Game removeMember(Integer gameId, Integer userId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }
        Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
        userIdsAndScores.remove(userId);
        game.setUserIdsAndScores(userIdsAndScores);
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
            if (game.getUserIdsAndScores().containsKey(userId)) {
                return game;
            }
        }
        return null;
    }

    public Iterable<Game> getGames() {
        return gameRepository.findAll();
    }
}
