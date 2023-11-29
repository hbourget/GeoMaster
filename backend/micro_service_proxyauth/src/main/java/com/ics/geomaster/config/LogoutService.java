package com.ics.geomaster.config;

import com.ics.geomaster.token.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService {

  private final TokenRepository tokenRepository;

  public void logout(ServerHttpRequest request, ServerHttpResponse response, Authentication authentication) {
    String authHeader = request.getHeaders().getFirst("Authorization");
    String jwt;

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return;
    }
    jwt = authHeader.substring(7);
    var storedToken = tokenRepository.findByToken(jwt)
            .orElse(null);
    if (storedToken != null) {
      storedToken.setExpired(true);
      storedToken.setRevoked(true);
      tokenRepository.save(storedToken);
    }
  }
}
