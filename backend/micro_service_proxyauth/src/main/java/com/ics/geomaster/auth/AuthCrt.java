package com.ics.geomaster.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class AuthCrt {

  private final AuthService service;

  @PostMapping("/auth/register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

    Object obj = service.register(request);
    if (obj instanceof AuthResponse) {
      return ResponseEntity.ok((AuthResponse) obj);
    } else {
        return ResponseEntity.status(409).build();
    }
  }
  @PostMapping("/auth/login")
  public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
    Object obj = service.authenticate(request);
    if (obj instanceof AuthResponse) {
      return ResponseEntity.ok((AuthResponse) obj);
    } else {
      return ResponseEntity.status(401).build();
    }
  }
}
