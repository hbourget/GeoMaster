package com.ics.geomaster.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final ServerLogoutHandlerAdapter serverLogoutHandler;
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
            "http://user:8081",
            "http://country:8082",
            "http://game:8083",
            "http://localhost",
            "http://localhost:80",
            "http://localhost:8080",
            "http://localhost:4173",
            "http://localhost:5173"
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "x-xsrf-token",
            "X-Requested-With",
            "XMLHttpRequest",
            "Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
            "Access-Control-Allow-Credentials"
    ));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
    http
            .cors().configurationSource(corsConfigurationSource()).and()

            .authorizeExchange()
            .pathMatchers("/auth/**").permitAll()
            .anyExchange().authenticated()
            .and()
            .csrf(csrf -> csrf.disable())
            .addFilterAt(jwtAuthFilter, SecurityWebFiltersOrder.AUTHENTICATION)
            .logout()
            .logoutUrl("/auth/logout")
            .logoutHandler(serverLogoutHandler);

    return http.build();
  }
}
