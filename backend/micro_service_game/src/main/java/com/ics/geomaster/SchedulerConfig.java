package com.ics.geomaster;

import com.ics.geomaster.game.controllers.GameService;
import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
@EnableScheduling
public class SchedulerConfig {
    @Autowired
    private GameService gService;
    @Transactional
    @Scheduled(cron = "0 * * * * *")
    public void removeOldGames() {
        System.out.println("Removing old games...");
        Iterable<Game> games = gService.getGames();

        for (Game game : games) {
            LocalDateTime gameCreationDate = LocalDateTime.parse(game.getCreationDate(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            LocalDateTime now = LocalDateTime.now();
            if (gameCreationDate.isBefore(now.minusMinutes(10))) {
                System.out.println("Game " + game.getId() + " is older than 10 minutes, deleting it...");
                gService.deleteGame(game.getId());
            }
        }

    }
}
