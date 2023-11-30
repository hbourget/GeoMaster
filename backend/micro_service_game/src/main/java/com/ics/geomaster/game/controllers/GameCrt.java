package com.ics.geomaster.game.controllers;

import com.ics.geomaster.game.models.Game;
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
    @PostMapping("/game")
    public ResponseEntity<Game> createGame(@RequestBody Integer userId) {
        Game createdGame = gameService.createGame(userId);
        if (createdGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdGame, HttpStatus.OK);
    }

    @PutMapping("/game/addMember")
    public ResponseEntity<Game> addMember(@RequestBody Integer gameId, @RequestBody Integer userId) {
        Game updatedGame = gameService.addMember(gameId, userId);
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @PutMapping("/game/removeMember")
    public ResponseEntity<Game> removeMember(@RequestBody Integer gameId, @RequestBody Integer userId) {
        Game updatedGame = gameService.removeMember(gameId, userId);
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @PutMapping("/game/play")
    public ResponseEntity<Game> updateGame(@RequestBody Integer gameId, @RequestBody List<String> countryGuesses) {
        Game updatedGame = gameService.updateGame(gameId, countryGuesses);
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @GetMapping("/game")
    public ResponseEntity<Game> getGame(@RequestBody Integer gameId) {
        Game game = gameService.getGame(gameId);
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @GetMapping("/game/{userId}")
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


