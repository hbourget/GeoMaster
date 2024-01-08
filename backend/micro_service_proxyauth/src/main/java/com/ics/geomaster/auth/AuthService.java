package com.ics.geomaster.auth;

import com.ics.geomaster.config.JwtService;
import com.ics.geomaster.token.Token;
import com.ics.geomaster.token.TokenRepository;
import com.ics.geomaster.token.TokenType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ics.geomaster.users.models.User;
import com.ics.geomaster.users.models.UserDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final RestTemplate restTemplate = new RestTemplate();
  private final String userServiceUrl = "http://user:8081";

  private UserDetails usertoUserDetails(User user) {
    return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())
            .authorities("USER")
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(false)
            .build();
  }

  public AuthResponse register(RegisterRequest request) {
    request.setPassword(passwordEncoder.encode(request.getPassword()));

    String urlGetAllUsers = userServiceUrl + "/users";
    ResponseEntity<List<UserDTO>> responseEntity = restTemplate.exchange(urlGetAllUsers, HttpMethod.GET, null, new ParameterizedTypeReference<List<UserDTO>>() {});
    List<UserDTO> usersDTO = responseEntity.getBody();

    if (usersDTO != null) {
      for (UserDTO userDTO : usersDTO) {
        if (userDTO.getUsername().equals(request.getUsername())) {
            return null;
        }
      }
    }

    User savedUser = restTemplate.postForObject(userServiceUrl + "/users", request, User.class);

    String url = userServiceUrl + "/users/" + savedUser.getId();

    UserDetails userDetails = usertoUserDetails(savedUser);
    var jwtToken = jwtService.generateToken(userDetails);
    var refreshToken = jwtService.generateRefreshToken(userDetails);
    saveUserToken(savedUser, jwtToken);
    return AuthResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .userId(savedUser.getId())
        .build();
  }

  private User getUserByUsername(String username) {
    try {
      return restTemplate.getForObject(userServiceUrl + "/users/auth/{idOrUsername}", User.class, username);
    } catch (HttpClientErrorException e) {
      if (e.getStatusCode().value() == 404) {
        throw new UsernameNotFoundException("User not found");
      } else {
        throw new AuthenticationServiceException("An error occurred while fetching user data", e);
      }
    }
  }


  public AuthResponse authenticate(AuthRequest request) {
    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    } catch (Exception e) {
      System.out.println(e);
      return null;
    }
    System.out.println(request.getUsername());
    var user = getUserByUsername(request.getUsername());
    UserDetails userDetails = usertoUserDetails(user);
    var jwtToken = jwtService.generateToken(userDetails);
    var refreshToken = jwtService.generateRefreshToken(userDetails);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .userId(user.getId())
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .userId(user.getId())
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userName;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userName = jwtService.extractUsername(refreshToken);
    if (userName != null) {
      var user = getUserByUsername(userName);
      UserDetails userDetails = usertoUserDetails(user);
      if (jwtService.isTokenValid(refreshToken, userDetails)) {
        var accessToken = jwtService.generateToken(userDetails);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
