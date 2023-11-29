package com.ics.geomaster.token;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Integer> {

  @Query("SELECT t FROM Token t WHERE t.userId = ?1 AND t.revoked = false AND t.expired = false")
  List<Token> findAllValidTokenByUser(int userId);

  Optional<Token> findByToken(String token);
}
