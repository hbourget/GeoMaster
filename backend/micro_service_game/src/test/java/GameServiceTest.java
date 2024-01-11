import com.ics.geomaster.GameApp;
import com.ics.geomaster.game.controllers.GameService;
import com.ics.geomaster.game.models.Game;
import com.ics.geomaster.game.models.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.boot.test.context.SpringBootTest;
import java.util.Arrays;

@SpringBootTest(classes = GameApp.class)

public class GameServiceTest {

    @Mock
    private GameRepository gameRepository;

    @InjectMocks
    private GameService gameService;

    @BeforeEach
    public void setUp() {
        Game game1 = new Game(0);
        Game game2 = new Game(1);

        when(gameRepository.findAll()).thenReturn(Arrays.asList(game1, game2));
        when(gameRepository.findById(1)).thenReturn(Optional.of(game1));
        when(gameRepository.findById(2)).thenReturn(Optional.of(game2));
    }

    @Test
    public void testGetGameById() {
        Game result = gameService.getGame(1);
        assertNotNull(result);
        assertEquals(0, result.getStatus());
        assertEquals(0, result.getUserIdsAndScores().size());
        assertEquals(0, result.getUserIdsAndStatus().size());

        result = gameService.getGame(2);
        assertNotNull(result);
        assertEquals(1, result.getStatus());
        assertEquals(0, result.getUserIdsAndScores().size());
        assertEquals(0, result.getUserIdsAndStatus().size());
    }

    @Test
    public void testGetAllGames() {
        Iterable<Game> result = gameService.getGames();
        assertNotNull(result);
        assertEquals(2, result.spliterator().getExactSizeIfKnown());
    }

}
