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

    @PostMapping("/game/{partyId}")
    public ResponseEntity<Game> createGame(@PathVariable Integer partyId) {
        Game createdGame = gameService.createGame(partyId);
        if (createdGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(createdGame, HttpStatus.OK);
    }

    @PutMapping("/game/play")
    public ResponseEntity<Game> updateGame(@RequestBody Integer gameId, @RequestBody List<String> countryGuesses) {
        Game updatedGame = gameService.updateGame(gameId, countryGuesses);
        if (updatedGame == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedGame, HttpStatus.OK);
    }

    @GetMapping("/game/{gameId}")
    public ResponseEntity<Game> getGame(@PathVariable Integer gameId) {
        Game game = gameService.getGame(gameId);
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(game, HttpStatus.OK);
    }
}


