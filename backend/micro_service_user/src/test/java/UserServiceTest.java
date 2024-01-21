import com.ics.geomaster.UserApp;
import com.ics.geomaster.users.controllers.UserMapper;
import com.ics.geomaster.users.controllers.UserService;
import com.ics.geomaster.users.models.User;
import com.ics.geomaster.users.models.UserDTO;
import com.ics.geomaster.users.models.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.boot.test.context.SpringBootTest;
import java.util.Arrays;

@SpringBootTest(classes = UserApp.class)
public class UserServiceTest {

        @Mock
        private UserRepository userRepository;

        @InjectMocks
        private UserService userService;

        private UserMapper userMapper = new UserMapper();


        @BeforeEach
        public void setUp() {
            User user1 = new User(1, "user1", "test");
            User user2 = new User(2, "user2", "test");

            when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));
            when(userRepository.findByUsername("user1")).thenReturn(Optional.of(user1));
            when(userRepository.findByUsername("user2")).thenReturn(Optional.of(user2));
            when(userRepository.findById(1)).thenReturn(Optional.of(user1));
            when(userRepository.findById(2)).thenReturn(Optional.of(user2));
        }

        @Test
        public void testGetUserById() {
            UserDTO result = userService.getUserById(1);
            assertNotNull(result);
            assertEquals("user1", result.getUsername());
            assertEquals(0, result.getBalance());

            result = userService.getUserById(2);
            assertNotNull(result);
            assertEquals("user2", result.getUsername());
            assertEquals(0, result.getBalance());
        }

        @Test
        public void testGetUserByUsername() {
            UserDTO result = userService.getUserByUsername("user1");
            assertNotNull(result);
            assertEquals(1, result.getId());
            assertEquals("user1", result.getUsername());
            assertEquals(0, result.getBalance());

            result = userService.getUserByUsername("user2");
            assertNotNull(result);
            assertEquals(2, result.getId());
            assertEquals("user2", result.getUsername());
            assertEquals(0, result.getBalance());
        }

        @Test
        public void testGetUserAuthById() {
            User result = (User) userService.getUserAuthById(1);
            assertNotNull(result);
            assertEquals("user1", result.getUsername());
            assertEquals(0, result.getBalance());

            result = (User) userService.getUserAuthById(2);
            assertNotNull(result);
            assertEquals("user2", result.getUsername());
            assertEquals(0, result.getBalance());
        }

        @Test
        public void testGetUserAuthByUsername() {
            User result = (User) userService.getUserAuthByUsername("user1");
            assertNotNull(result);
            assertEquals("user1", result.getUsername());
            assertEquals(0, result.getBalance());

            result = (User) userService.getUserAuthByUsername("user2");
            assertNotNull(result);
            assertEquals("user2", result.getUsername());
            assertEquals(0, result.getBalance());
        }

        @Test
        public void testGetUsers() {
            assertEquals(2, userService.getUsers().size());
        }

        @Test
        public void testSaveUser() {
            User user = new User("user3", "test", 500);
            userService.saveUser(user);
            verify(userRepository, times(1)).save(user);
        }

        /*@Test
        public void testUpdateUser() {
            User user = new User("user4", "test", 750);
            userService.updateUser(1, user);
            verify(userRepository, times(1)).save(user);

            UserDTO result = userService.getUserById(1);
            assertNotNull(result);
            assertEquals("user4", result.getUsername());
            assertEquals(500, result.getBalance());
        }*/

        @Test
        public void testDeleteUser() {
            UserDTO user = userService.getUserByUsername("user1");
            boolean ret = userService.deleteUser(user.getId());
            assertTrue(ret);
        }

        @Test
        public void testAddBalance() {
            UserDTO userDto = userService.addBalance(1, 20);
            assertNotNull(userDto);
            assertEquals("user1", userDto.getUsername());
            assertEquals(20, userDto.getBalance());
        }

        @Test
        public void testRemoveBalance() {
            UserDTO userDto = userService.removeBalance(1, 20);
            assertNotNull(userDto);
            assertEquals("user1", userDto.getUsername());
            assertEquals(-20, userDto.getBalance());
        }
}
