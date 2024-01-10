import com.ics.geomaster.CountryApp;
import com.ics.geomaster.country.controllers.CountryService;
import com.ics.geomaster.country.models.Country;
import com.ics.geomaster.country.models.CountryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.boot.test.context.SpringBootTest;
import java.util.Arrays;

@SpringBootTest(classes = CountryApp.class)

public class CountryServiceTest {

    @Mock
    private CountryRepository countryRepository;

    @InjectMocks
    private CountryService countryService;

    @BeforeEach
    public void setUp() {
        Country france = new Country("France", "Paris", "Europe", "67000000", "Eiffel-Tower");
        Country usa = new Country("United-States", "Washington, D.C.", "North-America", "328000000", "Statue-of-Liberty");

        when(countryRepository.findAll()).thenReturn(Arrays.asList(france, usa));
        when(countryRepository.findByName("France")).thenReturn(Optional.of(france));
        when(countryRepository.findByName("United-States")).thenReturn(Optional.of(usa));
    }

    @Test
    public void testGetCountry() {
        Optional<Country> result = countryService.getCountry("France");
        assertTrue(result.isPresent());
        assertEquals("France", result.get().getName());
        assertEquals("Eiffel-Tower", result.get().getMonument());
        assertEquals("Paris", result.get().getCapital());
        assertEquals("Europe", result.get().getContinent());
        assertEquals("67000000", result.get().getPopulation());
    }

    @Test
    public void testGetCountryByMonument() {
        assertTrue(countryService.getCountryByMonument("France", "Eiffel-Tower"));
        assertTrue(countryService.getCountryByMonument("United-States", "Statue-of-Liberty"));
        assertFalse(countryService.getCountryByMonument("France", "Statue-of-Liberty"));
        assertFalse(countryService.getCountryByMonument("United-States", "Eiffel-Tower"));
    }

    @Test
    public void testGetCountries() {
        assertEquals(2, countryService.getCountries().size());
    }
}


