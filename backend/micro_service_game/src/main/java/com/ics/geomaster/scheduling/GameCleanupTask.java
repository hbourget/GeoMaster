package com.ics.geomaster.scheduling;

import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Component
public class GameCleanupTask {

    private final GameRepository gameRepository; // Assuming you have a GameRepository

    public GameCleanupTask(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Scheduled(fixedRate = 10000)
    public void removeOldGames() {
        Iterable<Game> allGames = gameRepository.findAll();
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        for (Game game : allGames) {
            String creationDate = game.getCreationDate();
            LocalDateTime creationDateTime = LocalDateTime.parse(creationDate, DateTimeFormatter.ISO_DATE_TIME);
            if (creationDateTime.isBefore(tenMinutesAgo)) {
                System.out.println("Deleting game " + game.getId() + " created at " + creationDate);
                gameRepository.delete(game);
            }
        }
    }
}

