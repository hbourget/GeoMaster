package com.ics.geomaster.game.controllers;

import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameUpdateDTO;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Order(1)
public class GameCrt {
    @Autowired
    private GameService gameService;
    public GameCrt(GameService gameService) {
        this.gameService = gameService;
    }
    @PostMapping("/game/{userId}/{numberOfCountriesPerRound}")
    public ResponseEntity<Game> createGame(@PathVariable Integer userId, @PathVariable Integer numberOfCountriesPerRound) {
        Game createdGame = gameService.createGame(userId, numberOfCountriesPerRound);
        if (createdGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdGame, HttpStatus.OK);
    }

    @PutMapping("/game/addMember/{gameId}/{userId}")
    public ResponseEntity<Game> addMember(@PathVariable Integer gameId, @PathVariable Integer userId) {
        Game updatedGame = gameService.addMember(gameId, userId);
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @PutMapping("/game/removeMember/{gameId}/{userId}")
    public ResponseEntity<Game> removeMember(@PathVariable Integer gameId, @PathVariable Integer userId) {
        Game updatedGame = gameService.removeMember(gameId, userId);
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @PutMapping("/game/play")
    public ResponseEntity<Game> updateGame(@RequestBody GameUpdateDTO gameUpdateDTO) {
        Game updatedGame = gameService.updateGameScores(gameUpdateDTO.getGameId(), gameUpdateDTO.getUserId(), gameUpdateDTO.getCountryGuesses());
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }


    @GetMapping("/game/g/{gameId}")
    public ResponseEntity<Game> getGame(@PathVariable Integer gameId) {
        Game game = gameService.getGame(gameId);
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("/game/all")
    public ResponseEntity<Iterable<Game>> getGames() {
        Iterable<Game> games = gameService.getGames();
        if (games == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @GetMapping("/game/u/{userId}")
    public ResponseEntity<Game> getGameByUserId(@PathVariable Integer userId) {
        Game game = gameService.getGameByUserId(userId);
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @DeleteMapping("/game/{gameId}")
    public ResponseEntity<Void> deleteGame(@PathVariable Integer gameId) {
        Game gameDeleted = gameService.deleteGame(gameId);
        if (gameDeleted != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}