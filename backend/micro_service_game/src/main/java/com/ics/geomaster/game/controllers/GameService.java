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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    public String getCurrentTimeStamp() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return dtf.format(now);
    }

    public Game createGame(Integer userId, Integer numberOfCountriesPerRound) {

        Iterable<Game> games = gameRepository.findAll();
        for (Game game : games) {
            if (game.getUserIdsAndScores().containsKey(userId) && game.getStatus() != Game.Status.FINISHED) {
                return null;
            }
        }

        Game game = new Game();

        try {
            ResponseEntity<UserDTO> responseEntity = restTemplate.getForEntity(userService + "/users/" + userId, UserDTO.class);
            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                game.getUserIdsAndScores().put(userId, 0);
                game.getUserIdsAndStatus().put(userId, Game.Status.WAITING);
                game.setNumberOfCountriesPerRound(numberOfCountriesPerRound);
                game.setCreationDate(getCurrentTimeStamp());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
        ParameterizedTypeReference<List<Country>> typeRef = new ParameterizedTypeReference<List<Country>>() {};
        List<Country> countries = restTemplate.exchange(countryServiceUrl + "/countries", HttpMethod.GET, null, typeRef).getBody();

        if (countries == null) {
            return null;
        }

        for (int i = 0; i < game.getNumberOfCountriesPerRound(); i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesMap().add(countries.get(random).getName());
        }

        for (int i = 0; i < game.getNumberOfCountriesPerRound(); i++) {
            int random = (int) (Math.random() * countries.size());
            game.getCountriesFlag().add(countries.get(random).getName());
        }

        Random rnd = new Random();

        for (int i = 0; i < game.getNumberOfCountriesPerRound(); i++) {
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

        if (!game.getUserIdsAndScores().containsKey(userId)) {
            return null;
        }

        if (game.getStatus() == Game.Status.FINISHED) {
            return null;
        }

        if (game.getStatus() == Game.Status.WAITING) {
            game.setStatus(Game.Status.FLAGS);
            gameRepository.save(game);
            return game;
        }

        if (hasPlayerAlreadyPlayed(gameId, userId)) {
            return game;
        }
        else {
            Map<Integer, Game.Status> userIdsAndStatus = game.getUserIdsAndStatus();
            userIdsAndStatus.replace(userId, game.getStatus());
            game.setUserIdsAndStatus(userIdsAndStatus);
        }

        if (game.getStatus() == Game.Status.FLAGS) {
            for (int i = 0; i < game.getNumberOfCountriesPerRound(); i++) {
                String countryName = countryGuesses.get(i);
                String formattedCountryName = countryName.replace(" ", "-");
                ResponseEntity<Country> responseEntity = restTemplate.getForEntity(countryServiceUrl + "/countries/name/" + formattedCountryName, Country.class);
                if (responseEntity.getStatusCode().is2xxSuccessful()) {
                    Country country = responseEntity.getBody();
                    if (country != null) {
                        if (country.getName().equalsIgnoreCase(game.getCountriesFlag().get(i))) {
                            Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
                            userIdsAndScores.replace(userId, userIdsAndScores.get(userId) + 5);
                            game.setUserIdsAndScores(userIdsAndScores);
                        }
                    }
                }
            }
            if (hasEveryPlayerPlayed(gameId)) {
                game.setStatus(Game.Status.MAP);
            }

        } else if (game.getStatus() == Game.Status.MAP) {
            for (int i = 0; i < game.getNumberOfCountriesPerRound(); i++) {
                String countryName = countryGuesses.get(i);
                String formattedCountryName = countryName.replace(" ", "-");
                ResponseEntity<Country> responseEntity = restTemplate.getForEntity(countryServiceUrl + "/countries/name/" + formattedCountryName, Country.class);
                if (responseEntity.getStatusCode().value() == 200) {
                    Country country = responseEntity.getBody();
                    if (country != null) {
                        if (country.getName().equalsIgnoreCase(game.getCountriesMap().get(i))) {
                            Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
                            userIdsAndScores.replace(userId, userIdsAndScores.get(userId) + 10);
                            game.setUserIdsAndScores(userIdsAndScores);
                        }
                    }
                }
            }
            if (hasEveryPlayerPlayed(gameId)) {
                game.setStatus(Game.Status.MONUMENTS);
            }
        }

        else if (game.getStatus() == Game.Status.MONUMENTS) {
            for (int i = 0; i < game.getNumberOfCountriesPerRound(); i++) {
                String countryName = countryGuesses.get(i);
                String formattedCountryName = countryName.replace(" ", "-");
                ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(countryServiceUrl + "/countries/monument/" + formattedCountryName + "/" + game.getCountriesMonument().get(i), Boolean.class);
                if (responseEntity.getStatusCode().value() == 200) {
                    Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
                    userIdsAndScores.replace(userId, userIdsAndScores.get(userId) + 15);
                    game.setUserIdsAndScores(userIdsAndScores);
                }
            }
            if (hasEveryPlayerPlayed(gameId)) {
                for (Map.Entry<Integer, Integer> entry : game.getUserIdsAndScores().entrySet()) {
                    restTemplate.put(userService + "/users/addbal/" + entry.getKey() + "/" + entry.getValue(), null);
                }
                game.setStatus(Game.Status.FINISHED);
            }
        }

        gameRepository.save(game);
        return game;
    }

    public Game getGame(Integer gameId) {
        return gameRepository.findById(gameId).orElse(null);
    }

    public Game addMember(Integer gameId, Integer userId) {
        Iterable<Game> games = gameRepository.findAll();
        for (Game game : games) {
            if (game.getUserIdsAndScores().containsKey(userId)) {
                return null;
            }
        }

        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }

        if (game.getStatus() != Game.Status.WAITING) {
            return null;
        }

        Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
        userIdsAndScores.put(userId, 0);
        game.setUserIdsAndScores(userIdsAndScores);

        Map<Integer, Game.Status> userIdsAndStatus = game.getUserIdsAndStatus();
        userIdsAndStatus.put(userId, Game.Status.WAITING);
        game.setUserIdsAndStatus(userIdsAndStatus);

        gameRepository.save(game);
        return game;
    }

    public Game removeMember(Integer gameId, Integer userId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }
        Map<Integer, Integer> userIdsAndScores = game.getUserIdsAndScores();
        if (!userIdsAndScores.containsKey(userId)) {
            return null;
        }
        userIdsAndScores.remove(userId);
        game.setUserIdsAndScores(userIdsAndScores);

        Map<Integer, Game.Status> userIdsAndStatus = game.getUserIdsAndStatus();
        userIdsAndStatus.remove(userId);
        game.setUserIdsAndStatus(userIdsAndStatus);

        if (game.getUserIdsAndScores().isEmpty()) {
            gameRepository.delete(game);
            return null;
        }

        gameRepository.save(game);
        return game;
    }

    public Game deleteGame(Integer gameId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }
        gameRepository.delete(game);
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

    public Boolean hasPlayerAlreadyPlayed(Integer gameId, Integer userId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }

        if (!game.getUserIdsAndStatus().containsKey(userId)) {
            return null;
        }

        Game.Status status = game.getStatus();

        if (game.getUserIdsAndStatus().get(userId).equals(status)) {
            return true;
        }
        return false;
    }

    public Boolean hasEveryPlayerPlayed(Integer gameId) {
        Game game = gameRepository.findById(gameId).orElse(null);
        if (game == null) {
            return null;
        }
        Game.Status status = game.getStatus();
        for (Map.Entry<Integer, Game.Status> entry : game.getUserIdsAndStatus().entrySet()) {
            if (!entry.getValue().equals(status)) {
                return false;
            }
        }
        return true;
    }
}
